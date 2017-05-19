package com.baidu.hugegraph.studio;

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
public class NotebookServiceTest extends JerseyTest {
    private static final Logger logger = LoggerFactory.getLogger(NotebookServiceTest.class);
    private ObjectMapper mapper;

    public NotebookServiceTest() {
        mapper = new ObjectMapper();
        mapper.enable(SerializationFeature.INDENT_OUTPUT);
    }

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
    public void testNotebook() {
        logger.info("------------------ Test:  add ------------------");
        Notebook notebook = new Notebook();
        notebook.setConnectionId("test-connectionId");
        notebook.setName("test");
        Response response = null;
        try {
            String json = mapper.writeValueAsString(notebook);
            logger.info("json = " + json);
            response = target("notebooks")
                    .request(MediaType.APPLICATION_JSON_TYPE)
                    .post(Entity.json(notebook));
            logger.info(response.toString());
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }

        Assert.assertEquals("should return status 201", 201, response.getStatus());
        notebook = response.readEntity(Notebook.class);

        String notebookId = notebook.getId();
        Assert.assertTrue(StringUtils.isNotEmpty(notebookId));
        logger.info("notebookId=" + notebookId);


        logger.info("------------------ Test:  get single------------------");
        Notebook notebook1 = target("notebooks/" + notebookId)
                .request(MediaType.APPLICATION_JSON_TYPE)
                .get(Notebook.class);
        Assert.assertTrue(notebook1 != null && notebook1.getId().equals(notebookId));

        logger.info("------------------ Test:  get list------------------");
        Response responseList = target("notebooks")
                .request(MediaType.APPLICATION_JSON_TYPE)
                .get();
        Assert.assertEquals(200, responseList.getStatus());

        List<Notebook> notebooks = responseList.readEntity(
                new GenericType<List<Notebook>>() {
                });
        Assert.assertTrue(notebooks != null && notebooks.stream().anyMatch(n -> n.getId().equals(notebookId)));

        notebook1.setCreated(Instant.now().getEpochSecond());
        notebook1.setLastUsed(Instant.now().getEpochSecond());
        logger.info("------------------ Test:  update ------------------");
        Response responseUpdate = target("notebooks/" + notebookId)
                .request(MediaType.APPLICATION_JSON_TYPE)
                .put(Entity.json(notebook1));
        Assert.assertEquals(200, responseList.getStatus());
        Notebook notebook2 = responseUpdate.readEntity(Notebook.class);
        Assert.assertTrue(notebook2 != null && notebook2.getId().equals(notebookId));


        logger.info("------------------ Test:  delete ------------------");
        Response responseDelete = target("notebooks/" + notebookId)
                .request(MediaType.APPLICATION_JSON_TYPE)
                .delete();

        Assert.assertEquals(204, responseDelete.getStatus());

    }

}
