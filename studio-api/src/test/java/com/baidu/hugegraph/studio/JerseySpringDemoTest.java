package com.baidu.hugegraph.studio;

import java.util.List;
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
 * Tests for JerseySpring.
 */
public class JerseySpringDemoTest extends JerseyTest {

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
        String confLoc = "contextConfigLocation";
        String xmlPath = "classpath:applicationContext.xml";
        return ServletDeploymentContext.forServlet(
                                       new ServletContainer(
                                       new JerseySpringDemoTest
                                       .ResourceRegister()))
                                       .addListener(ContextLoaderListener.class)
                                       .contextParam(confLoc, xmlPath).build();
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



}
