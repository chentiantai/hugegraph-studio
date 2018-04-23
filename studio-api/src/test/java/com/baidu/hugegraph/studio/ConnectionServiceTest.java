package com.baidu.hugegraph.studio;

import java.util.List;

import javax.ws.rs.client.Entity;
import javax.ws.rs.core.GenericType;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import org.glassfish.jersey.server.ResourceConfig;
import org.glassfish.jersey.servlet.ServletContainer;
import org.glassfish.jersey.test.DeploymentContext;
import org.glassfish.jersey.test.JerseyTest;
import org.glassfish.jersey.test.ServletDeploymentContext;
import org.glassfish.jersey.test.grizzly.GrizzlyWebTestContainerFactory;
import org.glassfish.jersey.test.spi.TestContainerFactory;
import org.junit.Assert;
import org.junit.Test;
import org.springframework.web.context.ContextLoaderListener;

import com.baidu.hugegraph.studio.connections.model.Connection;
import com.baidu.hugegraph.studio.connections.service.ConnectionService;

/**
 * Tests for ConnectionService.
 */
public class ConnectionServiceTest extends JerseyTest {

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
        String loaderLis = "contextConfigLocation";
        String xmlPath = "classpath:applicationContext.xml";
        return ServletDeploymentContext.forServlet(new ServletContainer(
                                       new ConnectionServiceTest
                                       .ResourceRegister()))
                                       .addListener(ContextLoaderListener.class)
                                       .contextParam(loaderLis, xmlPath).build();
    }

    @Test
    public void testGetList() {
        Response response = target("connections")
                            .request(MediaType.APPLICATION_JSON_TYPE).get();
        List<Connection> connections = response.readEntity(
                                       new GenericType<List<Connection>>() {});

        connections.forEach(connection ->
                            System.out.println(connection.getName()));
        Assert.assertEquals(200, response.getStatus());
    }

    @Test
    public void testCreateConnection() {
        Connection connection = new Connection();
        connection.setConnectionHost("127.0.0.1");
        connection.setGraph("112");
        connection.setPort(8080);
        connection.setName("testCreateConnection");

        Response response = target("connections")
                            .request(MediaType.APPLICATION_JSON_TYPE)
                            .post(Entity.json(connection));

        Connection connection1 = response.readEntity(Connection.class);
        Assert.assertEquals(201, response.getStatus());
    }

    @Test
    public void testEditConnection() {
        String connectionId = "28e7cc2b-00b7-4492-a97d-eb382b018a07";
        Connection connection = new Connection();
        connection.setId(connectionId);
        connection.setConnectionHost("127.0.1.3");
        connection.setGraph("hugegraph1");
        connection.setPort(8080);
        connection.setName("testCreateConnection");

        Response response = target("connections/"+connectionId)
                            .request(MediaType.APPLICATION_JSON_TYPE)
                            .put(Entity.json(connection));

        Connection connection1 = response.readEntity(Connection.class);
        Assert.assertEquals(200, response.getStatus());
    }
}
