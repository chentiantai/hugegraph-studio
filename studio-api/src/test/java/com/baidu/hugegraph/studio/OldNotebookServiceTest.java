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

import com.baidu.hugegraph.studio.notebook.model.Notebook;
import com.baidu.hugegraph.studio.notebook.service.NotebookService;
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
import java.time.Instant;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

public class OldNotebookServiceTest extends JerseyTest {
    private static final Logger LOG = LoggerFactory.getLogger(OldNotebookServiceTest.class);
    private ObjectMapper mapper;

    private Set<String> notebookIds;

    private void addNotebookId(String nodebookId){
        this.notebookIds.add(nodebookId);
    }

    public OldNotebookServiceTest() {
        mapper = new ObjectMapper();
        mapper.enable(SerializationFeature.INDENT_OUTPUT);
        this.notebookIds = new HashSet<>();
    }

    @After
    public void postTest(){
        if ( notebookIds == null ) {
            return;
        }
        notebookIds.stream().forEach( id -> {
            deleteNotebook(id);
            LOG.info("delete notebook=" + id );
        });
    }

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
                .forServlet(new ServletContainer(new ResourceRegister()))
                .addListener(ContextLoaderListener.class)
                .contextParam("contextConfigLocation",
                              "classpath:applicationContext.xml")
                .build();
    }

    private Notebook buildNotebook(){
        Notebook notebook = new Notebook();
        notebook.setConnectionId("test-connectionId");
        notebook.setName("test");
        return addNotebook(notebook);
    }

    private Notebook addNotebook(Notebook notebook){
        Response response = target("notebooks")
                .request(MediaType.APPLICATION_JSON_TYPE)
                .post(Entity.json(notebook));
        return response.readEntity(Notebook.class);
    }

    private void deleteNotebook(String notebookId){
        target("notebooks/" + notebookId)
                .request(MediaType.APPLICATION_JSON_TYPE)
                .delete();
    }

    @Test
    public void testAdd(){
        Notebook notebook = buildNotebook();
        Response response = target("notebooks")
                .request(MediaType.APPLICATION_JSON_TYPE)
                .post(Entity.json(notebook));

        Assert.assertEquals("should return status 201", 201,
                            response.getStatus());

        notebook = response.readEntity(Notebook.class);
        String notebookId = notebook.getId();

        Assert.assertTrue(StringUtils.isNotEmpty(notebookId));
        LOG.info("notebookId=" + notebookId );
        addNotebookId(notebookId);

    }

    @Test
    public void testDelete(){
        Notebook notebook = buildNotebook();
        Assert.assertTrue(notebook != null && StringUtils.isNotEmpty(notebook.getId()));
        String notebookId = notebook.getId();

        Response response = target("notebooks/" + notebookId)
                .request(MediaType.APPLICATION_JSON_TYPE)
                .delete();

        Assert.assertEquals(204, response.getStatus());
        addNotebookId(notebookId);
    }

    @Test
    public void testGetSingle(){
        Notebook notebook = buildNotebook();
        Assert.assertTrue(notebook != null && StringUtils.isNotEmpty(notebook.getId()));
        String notebookId = notebook.getId();

        Notebook notebook1 = target("notebooks/" + notebookId)
                .request(MediaType.APPLICATION_JSON_TYPE)
                .get(Notebook.class);

        Assert.assertTrue(notebook1 != null && notebook1.getId().equals(notebookId));
        addNotebookId(notebookId);
    }

    @Test
    public void testGetList(){
        Notebook notebook = buildNotebook();
        Assert.assertTrue(notebook != null && StringUtils.isNotEmpty(notebook.getId()));
        String notebookId = notebook.getId();

        Response response = target("notebooks")
                .request(MediaType.APPLICATION_JSON_TYPE)
                .get();
        Assert.assertEquals(200, response.getStatus());

        List<Notebook> notebooks = response.readEntity(
                new GenericType<List<Notebook>>(){
                });
        Assert.assertTrue(notebooks != null
            && notebooks.stream().anyMatch(n -> n.getId().equals(notebookId)));

        addNotebookId(notebookId);
    }

    @Test
    public void testUpdate(){
        Notebook notebook = buildNotebook();
        Assert.assertTrue(notebook != null && StringUtils.isNotEmpty(notebook.getId()));
        String notebookId = notebook.getId();

        notebook.setCreated(Instant.now().getEpochSecond());
        notebook.setLastUsed(Instant.now().getEpochSecond());

        Response responseUpdate = target("notebooks/" + notebookId)
                .request(MediaType.APPLICATION_JSON_TYPE)
                .put(Entity.json(notebook));

        Assert.assertEquals(200, responseUpdate.getStatus());
        Notebook notebook1 = responseUpdate.readEntity(Notebook.class);

        Assert.assertTrue(notebook1 != null && notebook1.getId().equals(notebookId));

        addNotebookId(notebookId);
    }

}
