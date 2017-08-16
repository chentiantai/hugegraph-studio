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

package com.baidu.hugegraph.studio.notebook.service;

import com.baidu.hugegraph.driver.GremlinManager;
import com.baidu.hugegraph.driver.HugeClient;
import com.baidu.hugegraph.structure.graph.Edge;
import com.baidu.hugegraph.structure.graph.Vertex;
import com.baidu.hugegraph.structure.gremlin.Result;
import com.baidu.hugegraph.structure.gremlin.ResultSet;
import com.baidu.hugegraph.studio.connections.model.Connection;
import com.baidu.hugegraph.studio.connections.repository.ConnectionRepository;
import com.baidu.hugegraph.studio.notebook.model.Notebook;
import com.baidu.hugegraph.studio.notebook.model.NotebookCell;
import com.baidu.hugegraph.studio.notebook.repository.NotebookRepository;
import com.google.common.base.Preconditions;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;

import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

/**
 * Notebook service for Jersey Restful Api
 */
@Path("notebooks")
public class NoteBookService {
    private static final Logger LOG =
            LoggerFactory.getLogger(NoteBookService.class);

    @Autowired
    private NotebookRepository notebookRepository;
    @Autowired
    private ConnectionRepository connectionRepository;

    /**
     * Gets notebooks.
     *
     * @return the notebooks
     */
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response getNotebooks() {
        List<Notebook> notebookList = notebookRepository.getNotebooks();
        notebookList.forEach(notebook -> {
            Connection connection =
                    connectionRepository.get(notebook.getConnectionId());
            notebook.setConnection(connection);
        });
        Response response = Response.status(200).entity(notebookList).build();
        return response;
    }

    /**
     * Gets notebook.
     *
     * @param notebookId the notebook id
     * @return the notebook
     */
    @GET
    @Path("{notebookId}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getNotebook(@PathParam("notebookId") String notebookId) {
        Preconditions.checkArgument(StringUtils.isNotEmpty(notebookId));
        Notebook notebook = notebookRepository.getNotebook(notebookId);
        Connection connection =
                connectionRepository.get(notebook.getConnectionId());
        notebook.setConnection(connection);
        Response response = Response.status(200).entity(notebook).build();
        return response;
    }

    /**
     * Add notebook response.
     *
     * @param notebook the notebook
     * @return the response
     */
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public Response addNotebook(Notebook notebook) {
        Preconditions.checkNotNull(notebook);
        Preconditions.checkArgument(
                StringUtils.isNotEmpty(notebook.getConnectionId()));
        Connection connection =
                connectionRepository.get(notebook.getConnectionId());
        notebook.setConnection(connection);
        Response response = Response.status(201)
                .entity(notebookRepository.createNotebook(notebook))
                .build();
        return response;
    }

    /**
     * Delete notebook response.
     *
     * @param notebookId the notebook id
     * @return the response
     */
    @DELETE
    @Path("{notebookId}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response deleteNotebook(@PathParam("notebookId") String notebookId) {
        Preconditions.checkArgument(StringUtils.isNotEmpty(notebookId));
        notebookRepository.deleteNotebook(notebookId);
        Response response = Response.status(204).build();
        return response;
    }

    /**
     * Edit notebook response.
     *
     * @param notebookId the notebook id
     * @param notebook   the notebook
     * @return the response
     */
    @PUT
    @Path("{notebookId}")
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public Response editNotebook(@PathParam("notebookId") String notebookId,
                                 Notebook notebook) {
        Preconditions.checkArgument(
                notebookId != null && notebookId.equals(notebook.getId()));

        Connection connection =
                connectionRepository.get(notebook.getConnectionId());

        /*
         * We only update the value of field from Front End. There are some
         * operation to do it. It can avoid  transmitting big data.
         */
        Notebook notebookLocal =
                notebookRepository.getNotebook(notebook.getId());
        if (notebook.getName() != null) {
            notebookLocal.setName(notebook.getName());
        }
        if (notebook.getCells() != null) {
            notebookLocal.setCells(notebook.getCells());
        }
        if (notebook.getConnectionId() != null) {
            notebookLocal.setConnectionId(notebook.getConnectionId());
        }
        notebook = notebookRepository.editNotebook(notebookLocal);

        notebook.setConnection(connection);
        Response response = Response.status(200).entity(notebook).build();
        return response;
    }

