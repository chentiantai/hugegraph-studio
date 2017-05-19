package com.baidu.hugegraph.studio;

import com.baidu.hugegraph.studio.connections.model.Connection;
import com.baidu.hugegraph.studio.connections.service.ConnectionService;
import com.baidu.hugegraph.studio.notebook.model.Notebook;
import com.baidu.hugegraph.studio.notebook.service.NoteBookService;
import com.fasterxml.jackson.core.JsonProcessingException;
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
import org.junit.Assert;
import org.junit.Test;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.context.ContextLoaderListener;

import javax.ws.rs.client.Entity;
import javax.ws.rs.core.GenericType;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.time.Instant;
import java.util.List;

/**
 * Created by jishilei on 2017/5/17.
 */
public class ConnectionServiceTest extends JerseyTest {
    private static final Logger logger = LoggerFactory.getLogger(ConnectionServiceTest.class);
    private ObjectMapper mapper;

    public ConnectionServiceTest() {
        mapper = new ObjectMapper();
        mapper.enable(SerializationFeature.INDENT_OUTPUT);
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

    @Test
    public void testConnection() {
        logger.info("------------------ Test:  add ------------------");
        Connection connection = new Connection();

        connection.setPort(8083);
        Response response = null;
        try {
            String jsonConnection = mapper.writeValueAsString(connection);

            logger.info("jsonConnection = " + jsonConnection);

            response = target("connections")
                    .request(MediaType.APPLICATION_JSON_TYPE)
                    .post(Entity.json(connection));
            logger.info(response.toString());
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }

        Assert.assertEquals("should return status 201", 201, response.getStatus());
        connection = response.readEntity(Connection.class);

        String connectionId = connection.getId();
        Assert.assertTrue(StringUtils.isNotEmpty(connectionId));
        logger.info("connectionId=" + connectionId);


        logger.info("------------------ Test:  get single------------------");
        Connection connection1 = target("connections/" + connectionId)
                .request(MediaType.APPLICATION_JSON_TYPE)
                .get(Connection.class);

        Assert.assertTrue(connection1 != null && connection1.getId().equals(connectionId));


        logger.info("------------------ Test:  get list------------------");
        Response responseList = target("connections")
                .request(MediaType.APPLICATION_JSON_TYPE)
                .get();
        Assert.assertEquals(200, responseList.getStatus());

        List<Connection> connections = responseList.readEntity(
                new GenericType<List<Connection>>() {
                });
        Assert.assertTrue(connections != null
                && connections.stream().anyMatch(n -> n.getId().equals(connectionId)));

        logger.info("------------------ Test:  update ------------------");

        connection1.setPort(8084);
        Response responseUpdate = target("connections/" + connectionId)
                .request(MediaType.APPLICATION_JSON_TYPE)
                .put(Entity.json(connection1));
        Assert.assertEquals(200, responseList.getStatus());
        Connection connection2 = responseUpdate.readEntity(Connection.class);
        Assert.assertTrue(connection2 != null && connection2.getId().equals(connectionId));


        logger.info("------------------ Test:  delete ------------------");
        Response responseDelete = target("connections/" + connectionId)
                .request(MediaType.APPLICATION_JSON_TYPE)
                .delete();

        Assert.assertEquals(204, responseDelete.getStatus());

    }

}
