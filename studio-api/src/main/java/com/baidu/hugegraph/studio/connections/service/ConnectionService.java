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

package com.baidu.hugegraph.studio.connections.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import org.springframework.beans.factory.annotation.Autowired;

import com.baidu.hugegraph.driver.HugeClient;
import com.baidu.hugegraph.exception.ServerException;
import com.baidu.hugegraph.structure.schema.EdgeLabel;
import com.baidu.hugegraph.structure.schema.PropertyKey;
import com.baidu.hugegraph.structure.schema.VertexLabel;
import com.baidu.hugegraph.studio.connections.model.Connection;
import com.baidu.hugegraph.studio.connections.model.ConnectionState;
import com.baidu.hugegraph.studio.connections.repository.ConnectionRepository;
import com.baidu.hugegraph.studio.notebook.model.Notebook;
import com.baidu.hugegraph.studio.notebook.repository.NotebookRepository;
import com.google.common.base.Preconditions;

/**
 * Connection service for Jersey Restful Api
 */
@Path("connections")
public class ConnectionService {

    @Autowired
    private ConnectionRepository connectionRepository;
    @Autowired
    private NotebookRepository notebookRepository;

    /**
     * Gets connections.
     *
     * @return The connections.
     */
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response getConnections() {
        return Response.status(200)
                       .entity(connectionRepository.getConnections())
                       .build();
    }

    /**
     * Gets connection.
     *
     * @param connectionId The connection id.
     * @return The connection.
     */
    @GET
    @Path("{connectionId}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getConnection(
            @PathParam("connectionId") String connectionId) {
        return Response.status(200)
                       .entity(connectionRepository.get(connectionId))
                       .build();
    }

    /**
     * Create connection response.
     *
     * @param connection The connection.
     * @return The response.
     */
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public Response createConnection(Connection connection) {
        connection.setLastModified(System.currentTimeMillis());

        return Response.status(201)
                       .entity(connectionRepository.createConnection(connection))
                       .build();
    }

    /**
     * Delete connection response.
     *
     * @param connectionId The connection id.
     * @return The response.
     */
    @DELETE
    @Path("{connectionId}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response deleteConnection(
            @PathParam("connectionId") String connectionId) {
        Preconditions.checkArgument(!notebookRepository.getNotebooks().stream()
               .parallel().anyMatch(n -> n.getConnectionId()
                                          .equals(connectionId)),
               "The connection can't be deleted if it has " +
               "already been used by any notebook");
        connectionRepository.deleteConnection(connectionId);
        return Response.status(204).build();
    }

    /**
     * Edit connection response.
     *
     * @param connectionId The connection id.
     * @param connection The connection.
     * @return The response.
     */
    @PUT
    @Path("{connectionId}")
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public Response editConnection(
            @PathParam("connectionId") String connectionId,
            Connection connection) {
        Preconditions.checkArgument(connectionId != null &&
                                    connectionId.equals(connection.getId()));
        connection.setLastModified(System.currentTimeMillis());
        connectionRepository.editConnection(connection);
        /*
         * Update the connection information of notebook according to the
         * connection.
         */
        List<Notebook> notebookList = notebookRepository.getNotebooks();
        for (Notebook notebook : notebookList) {
            if (notebook.getConnectionId().equals(connectionId)) {
                notebook.setConnection(connection);
                notebookRepository.editNotebook(notebook);
            }
        }
        return Response.status(200).entity(connection).build();
    }

    /**
     * Gets connection status.
     *
     * @param connection The connection.
     * @return The connection status.
     */
    @GET
    @Path("status")
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public Response getConnectionStatus(Connection connection) {
        Preconditions.checkNotNull(connection);
        Response response = Response.status(200).entity(ConnectionState.OPEN)
                                    .build();
        try {
            new HugeClient(connection.getConnectionUri(),
                           connection.getGraph());
        } catch (ServerException e) {
            response = Response.status(e.status())
                               .entity(ConnectionState.CLOSED)
                               .build();
        }
        return response;
    }

    /**
     * Gets connection schema.
     *
     * @param connectionId The connection id.
     * @return The connection schema.
     */
    @GET
    @Path("{connectionId}/schema")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getConnectionSchema(
            @PathParam("connectionId") String connectionId) {
        Preconditions.checkNotNull(connectionId);
        Connection connection = connectionRepository.get(connectionId);
        Preconditions.checkNotNull(connection);
        Preconditions.checkArgument(connection.getId().equals(connectionId));

        HugeClient client = new HugeClient(connection.getConnectionUri(),
                                           connection.getGraph());
        Map<String, List> schemas = new HashMap<>();
        List<PropertyKey> propertyKeys = client.schema().getPropertyKeys();
        List<VertexLabel> vertexLabels = client.schema().getVertexLabels();
        List<EdgeLabel> edgeLabels = client.schema().getEdgeLabels();
        schemas.put("propertyKeys", propertyKeys);
        schemas.put("vertexLabels", vertexLabels);
        schemas.put("edgeLabels", edgeLabels);
        return Response.status(200).entity(schemas).build();
    }
}
