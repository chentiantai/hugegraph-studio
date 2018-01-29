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

import static com.baidu.hugegraph.studio.notebook.model.Result.Type.EDGE;
import static com.baidu.hugegraph.studio.notebook.model.Result.Type.EMPTY;
import static com.baidu.hugegraph.studio.notebook.model.Result.Type.MARKDOWN;
import static com.baidu.hugegraph.studio.notebook.model.Result.Type.NUMBER;
import static com.baidu.hugegraph.studio.notebook.model.Result.Type.OTHER;
import static com.baidu.hugegraph.studio.notebook.model.Result.Type.PATH;
import static com.baidu.hugegraph.studio.notebook.model.Result.Type.VERTEX;

import com.baidu.hugegraph.driver.GremlinManager;
import com.baidu.hugegraph.driver.HugeClient;
import com.baidu.hugegraph.driver.SchemaManager;
import com.baidu.hugegraph.structure.graph.Edge;
import com.baidu.hugegraph.structure.graph.Vertex;
import com.baidu.hugegraph.structure.gremlin.Result;
import com.baidu.hugegraph.structure.gremlin.ResultSet;
import com.baidu.hugegraph.structure.schema.VertexLabel;
import com.baidu.hugegraph.studio.connections.model.Connection;
import com.baidu.hugegraph.studio.connections.repository.ConnectionRepository;
import com.baidu.hugegraph.studio.gremlin.GremlinOptimizer;
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
public class NotebookService {
    private static final Logger LOG =
            LoggerFactory.getLogger(NotebookService.class);