    /**
     * Gets notebook cell.
     *
     * @param notebookId the notebook id
     * @param cellId     the cell id
     * @return the notebook cell
     */
    @GET
    @Path("{notebookId}/cells/{cellId}")
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public Response getNotebookCell(@PathParam("notebookId") String notebookId,
                                    @PathParam("cellId") String cellId) {
        Preconditions.checkArgument(notebookId != null && cellId != null);
        Response response = Response.status(201)
                .entity(notebookRepository.getNotebookCell(notebookId, cellId))
                .build();
        return response;
    }

    /**
     * Add notebook cell response.
     *
     * @param notebookId the notebook id
     * @param position   the position
     * @param cell       the cell
     * @return the response
     */
    @POST
    @Path("{notebookId}/cells")
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public Response addNotebookCell(@PathParam("notebookId") String notebookId,
                                    @QueryParam("position") Integer position,
                                    NotebookCell cell) {
        Response response = Response.status(201)
                .entity(notebookRepository
                        .addCellToNotebook(notebookId, cell, position)).build();
        return response;
    }

    /**
     * Delete notebook cell response.
     *
     * @param notebookId the notebook id
     * @param cellId     the cell id
     * @return the response
     */
    @DELETE
    @Path("{notebookId}/cells/{cellId}")
    public Response deleteNotebookCell(
            @PathParam("notebookId") String notebookId,
            @PathParam("cellId") String cellId) {
        notebookRepository.deleteNotebookCell(notebookId, cellId);
        Response response = Response.status(204).build();
        return response;
    }

    /**
     * Edit notebook cell response.
     *
     * @param notebookId the notebook id
     * @param cellId     the cell id
     * @param cell       the cell
     * @return the response
     */
    @PUT
    @Path("{notebookId}/cells/{cellId}")
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public Response editNotebookCell(@PathParam("notebookId") String notebookId,
                                     @PathParam("cellId") String cellId,
                                     NotebookCell cell) {
        Preconditions.checkArgument(cell != null && cellId.equals(cell.getId()));
        Response response = Response.status(200)
                .entity(notebookRepository
                        .editNotebookCell(notebookId, cellId, cell)).build();
        return response;
    }

     /*
     * The method is used for get a vertex's adjacency nodes
     * When a graph shows, the user can select any vertex that he is
     * interested in
     * as a starting point, add it's adjacency vertices & edges to current graph
     * by executing  the gremlin statement of 'g.V(id).bothE()'.
     *
     * After the success of the gremlin need to merge the current local query
      * results
     * to the notebook cell's result.
     *
     * Note: this method should be executed after @see executeNotebookCell
     * (String,String) has been executed.
     *
     * @param notebookId : the notebookId of current notebook.
     * @param cellId : the cellId of the current notebook.
     * @param vertexId : The id of vertex as a starting point.
     * @return : just return the offset graph( vertices & edges )
     */

