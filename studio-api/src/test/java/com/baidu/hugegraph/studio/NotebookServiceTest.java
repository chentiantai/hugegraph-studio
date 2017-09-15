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
    static final String connectionId = "bd6a0e72-de3e-425a-90f0-edf8a3d5f910";
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
        return ServletDeploymentContext
                .forServlet(new ServletContainer(new NotebookServiceTest.ResourceRegister()))
                .addListener(ContextLoaderListener.class)
                .contextParam("contextConfigLocation",
                        "classpath:applicationContext.xml")
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
        if(notebook.getCells().size()>0){
            cellId = notebook.getCells().get(0).getId();
        }else{
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

        Response response = target("notebooks/"+notebookId+"/cells")
                            .queryParam( "position",1 )
                            .request(MediaType.APPLICATION_JSON_TYPE)
                            .post(Entity.json(cell));

        NotebookCell notebookCell = response.readEntity(NotebookCell.class);
        return notebookCell.getId();

    }


    @After
    public void after() {
        Response response = target("notebooks/" + notebookId)
                            .request(MediaType.APPLICATION_JSON_TYPE)
                            .delete();
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
        String vertexId="person:Rosie O'Donnell";
        NotebookCell cell = new NotebookCell();
        cell.setId(cellId);
        cell.setLanguage( "gremlin" );
        cell.setCode("g.V('person:Rosie O\\'Donnell')");
        String url="notebooks/"+notebookId+"/cells/"+cellId+ "/execute";
        System.out.println(url);
        Response response = target(url)
                            .request(MediaType.APPLICATION_JSON_TYPE)
                            .put(Entity.json(cell));

        url="notebooks/"+notebookId+"/cells/"+cellId+ "/gremlin";
        System.out.println(url);

        Response response1 = target(url).queryParam( "vertexId",vertexId )
                             .request(MediaType.APPLICATION_JSON_TYPE)
                             .get();

        Assert.assertEquals(200, response.getStatus());
    }


    @Test
    public void testExecuteNotebookCell(){
        String code = "g.V()";
        NotebookCell cell = new NotebookCell();
        cell.setId(cellId);
        cell.setLanguage( "gremlin" );
        cell.setCode(code);
        String url="notebooks/"+notebookId+"/cells/"+cellId+ "/execute";
        System.out.println(url);

        Response response = target(url)
                            .request(MediaType.APPLICATION_JSON_TYPE)
                            .put(Entity.json(cell));
        Result result = response.readEntity(Result.class);
        Assert.assertEquals(200, response.getStatus());


    }




}