    @Autowired
    private NotebookRepository notebookRepository;
    @Autowired
    private ConnectionRepository connectionRepository;
    @Autowired
    private GremlinOptimizer gremlinOptimizer;

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
     * @param notebookId The notebook id.
     * @return The response.
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
     * @param notebookId The notebook id.
     * @param notebook Tthe notebook.
     * @return The response.
     */
    @PUT
    @Path("{notebookId}")
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public Response editNotebook(@PathParam("notebookId") String notebookId,
                                 Notebook notebook) {
        Preconditions.checkArgument(
                notebookId != null && notebookId.equals(notebook.getId()));
        /*
         * We only update the value of field from Front End. There are some
         * operation to do it. It can avoid transmitting big data.
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
            Connection connection =
                    connectionRepository.get(notebook.getConnectionId());
            notebookLocal.setConnection(connection);
        }
        notebook = notebookRepository.editNotebook(notebookLocal);
        Response response = Response.status(200).entity(notebook).build();
        return response;
    }

    /**
     * Gets notebook cell.
     *
     * @param notebookId The notebook id.
     * @param cellId The cell id
     * @return The notebook cell.
     */
    @GET
    @Path("{notebookId}/cells/{cellId}")
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public Response getNotebookCell(@PathParam("notebookId") String notebookId,
                                    @PathParam("cellId") String cellId) {
        Preconditions.checkArgument(notebookId != null && cellId != null);
        Response response = Response.status(201)
                            .entity(notebookRepository
                                    .getNotebookCell(notebookId, cellId))
                            .build();
        return response;
    }

    /**
     * Add notebook cell response.
     *
     * @param notebookId the notebook id.
     * @param position the position.
     * @param cell the cell.
     * @return the response.
     */
    @POST
    @Path("{notebookId}/cells")
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public Response addNotebookCell(@PathParam("notebookId") String notebookId,
                                    @QueryParam("position") Integer position,
                                    NotebookCell cell) {
        Response response = Response.status(201)
                                    .entity(notebookRepository.addCellToNotebook(notebookId, cell, position))
                                    .build();
        return response;
    }

    /**
     * Delete notebook cell response.
     *
     * @param notebookId the notebook id.
     * @param cellId the cell id.
     * @return the response.
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
     * @param notebookId The notebook id.
     * @param cellId The cell id.
     * @param cell The cell.
     * @return The response.
     */
    @PUT
    @Path("{notebookId}/cells/{cellId}")
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public Response editNotebookCell(@PathParam("notebookId") String notebookId,
                                     @PathParam("cellId") String cellId,
                                     NotebookCell cell) {
        Preconditions.checkArgument(cell != null && cellId.equals(cell.getId()));
        Response response = Response.status(200).entity(notebookRepository
                            .editNotebookCell(notebookId, cellId, cell)).build();
        return response;
    }

    /**
     * The method is used for get a vertex's adjacency nodes when a graph is
     * shown. The user can select any vertex which is interested in as a start
     * point, add it's adjacency vertices & edges to current graph by executing
     * the gremlin statement of 'g.V(id).bothE()'.
     *
     * After successful of the gremlin need to merge the current local query
     * results to the notebook cell's result.
     *
     * Note: this method should be executed after @see executeNotebookCell
     * (String, String) has been executed.
     *
     * @param notebookId The notebookId of current notebook.
     * @param cellId The cellId of the current notebook.
     * @param vertexId The id of vertex as a start point.
     * @return The offset graph(vertices & edges).
     */
    @GET
    @Path("{notebookId}/cells/{cellId}/gremlin")
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public Response executeNotebookCellGremlin(
            @PathParam("notebookId") String notebookId,
            @PathParam("cellId") String cellId,
            @QueryParam("vertexId") String vertexId,
            @QueryParam("label") String label) {
        Preconditions.checkArgument(notebookId != null && cellId != null &&
                                    vertexId != null);
        Preconditions.checkArgument(StringUtils.isNotBlank(label),
                                    "parameter label is blank");

        Notebook notebook = notebookRepository.getNotebook(notebookId);
        Preconditions.checkArgument(notebook != null);

        NotebookCell cell = notebook.getCellById(cellId);
        Preconditions.checkArgument(cell != null &&
                                    cellId.equals(cell.getId()));
        // Only be executed with 'gremlin' mode
        Preconditions.checkArgument(cell.getLanguage().equals("gremlin"));

        Long startTime = System.currentTimeMillis();

        com.baidu.hugegraph.studio.notebook.model.Result result =
                cell.getResult();


        /**
         * This method should be executed after the method of @see
         * executeNotebookCell(String,String). It must has a start
         * point and the result must have vertices or edges.
         */
        Preconditions.checkArgument(result != null &&
                                    result.getGraph() != null);

        HugeClient hugeClient = new HugeClient(
                                notebook.getConnection().getConnectionUri(),
                                notebook.getConnection().getGraphName());

        SchemaManager schema = hugeClient.schema();
        VertexLabel vertexLabel = schema.getVertexLabel(label);

        Object transformedVertexId = transformId(vertexId,vertexLabel);
        String gremlin = transformGremlin(transformedVertexId);


        Set<Object> vertexIds = new HashSet<>();
        Set<String> edgeIds = new HashSet<>();
        List<Vertex> vertices = result.getGraph().getVertices();
        List<Edge> edges = result.getGraph().getEdges();
        vertices.stream().forEach(v -> vertexIds.add(v.id()));
        edges.stream().forEach(e -> edgeIds.add(e.id()));


        Preconditions.checkArgument(vertexIds.contains(transformedVertexId));

        GremlinManager gremlinManager = hugeClient.gremlin();
        ResultSet resultSet = gremlinManager.gremlin(gremlin).execute();
        result.setData(resultSet.data());

        Iterator<Result> iterator= resultSet.iterator();

        com.baidu.hugegraph.studio.notebook.model.Result resultNew =
                new com.baidu.hugegraph.studio.notebook.model.Result();
        resultNew.setType(EDGE);

        List<Edge> edgesNew = new ArrayList<>();
        List<Vertex> verticesNew = new ArrayList<>();
        iterator.forEachRemaining(
                r -> {
                    Edge e = (Edge) r.getObject();
                    if (!edgeIds.contains(e.id())) {
                        edgeIds.add(e.id());
                        edgesNew.add(e);
                    }
                });
        List<Vertex> verticesFromEdges = getVertexFromEdge(hugeClient, edgesNew);
        if (verticesFromEdges != null) {
            verticesFromEdges.stream().forEach(v -> {
                if (!vertexIds.contains(v.id())) {
                    vertexIds.add(v.id());
                    verticesNew.add(v);
                }
            });
        }

        resultNew.setGraphVertices(verticesNew);
        resultNew.setGraphEdges(edgesNew);

        // Save the current query result to cell.
        vertices.addAll(verticesNew);
        edges.addAll(edgesNew);
        result.setGraphVertices(vertices);
        result.setGraphEdges(edges);
        cell.setResult(result);
        notebookRepository.editNotebookCell(notebookId, cell);

        Long endTime = System.currentTimeMillis();
        Long duration = endTime - startTime;
        resultNew.setDuration(duration);

        Response response = Response.status(200).entity(resultNew)
                                    .build();
        return response;
    }


    private Object transformId(String vertexId, VertexLabel vertexLabel){
        Object transformedVertexId = vertexId;
        switch (vertexLabel.idStrategy()) {
            case AUTOMATIC:
            case CUSTOMIZE_NUMBER:
                try {
                    transformedVertexId = Integer.valueOf(vertexId);
                } catch (NumberFormatException ignore){
                    try {
                        transformedVertexId = Long.valueOf(vertexId);
                    } catch (NumberFormatException e){
                        throw new IllegalArgumentException(
                                "The vertexId does no match with itself " +
                                "idStrategy");
                    }
                }
                break;
            case PRIMARY_KEY:
            case CUSTOMIZE_STRING:
                break;
            default:
                throw new IllegalArgumentException(String.format(
                        "The vertexLabel isStrategy %s is not supported",
                        vertexLabel.idStrategy().name()));
        }
        return transformedVertexId;
    }


    private String transformGremlin(Object transformedVertexId){
        String gremlin;
        if(transformedVertexId instanceof String){
            String gremlinVertexId =
                    StringUtils.replace(transformedVertexId.toString(), "'", "\\\\'");
            gremlin = gremlinOptimizer.limitOptimize(
                    String.format("g.V('%s').bothE()", gremlinVertexId));
        }else {
            gremlin = gremlinOptimizer.limitOptimize(
                    String.format("g.V(%s).bothE()", transformedVertexId.toString()));
        }
        return gremlin;
    }



    /**
     * To execute the code (gremlin or markdown) in a cell of notebook.
     *
     * Return the original user input code if the cell language is markdown.
     * Execute the gremlin code via HugeClient if the cell language is gremlin.
     * Gremlin result will be stored in two places, the original data is saved
     * as a List<Object>, another is translated into a graph or a table object
     * if possible.
     *
     * @param notebookId The notebookId of current notebook.
     * @param cellId The cellId of the current notebook.
     * @param newCell The cell value of the current cell.
     * @return The whole graph with json(Vertices & Eges) if the code snippet is
     *         gremlin. The original user input if the code snippet is markdown.
     */
    @PUT
    @Path("{notebookId}/cells/{cellId}/execute")
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public Response executeNotebookCell(@PathParam("notebookId") String notebookId,
                                        @PathParam("cellId") String cellId,
                                        NotebookCell newCell) {

        Preconditions.checkArgument(notebookId != null &&
                                    newCell != null &&
                                    cellId != null &&
                                    cellId.equals(newCell.getId()));

        NotebookCell cell =
                notebookRepository.editNotebookCell(notebookId, cellId, newCell);
        Long startTime = System.currentTimeMillis();

        com.baidu.hugegraph.studio.notebook.model.Result result =
                new com.baidu.hugegraph.studio.notebook.model.Result();

        /**
         * Return the original user input if the code snippet language is
         * markdown and the markdown code will be rendered in HTML by React.
         */
        if ("markdown".equals(cell.getLanguage())) {
            result.setData(new ArrayList<Object>() {
                {
                    add(cell.getCode());
                }
            });
            result.setType(MARKDOWN);
        }

        if ("gremlin".equals(cell.getLanguage())) {
            Notebook notebook = notebookRepository.getNotebook(notebookId);

            // Build HugeClient from the connection info from the notebook.
            HugeClient hugeClient = new HugeClient(
                                    notebook.getConnection().getConnectionUri(),
                                    notebook.getConnection().getGraphName());

            GremlinManager gremlinManager = hugeClient.gremlin();

            System.out.println(gremlinOptimizer.limitOptimize(cell.getCode()));

            // Execute gremlin by HugeClient.
            ResultSet resultSet = gremlinManager.gremlin(
                    gremlinOptimizer.limitOptimize(cell.getCode())).execute();

            /**
             * Gremlin result will be stored in two places, the original data is
             * saved as a List<Object>, another is translated into a graph or a
             * table object if possible.
             */
            result.setData(resultSet.data());

            List<Vertex> vertices = new ArrayList<>();
            List<Edge> edges = new ArrayList<>();
            List<com.baidu.hugegraph.structure.graph.Path> paths = new ArrayList<>();
            if(!resultSet.iterator().hasNext()) {
                result.setType(EMPTY);
            }
            for (Iterator<Result> results = resultSet.iterator(); results.hasNext();) {
                /**
                 * The result might be null, and the object must be got via
                 * Result.getObject method.
                 */
                Result or = results.next();
                if (or == null){
                    result.setType(EMPTY);
                } else {
                    Object object = or.getObject();
                    if (object instanceof Vertex) {
                        result.setType(VERTEX);
                        // Convert Object to Vertex ;
                        vertices.add((Vertex) object);
                    } else if (object instanceof Edge) {
                        result.setType(EDGE);
                        // Convert Object to Edge ;
                        edges.add((Edge) object);
                    } else if (object instanceof
                            com.baidu.hugegraph.structure.graph.Path) {
                        result.setType(PATH);
                        //convert Object to Path
                        paths.add((com.baidu.hugegraph.structure.graph.Path)
                                          object);
                    } else if (object instanceof Integer) {
                        result.setType(NUMBER);
                    } else {
                        result.setType(OTHER);
                    }
                }
            }

            /**
             * When the results contains not only vertices\edges\paths, how to
             * deal with that?
             */
            switch (result.getType()) {
                case PATH:
                    // Extract vertices from paths ;
                    vertices = getVertexFromPath(hugeClient, paths);
                    edges = getEdgeFromVertex(hugeClient, vertices);
                    break;
                case VERTEX:
                    // Extract edges from vertex ;
                    edges = getEdgeFromVertex(hugeClient, vertices);
                    break;
                case EDGE:
                    // Extract vertices from edges ;
                    vertices = getVertexFromEdge(hugeClient, edges);
                    break;
                default:
                    break;
            }

            result.setGraphVertices(vertices);
            result.setGraphEdges(edges);

        }

        cell.setResult(result);

        Long endTime = System.currentTimeMillis();
        Long duration = endTime - startTime;
        result.setDuration(duration);

        notebookRepository.editNotebookCell(notebookId, cell);
        Response response = Response.status(200).entity(result).build();
        return response;
    }

    private List<Vertex> getVertexFromEdge(HugeClient hugeClient,
                                           List<Edge> edges) {
        if (edges == null || edges.size() == 0) {
            return null;
        }
        Set<Object> vertexIds = new HashSet<>();
        edges.forEach(e -> {
            vertexIds.add(e.source());
            vertexIds.add(e.target());
        });
        return getVertices(hugeClient,
                           vertexIds.stream().collect(Collectors.toList()));

    }

    private List<Edge> getEdgeFromVertex(HugeClient hugeClient,
                                         List<Vertex> vertices) {

        if (vertices == null || vertices.size() == 0) {
            return null;
        }
        List<Edge> edges = new ArrayList<>();

        Set<Object> vertexIds = new HashSet<>();
        vertices.stream().forEach(v -> vertexIds.add(v.id()));

        List<String> idList = new ArrayList<>();
        for(Vertex vertex : vertices){
            if(vertex.id() instanceof  String){
                idList.add(String.format("'%s'", StringUtils.replace(
                        vertex.id().toString(), "'", "\\\\'")));
            } else {
                idList.add(vertex.id().toString());
            }
        }
        String ids = StringUtils.join(idList, ",");




        /**
         * De-duplication by edgeId. Reserve the edges only if both srcVertexId
         * and tgtVertexId is a member of vertices.
         */
        String gremlin = String.format("g.V(%s).bothE().dedup()", ids);

        ResultSet resultSet = hugeClient.gremlin().gremlin(gremlin).execute();

        Iterator<Result> results = resultSet.iterator();

        results.forEachRemaining(r -> {
            Edge edge = (Edge) r.getObject();
            /**
             * As the results is queried by 'g.V(id).bothE()', the
             * source vertex of edge from results is in the set of
             * vertexIds. Hence, just reserve the edge which that
             * the target in the set of vertexIds.
             */
            if (vertexIds.contains(edge.target()) &&
                vertexIds.contains(edge.source())) {
                edges.add(edge);
            }
        });


        return edges;

    }

    private List<Vertex> getVertices(HugeClient hugeClient,
                                     List<Object> vertexIds) {
        if (vertexIds == null || vertexIds.size() == 0) {
            return null;
        }
        List<Vertex> vertices = new ArrayList<>();

        List<String> idList = new ArrayList<>();
        for (Object vertexId : vertexIds) {
            if (vertexId instanceof String) {
                idList.add(String.format("'%s'", StringUtils.replace(
                        vertexId.toString(), "'", "\\\\'")));
            } else {
                idList.add(vertexId.toString());
            }
        }
        String ids = StringUtils.join(idList, ",");

        String gremlin = String.format("g.V(%s)", ids);
        ResultSet resultSet = hugeClient.gremlin().gremlin(gremlin).execute();
        Iterator<Result> results = resultSet.iterator();
        List<Vertex> finalVertices = vertices;
        results.forEachRemaining(
                vertex -> finalVertices.add((Vertex) vertex.getObject()));
        return vertices;
    }

    private List<Vertex> getVertexFromPath(HugeClient hugeClient,
                                           List<com.baidu.hugegraph.structure
                                           .graph.Path> paths) {
        if (paths == null) {
            return null;
        }

        Set<Object> vertexIds = new HashSet<>();
        // The path node can be a Vertex, or an Edge.
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