    /**
     * Execute notebook cell gremlin response.
     *
     * @param notebookId the notebook id
     * @param cellId     the cell id
     * @param vertexId   the vertex id
     * @return the response
     */
    @GET
    @Path("{notebookId}/cells/{cellId}/gremlin")
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public Response executeNotebookCellGremlin(
            @PathParam("notebookId") String notebookId,
            @PathParam("cellId") String cellId,
            @QueryParam("vertexId") String vertexId) {
        Preconditions.checkArgument(notebookId != null && cellId != null &&
                                    vertexId != null);
        NotebookCell cell =
                notebookRepository.getNotebookCell(notebookId, cellId);

        Preconditions.checkArgument(cell != null && cellId.equals(cell.getId()));

        // only be executed with 'gremlin' mode
        Preconditions.checkArgument(cell.getLanguage().equals("gremlin"));

        Long startTime = System.currentTimeMillis();

        com.baidu.hugegraph.studio.notebook.model.Result result =
                cell.getResult();

        /*
         * This method should be executed after the method of @see
         * executeNotebookCell(String,String). It must have a starting
         * point and the result must have vertices or edges.
         */
        Preconditions.checkArgument(result != null && result.getGraph() != null);

        Notebook notebook = notebookRepository.getNotebook(notebookId);
        Preconditions.checkArgument(notebook != null);
        HugeClient hugeClient = HugeClient.open(
                notebook.getConnection().getConnectionUri(),
                notebook.getConnection().getGraphName());

        String gremlin = String.format("g.V('%s').bothE()", vertexId);
        LOG.debug("gremlin: " + gremlin);

        GremlinManager gremlinManager = hugeClient.gremlin();
        ResultSet resultSet = gremlinManager.gremlin(gremlin).execute();
        result.setData(resultSet.data());

        Set<String> vertexIds = new HashSet<>();
        Set<String> edgeIds = new HashSet<>();

        List<Vertex> vertices = result.getGraph().getVertices();
        List<Edge> edges = result.getGraph().getEdges();

        vertices.stream().forEach(v -> vertexIds.add(v.id()));
        edges.stream().forEach(e -> edgeIds.add(e.id()));

        Preconditions.checkArgument(vertexIds.contains(vertexId));

        Iterator<Result> results = resultSet.iterator();

        com.baidu.hugegraph.studio.notebook.model.Result resultNew =
                new com.baidu.hugegraph.studio.notebook.model.Result();

        resultNew.setType(
                com.baidu.hugegraph.studio.notebook.model.Result.Type
                        .EDGE);

        List<Edge> edgesNew = new ArrayList<>();
        List<Vertex> verticesNew = new ArrayList<>();

        results.forEachRemaining(
                r -> {
                    Edge e = (Edge) r.getObject();
                    if (!edgeIds.contains(e.id())) {
                        edgeIds.add(e.id());
                        edgesNew.add(e);
                    }
                });

        List<Vertex> verticesCurrentFromEdge =
                getVertexfromEdge(hugeClient, edgesNew);
        if (verticesCurrentFromEdge != null) {
            verticesCurrentFromEdge.stream().forEach(v -> {
                if (!vertexIds.contains(v.id())) {
                    vertexIds.add(v.id());
                    verticesNew.add(v);
                }
            });
        }

        resultNew.setGraphVertices(verticesNew);
        resultNew.setGraphEdges(edgesNew);

        // save the current query result to cell
        vertices.addAll(verticesNew);
        edges.addAll(edgesNew);
        result.setGraphVertices(vertices);
        result.setGraphEdges(edges);
        cell.setResult(result);
        notebookRepository.editNotebookCell(notebookId, cell);

        Long endTime = System.currentTimeMillis();
        Long duration = endTime - startTime;
        resultNew.setDuration(duration);

        Response response = Response.status(200)
                .entity(resultNew)
                .build();
        return response;
    }

    /*
     * To execute the code (gremlin or markdown) in a cell of notebook.
     *
     * If the language of cell is markdown, just return the original code
     * user input.
     * If the language of cell is gremlin, execute gremlin code by HugeClient.
     * Gremlin result will be served 2 places: original data is saved as
     * List<Object>,
     * Another data is translated into a graph or a table object if it's
     * possible.
     *
     * @param notebookId : the notebookId of current notebook.
     * @param cellId : the cellId of the current notebook.
     * @return if code snippet is gremlin ,return the whole graph with json(
     * vertices & edges )
     *         if code snippet is markdown , just return the original code
     *         user input.
     */

