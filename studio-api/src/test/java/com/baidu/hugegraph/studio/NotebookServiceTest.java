package com.baidu.hugegraph.studio;

import com.baidu.hugegraph.studio.notebook.model.Notebook;
import com.baidu.hugegraph.studio.notebook.service.NoteBookService;
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

import javax.ws.rs.core.Response;

/**
 * Created by jishilei on 2017/5/17.
 */
public class NotebookServiceTest extends JerseyTest {
    private static final Logger logger = LoggerFactory.getLogger(NotebookServiceTest.class);

    public class ResourceRegister extends ResourceConfig {

        public ResourceRegister() {
            register(NoteBookService.class);
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
    public void testNotebookCURD() {
        Notebook notebook = new Notebook();
        notebook.setConnectionId("test-connectionId");
        notebook.setName("test");
        Response response = target("notebooks").request().get();
        Assert.assertEquals(200, response.getStatus());
    }
}
