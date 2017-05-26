package com.baidu.hugegraph.studio;

import com.baidu.hugegraph.studio.connections.model.Connection;
import com.baidu.hugegraph.studio.connections.service.ConnectionService;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import org.apache.commons.lang3.StringUtils;
import org.glassfish.jersey.server.ResourceConfig;
import org.glassfish.jersey.servlet.ServletContainer;
import org.glassfish.jersey.test.DeploymentContext;
import org.glassfish.jersey.test.JerseyTest;
import org.glassfish.jersey.test.ServletDeploymentContext;
import org.glassfish.jersey.test.grizzly.GrizzlyWebTestContainerFactory;
import org.glassfish.jersey.test.spi.TestContainerFactory;
import org.junit.After;
import org.junit.Assert;
import org.junit.Test;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.context.ContextLoaderListener;

import javax.ws.rs.client.Entity;
import javax.ws.rs.core.GenericType;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.Arrays;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

/**
 * Created by jishilei on 2017/5/17.
 */
public class ConnectionServiceTest extends JerseyTest {
    private static final Logger logger = LoggerFactory.getLogger(ConnectionServiceTest.class);
    private ObjectMapper mapper;

    private Set<String> connectionIds;

    private void addConnectionId(String connnectionId) {
        this.connectionIds.add(connnectionId);
    }

    public ConnectionServiceTest() {
        mapper = new ObjectMapper();
        mapper.enable(SerializationFeature.INDENT_OUTPUT);
        this.connectionIds = new HashSet<>();
    }

    @After
    public void postTest() {
        if (connectionIds == null) {
            return;
        }
        connectionIds.stream().forEach(id -> {
            deleteConnection(id);
            logger.info("delete connection=" + id);
        });
    }

    public class ResourceRegister extends ResourceConfig {

        public ResourceRegister() {
            register(ConnectionService.class);
        }
    }

    @Override
    protected TestContainerFactory getTestContainerFactory() {
        return new GrizzlyWebTestContainerFactory();
    }

    @Override
    protected DeploymentContext configureDeployment() {
        return ServletDeploymentContext
                .forServlet(new ServletContainer(new ResourceRegister()))
                .addListener(ContextLoaderListener.class)
                .contextParam("contextConfigLocation", "classpath:applicationContext.xml")
                .build();
    }

    private Connection buildConnection() {
        Connection connection = new Connection();
        connection.setGraphName("demoGraphName");
        connection.setPort(8080);
        connection.setConnectionHost("127.0.0.1");
        return addConnection(connection);
    }

    private Connection addConnection(Connection connection) {
        Response response = target("connections")
                .request(MediaType.APPLICATION_JSON_TYPE)
                .post(Entity.json(connection));
        return response.readEntity(Connection.class);
    }

    private void deleteConnection(String connectionId) {
        target("connections/" + connectionId)
                .request(MediaType.APPLICATION_JSON_TYPE)
                .delete();
    }

    @Test
    public void testAdd() {

        // Build connection with connectionId;
        Connection connection = new Connection();
        connection.setGraphName("demoGraphName");
        connection.setPort(8080);
        connection.setConnectionHost("127.0.0.1");

        Response response = target("connections")
                .request(MediaType.APPLICATION_JSON_TYPE)
                .post(Entity.json(connection));

        Assert.assertEquals("should return status 201", 201, response.getStatus());

        connection = response.readEntity(Connection.class);
        String connectionId = connection.getId();

        Assert.assertTrue(StringUtils.isNotEmpty(connectionId));
        logger.info("connectionId=" + connectionId);

        addConnectionId(connectionId);
    }

    @Test
    public void testDelete() {
        Connection connection = buildConnection();
        Assert.assertTrue(connection != null && StringUtils.isNotEmpty(connection.getId()));
        String connectionId = connection.getId();
        Response responseDelete = target("connections/" + connectionId)
                .request(MediaType.APPLICATION_JSON_TYPE)
                .delete();
        Assert.assertEquals(204, responseDelete.getStatus());

        addConnectionId(connectionId);

    }

    @Test
    public void testGetSingle() {
        Connection connection = buildConnection();
        Assert.assertTrue(connection != null && StringUtils.isNotEmpty(connection.getId()));
        String connectionId = connection.getId();

        Connection connection1 = target("connections/" + connectionId)
                .request(MediaType.APPLICATION_JSON_TYPE)
                .get(Connection.class);
        Assert.assertTrue(connection1 != null && connection1.getId().equals(connectionId));

        addConnectionId(connectionId);


    }

    @Test
    public void testGetList() {
        Connection connection = buildConnection();
        Assert.assertTrue(connection != null && StringUtils.isNotEmpty(connection.getId()));
        String connectionId = connection.getId();

        Response responseList = target("connections")
                .request(MediaType.APPLICATION_JSON_TYPE)
                .get();
        Assert.assertEquals(200, responseList.getStatus());

        List<Connection> connections = responseList.readEntity(
                new GenericType<List<Connection>>() {
                });
        Assert.assertTrue(connections != null
                && connections.stream().anyMatch(n -> n.getId().equals(connectionId)));

        addConnectionId(connectionId);


    }

    @Test
    public void testUpdate() {
        Connection connection = buildConnection();
        Assert.assertTrue(connection != null && StringUtils.isNotEmpty(connection.getId()));
        String connectionId = connection.getId();
        connection.setPort(8084);
        Response responseUpdate = target("connections/" + connectionId)
                .request(MediaType.APPLICATION_JSON_TYPE)
                .put(Entity.json(connection));
        Assert.assertEquals(200, responseUpdate.getStatus());
        Connection connection2 = responseUpdate.readEntity(Connection.class);

        Assert.assertTrue(connection2 != null && connection2.getId().equals(connectionId));
        Assert.assertEquals(8084, connection2.getPort());

        addConnectionId(connectionId);

    }


}