    /**
     * Execute notebook cell response.
     *
     * @param notebookId the notebook id
     * @param cellId     the cell id
     * @param newCell    the new cell
     * @return the response
     */
    @PUT
    @Path("{notebookId}/cells/{cellId}/execute")
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public Response executeNotebookCell(
            @PathParam("notebookId") String notebookId,
            @PathParam("cellId") String cellId,
            NotebookCell newCell) {
        LOG.debug(
                "executeNotebookCell: notebookId={},cellId={} ,language={} \n"
                        + " code={}",
                notebookId, cellId, newCell.getLanguage(), newCell.getCode());

        Preconditions.checkArgument(notebookId != null &&
                newCell != null && cellId != null && cellId
                .equals(newCell.getId()));
        NotebookCell cell =
                notebookRepository
                        .editNotebookCell(notebookId, cellId, newCell);
        Long startTime = System.currentTimeMillis();

        LOG.debug(
                "executeNotebookCell: notebookId={},cellId={} ,language={} \n"
                        + " code={}",
                notebookId, cellId, cell.getLanguage(), cell.getCode());

        com.baidu.hugegraph.studio.notebook.model.Result result =
                new com.baidu.hugegraph.studio.notebook.model.Result();

        // if code snippet language is markdown, just return the original
        // code user input.
        // The markdown code will be rendered in HTML by react
        if ("markdown".equals(cell.getLanguage())) {
            result.setData(new ArrayList<Object>() {
                {
                    add(cell.getCode());
                }
            });
            result.setType(
                    com.baidu.hugegraph.studio.notebook.model.Result.Type.MARKDOWN);
        }

        if ("gremlin".equals(cell.getLanguage())) {
            Notebook notebook = notebookRepository.getNotebook(notebookId);

            // build HugeClient from the connection info from the notebook.
            HugeClient hugeClient = HugeClient.open(
                    notebook.getConnection().getConnectionUri(),
                    notebook.getConnection().getGraphName());

            GremlinManager gremlinManager = hugeClient.gremlin();

            // execute gremlin by HugeClient.
            ResultSet resultSet =
                    gremlinManager.gremlin(cell.getCode()).execute();

            // gremlin result will be served 2 places,
            // original data is saved as List<Object>,
            // Another data is translated into a graph or a table object if
            // it's possible.
            result.setData(resultSet.data());

            List<Vertex> vertices = new ArrayList<>();
            List<Edge> edges = new ArrayList<>();

            Iterator<Result> results = resultSet.iterator();

            // return empty
            if (resultSet.data().size() == 0) {

                Long endTime = System.currentTimeMillis();
                Long duration = endTime - startTime;
                result.setDuration(duration);

                return Response.status(200)
                        .entity(result)
                        .build();

            }

            // To get first object to determine the data type .
            Object object = results.next().getObject();

            // Try to translate gremlin result into a graph when it's type is
            // Vertex/Edge/Path
            if (object instanceof Vertex) {
                result.setType(
                        com.baidu.hugegraph.studio.notebook.model.Result.Type
                                .VERTEX);
                // Convert Object to Vertex ;
                List<Vertex> finalVertices = vertices;
                //add first object
                vertices.add((Vertex) object);
                results.forEachRemaining(vertex -> finalVertices
                        .add((Vertex) vertex.getObject()));

                // Extract vertices from edges ;
                edges = getEdgefromVertex(hugeClient, vertices);

                result.setGraphVertices(vertices);
                result.setGraphEdges(edges);

            } else if (object instanceof Edge) {
                result.setType(
                        com.baidu.hugegraph.studio.notebook.model.Result.Type
                                .EDGE);
                // Convert Object to Edge ;
                List<Edge> finalEdges = edges;
                edges.add((Edge) object);
                results.forEachRemaining(
                        edge -> finalEdges.add((Edge) edge.getObject()));

                // Extract vertices from edges ;
                vertices = getVertexfromEdge(hugeClient, edges);

                result.setGraphVertices(vertices);
                result.setGraphEdges(edges);

            } else if (object instanceof com.baidu.hugegraph.structure.graph
                    .Path) {
                result.setType(
                        com.baidu.hugegraph.studio.notebook.model.Result.Type
                                .PATH);

                List<com.baidu.hugegraph.structure.graph.Path> paths =
                        new ArrayList<com.baidu.hugegraph.structure.graph
                                .Path>();
                paths.add((com.baidu.hugegraph.structure.graph.Path) object);
                results.forEachRemaining(path -> paths
                        .add((com.baidu.hugegraph.structure.graph.Path) path
                                .getObject()));

                // Extract vertices from paths ;
                vertices = getVertexfromPath(hugeClient, paths);
                // Extract edges from vertices ;
                edges = getEdgefromVertex(hugeClient, vertices);

                result.setGraphVertices(vertices);
                result.setGraphEdges(edges);

            } else if (object instanceof Integer) {
                result.setType(
                        com.baidu.hugegraph.studio.notebook.model.Result.Type
                                .NUMBER);
            } else {
                result.setType(
                        com.baidu.hugegraph.studio.notebook.model.Result.Type
                                .EMPTY);
            }
        }

        cell.setResult(result);
        Long endTime = System.currentTimeMillis();
        Long duration = endTime - startTime;
        result.setDuration(duration);

        notebookRepository.editNotebookCell(notebookId, cell);
        Response response = Response.status(200)
                .entity(result)
                .build();
        return response;
    }

