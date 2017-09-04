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

import com.baidu.hugegraph.studio.notebook.model.Notebook;
import com.baidu.hugegraph.studio.notebook.model.NotebookCell;
import com.baidu.hugegraph.studio.notebook.model.Result;
import com.baidu.hugegraph.studio.notebook.service.NotebookService;

/**
 * Created by huanghaiping02 on 17/8/31.
 */
public class NotebookServiceTest extends JerseyTest {

    public class ResourceRegister extends ResourceConfig {
        public ResourceRegister() {
            register(NotebookService.class);
        }
    }

    @Override
    protected TestContainerFactory getTestContainerFactory() {
        return new GrizzlyWebTestContainerFactory();
    }

    @Override
    protected DeploymentContext configureDeployment() {
        return ServletDeploymentContext
                .forServlet(new ServletContainer(new NotebookServiceTest.ResourceRegister()))
                .addListener(ContextLoaderListener.class)
                .contextParam("contextConfigLocation",
                        "classpath:applicationContext.xml")
                .build();
    }

    @Test
    public void testGetNotebooks(){
        Response response = target("notebooks")
                .request(MediaType.APPLICATION_JSON_TYPE)
                .get();
        List<Notebook> notebooks = response.readEntity(
                new GenericType<List<Notebook>>() {
                });
        notebooks.forEach(notebook -> System.out.println(notebook.getName()));
        Assert.assertEquals(200, response.getStatus());
    }



    @Test
    public void testExecuteNotebookCellGremlin(){
        String notebookId="cde49180-478e-4b5c-ae2d-200b8ae370da";
        String cellId="d0bd4629-5158-4993-b458-00d15479aed2";
        String vertexId="person:Rosie O'Donnell";
        String url="notebooks/"+notebookId+"/cells/"+cellId+ "/gremlin";
        System.out.println(url);

        Response response =
                target(url).queryParam( "vertexId",vertexId )
                .request(MediaType.APPLICATION_JSON_TYPE)
                .get();

        Assert.assertEquals(200, response.getStatus());
    }

    @Test
    public void testExecuteNotebookCell(){

        String notebookId="34b06d58-91cb-4394-9f8a-729cf05635b8";
        String cellId="727e77a1-fe85-4e49-ab11-6f1a55fcf3ff";
        NotebookCell cell = new NotebookCell();
        cell.setId("727e77a1-fe85-4e49-ab11-6f1a55fcf3ff");
        cell.setLanguage( "gremlin" );
        cell.setCode("g.V()");
        String url="notebooks/"+notebookId+"/cells/"+cellId+ "/execute";
        System.out.println(url);

        Response response = target(url)
                        .request(MediaType.APPLICATION_JSON_TYPE)
                        .put(Entity.json(cell));

        Assert.assertEquals(200, response.getStatus());
        Result result = response.readEntity(Result.class);
    }




}
