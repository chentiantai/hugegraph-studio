/*
 * Copyright 2017 HugeGraph Authors
 *
 * Licensed to the Apache Software Foundation (ASF) under one or more
 * contributor license agreements. See the NOTICE file distributed with this
 * work for additional information regarding copyright ownership. The ASF
 * licenses this file to You under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations under
 * the License.
 */

package com.baidu.hugegraph.studio;

import java.util.List;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.TimeUnit;

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
import org.junit.After;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.springframework.web.context.ContextLoaderListener;

import com.baidu.hugegraph.studio.notebook.model.Notebook;
import com.baidu.hugegraph.studio.notebook.model.NotebookCell;
import com.baidu.hugegraph.studio.notebook.model.Result;
import com.baidu.hugegraph.studio.notebook.model.ViewSettings;
import com.baidu.hugegraph.studio.notebook.service.NotebookService;

public class NotebookServiceTest extends JerseyTest {

    static final String notebookName = "testNotebookService";
    static final String connectionId = "0e2e8c84-c176-499c-98d0-92153ce48a1c";

    static Notebook notebook =  null;
    static String notebookId = "";
    static String cellId="";

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
        ServletContainer rc = new ServletContainer(new NotebookServiceTest
                                                   .ResourceRegister());
        String confloc = "contextConfigLocation";
        String xmlPath = "classpath:applicationContext.xml";
        return ServletDeploymentContext.forServlet(rc)
                                       .addListener(ContextLoaderListener.class)
                                       .contextParam(confloc, xmlPath)
                                       .build();
    }

    @Before
    public void before() {
        notebook = new Notebook();
        notebook.setConnectionId(connectionId);
        notebook.setName(notebookName);

        Response response = target("notebooks")
                            .request(MediaType.APPLICATION_JSON_TYPE)
                            .post(Entity.json(notebook));

        notebook = response.readEntity(Notebook.class);
        notebookId = notebook.getId();
        if (notebook.getCells().size()>0) {
            cellId = notebook.getCells().get(0).getId();
        } else {
            cellId = this.addCell();
        }

    }

    public String addCell() {
        NotebookCell cell = new NotebookCell();
        cell.setLanguage("gremlin");
        cell.setCode("");
        ViewSettings viewSettings = new ViewSettings();
        viewSettings.setFullScreen( false );
        viewSettings.setView( true );
        cell.setViewSettings(viewSettings);

        Response response = target("notebooks/" + notebookId + "/cells")
                            .queryParam("position", 1)
                            .request(MediaType.APPLICATION_JSON_TYPE)
                            .post(Entity.json(cell));

        NotebookCell notebookCell = response.readEntity(NotebookCell.class);
        return notebookCell.getId();

    }

    @After
    public void after() {
        System.out.println("after");
        Response response = target("notebooks/" + notebookId)
                            .request(MediaType.APPLICATION_JSON_TYPE)
                            .delete();
    }

    @Test
    public void testGetNotebooks() {
        Response response = target("notebooks")
                            .request(MediaType.APPLICATION_JSON_TYPE).get();
        List<Notebook> notebooks = response.readEntity(
                                   new GenericType<List<Notebook>>() {});
        notebooks.forEach(notebook -> System.out.println(notebook.getName()));
        Assert.assertEquals(200, response.getStatus());
    }

    @Test
    public void testExecuteNotebookCellGremlin() {
        String vertexId="1:peter";
        NotebookCell cell = new NotebookCell();
        cell.setId(cellId);
        cell.setLanguage( "gremlin" );

        cell.setCode("g.V(2147483648)");
        String url = "notebooks/" + notebookId + "/cells/" + cellId + "/execute";
        System.out.println(url);
        Response response = target(url).request(MediaType.APPLICATION_JSON_TYPE)
                                       .put(Entity.json(cell));
        System.out.println(response.readEntity(String.class));

        url="notebooks/" + notebookId + "/cells/" + cellId + "/gremlin";
        System.out.println(url);

        Object vertexId1 = 2147483648L;
        response = target(url).queryParam( "vertexId",vertexId1)
                              .queryParam("label","software")
                              .request(MediaType.APPLICATION_JSON_TYPE)
                              .get();
        System.out.println("ex: " + response.readEntity(String.class));

        Assert.assertEquals(200, response.getStatus());
    }


    @Test
    public void testExecuteNotebookCell() {
        String code = "g.V()";
        // code = "schema.getVertexLabel(\"person2\").userData()";
        NotebookCell cell = new NotebookCell();
        cell.setId(cellId);
        cell.setLanguage( "gremlin" );
        cell.setCode(code);
        String url = "notebooks/" + notebookId + "/cells/" + cellId + "/execute";
        System.out.println(url);

        Response response = target(url).request(MediaType.APPLICATION_JSON_TYPE)
                                       .put(Entity.json(cell));
        String result = response.readEntity(String.class);
        System.out.println(result);
        Assert.assertEquals(200, response.getStatus());
    }


    @Test
    public void testExecuteGremlinWithNumberId() {
        String code = "g.V(123456)";
        NotebookCell cell = new NotebookCell();
        cell.setId(cellId);
        cell.setLanguage( "gremlin" );
        cell.setCode(code);
        String url = "notebooks/" + notebookId + "/cells/" + cellId + "/execute";
        System.out.println(url);

        Response response = target(url).request(MediaType.APPLICATION_JSON_TYPE)
                                       .put(Entity.json(cell));
        Assert.assertEquals(200, response.getStatus());

        code = "g.V('123456')";
        cell = new NotebookCell();
        cell.setId(cellId);
        cell.setLanguage( "gremlin" );
        cell.setCode(code);
        url="notebooks/"+notebookId+"/cells/"+cellId+ "/execute";
        System.out.println(url);

        response = target(url)
                .request(MediaType.APPLICATION_JSON_TYPE)
                .put(Entity.json(cell));
        System.out.println(response.readEntity(String.class));
        Assert.assertEquals(200, response.getStatus());
    }

    @Test
    public void testConcurrentEditNotebookCell() {
        ExecutorService fixedThreadPool = Executors.newFixedThreadPool(25);
        for (int i = 0; i < 50; i++) {
            final int index = i;
            fixedThreadPool.execute(new Runnable() {
                public void run() {
                    editNotebookCell(index);
                }
            });
        }
        //closed the theadpool after all task has been finished
        fixedThreadPool.shutdown();
        try {
            fixedThreadPool.awaitTermination(Long.MAX_VALUE, TimeUnit.MINUTES);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }

    public void editNotebookCell(int index) {
        String code = "g.V('"+index+"')";
        NotebookCell cell = new NotebookCell();
        cell.setId(cellId);
        cell.setLanguage( "gremlin" );
        cell.setCode(code);
        String url="notebooks/"+notebookId+"/cells/"+cellId;
        System.out.println(url);

        Response response = target(url).request(MediaType.APPLICATION_JSON_TYPE)
                                       .put(Entity.json(cell));
    }

    @Test
    public void testEditNotebookCell() {
        String code = "g.V()";
        NotebookCell cell = new NotebookCell();
        cell.setId(cellId);
        cell.setLanguage( "gremlin" );
        cell.setCode(code);
        String url="notebooks/"+notebookId+"/cells/"+cellId;
        System.out.println(url);

        Response response = target(url).request(MediaType.APPLICATION_JSON_TYPE)
                                       .put(Entity.json(cell));
        Result result = response.readEntity(Result.class);
    }


}