    private List<Vertex> getVertexfromEdge(HugeClient hugeClient,
                                           List<Edge> edges) {
        if (edges == null || edges.size() == 0) {
            return null;
        }
        Set<String> vertexIds = new HashSet<>();
        edges.forEach(e -> {
            vertexIds.add(e.source());
            vertexIds.add(e.target());
        });
        return getVertices(hugeClient,
                vertexIds.stream().collect(Collectors.toList()));

    }

    private List<Edge> getEdgefromVertex(HugeClient hugeClient,
                                         List<Vertex> vertices) {

        if (vertices == null) {
            return null;
        }
        List<Edge> edges = new ArrayList<>();

        Set<String> vertexIds = new HashSet<>();
        vertices.stream().forEach(v -> vertexIds.add(v.id()));

        String ids = StringUtils.join(
                vertices.stream()
                        .map(vertex -> String.format("\"%s\"", vertex.id()))
                        .collect(Collectors.toList()),
                ",");

        // de-duplication by edgeId,
        // Reserve the edges only if both it's srcVertexId and tgtVertexId is a
        // member of vertices;
        String gremlin = String.format(
                "g.V(%s).bothE().dedup()", ids);

        ResultSet resultSet = hugeClient
                .gremlin()
                .gremlin(gremlin)
                .execute();

        Iterator<Result> results = resultSet.iterator();

        results.forEachRemaining(
                r -> {
                    Edge edge = (Edge) r.getObject();
                    // As the results is queried by 'g.V(id).bothE()',
                    // the source vertex of edge from results is in the set
                    // of vertexIds,
                    // so just reserve the edge that it's target in the set
                    // of vertexIds .
                    if (vertexIds.contains(edge.target())) {
                        edges.add(edge);
                    }
                });

        return edges;

    }

    private List<Vertex> getVertices(HugeClient hugeClient,
                                     List<String> vertexIds) {
        if (vertexIds == null) {
            return null;
        }
        List<Vertex> vertices = new ArrayList<Vertex>();

        String ids = StringUtils.join(
                vertexIds.stream()
                        .map(id -> String.format("\"%s\"", id))
                        .collect(Collectors.toList()),
                ",");

        String gremlin = String.format("g.V(%s)", ids);

        ResultSet resultSet = hugeClient.gremlin().gremlin(gremlin).execute();

        Iterator<Result> results = resultSet.iterator();

        List<Vertex> finalVertices = vertices;
        results.forEachRemaining(
                vertex -> finalVertices.add((Vertex) vertex.getObject()));
        return vertices;
    }

    private List<Vertex> getVertexfromPath(HugeClient hugeClient,
                                           List<com.baidu.hugegraph.structure
                                                   .graph.Path> paths) {
        if (paths == null) {
            return null;
        }

        Set<String> vertexIds = new HashSet<>();
        // the path node can be a Vertex, or it can be a Edge
        paths.stream().forEach(path -> path.objects().forEach(obj -> {
            if (obj instanceof Vertex) {
                Vertex vertex = (Vertex) obj;
                vertexIds.add(vertex.id());
            } else if (obj instanceof Edge) {
                Edge edge = (Edge) obj;
                vertexIds.add(edge.source());
                vertexIds.add(edge.target());

            }
        }));
        return getVertices(hugeClient,
                vertexIds.stream().collect(Collectors.toList()));

    }

}
