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
 * Created by jishilei on 2017/5/13.
 */
@Path("notebooks")
public class NoteBookService {
    private static final Logger logger =
            LoggerFactory.getLogger(NoteBookService.class);

    @Autowired
    private NotebookRepository notebookRepository;
    @Autowired
    private ConnectionRepository connectionRepository;

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response getNotebooks() {
        List<Notebook> notebookList = notebookRepository.getNotebooks();
        notebookList.forEach(notebook -> {
            Connection connection =
                    connectionRepository.get(notebook.getConnectionId());
            notebook.setConnection(connection);
        });
        Response response = Response.status(200)
                .entity(notebookList)
                .build();
        return response;
    }

    @GET
    @Path("{notebookId}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getNotebook(@PathParam("notebookId") String notebookId) {
        Preconditions.checkArgument(StringUtils.isNotEmpty(notebookId));
        Notebook notebook = notebookRepository.getNotebook(notebookId);
        Connection connection =
                connectionRepository.get(notebook.getConnectionId());
        notebook.setConnection(connection);
        Response response = Response.status(200)
                .entity(notebook)
                .build();
        return response;
    }

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

    @DELETE
    @Path("{notebookId}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response deleteNotebook(@PathParam("notebookId") String notebookId) {
        notebookRepository.deleteNotebook(notebookId);
        Response response = Response.status(204)
                .build();
        return response;
    }

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

        /*We only update the value of field from Front End. There are some
        operation to do it. It can avoid  transmitting big data. */
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
        Response response = Response.status(200)
                .entity(notebook)
                .build();
        return response;
    }

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

    @POST
    @Path("{notebookId}/cells")
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public Response addNotebookCell(@PathParam("notebookId") String notebookId,
                                    @QueryParam("position") Integer position,
                                    NotebookCell cell) {
        Response response = Response.status(201)
                .entity(notebookRepository
                        .addCellToNotebook(notebookId, cell, position))
                .build();
        return response;
    }

    @DELETE
    @Path("{notebookId}/cells/{cellId}")
    public Response deleteNotebookCell(
            @PathParam("notebookId") String notebookId,
            @PathParam("cellId") String cellId) {
        notebookRepository.deleteNotebookCell(notebookId, cellId);
        Response response = Response.status(204)
                .build();
        return response;
    }

    @PUT
    @Path("{notebookId}/cells/{cellId}")
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public Response editNotebookCell(@PathParam("notebookId") String notebookId,
                                     @PathParam("cellId") String cellId,
                                     NotebookCell cell) {
        Preconditions
                .checkArgument(cell != null && cellId.equals(cell.getId()));

        NotebookCell cellLocal =
                notebookRepository.getNotebookCell(notebookId, cellId);


        /*It only update the value of field from Front End. There are some
        operation to do it. It can avoid  transmitting big data. */
        if (cell.getCode() != null) {
            cellLocal.setCode(cell.getCode());
        }
        if (cell.getLanguage() != null) {
            cellLocal.setLanguage(cell.getLanguage());
        }
        if (cell.getResult() != null) {
            cellLocal.setResult(cell.getResult());
        }
        if (cell.getMsg() != null) {
            cellLocal.setMsg(cell.getMsg());
        }
        if (cell.getStatus() != null) {
            cellLocal.setStatus(cell.getStatus());
        }
        if (cell.getViewSettings() != null) {
            cellLocal.setViewSettings(cell.getViewSettings());
        }
        if (cell.getDataViewType() != null) {
            cellLocal.setDataViewType(cell.getDataViewType());
        }


        Response response = Response.status(200)
                .entity(notebookRepository.editNotebookCell(notebookId,
                        cellLocal))
                .build();
        return response;
    }

    @GET
    @Path("{notebookId}/cells/{cellId}/execute")
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public Response executeNotebookCell(
            @PathParam("notebookId") String notebookId,
            @PathParam("cellId") String cellId) {
        Preconditions.checkArgument(notebookId != null && cellId != null);
        NotebookCell cell =
                notebookRepository.getNotebookCell(notebookId, cellId);
        Preconditions.checkArgument(cellId.equals(cell.getId()));
        Long startTime = System.currentTimeMillis();

        com.baidu.hugegraph.studio.notebook.model.Result result =
                new com.baidu.hugegraph.studio.notebook.model.Result();
        if ("markdown".equals(cell.getLanguage())) {
            result.setData(new ArrayList<Object>() {
                {
                    add(cell.getCode());
                }
            });
        }

        if ("gremlin".equals(cell.getLanguage())) {
            Notebook notebook = notebookRepository.getNotebook(notebookId);
            HugeClient hugeClient = HugeClient.open(
                    notebook.getConnection().getConnectionUri(),
                    notebook.getConnection().getGraphName());
            GremlinManager gremlinManager = hugeClient.gremlin();
            ResultSet resultSet =
                    gremlinManager.gremlin(cell.getCode()).execute();
            result.setData(resultSet.data());

            List<Vertex> vertices = new ArrayList<>();
            List<Edge> edges = new ArrayList<>();

            Iterator<Result> results = resultSet.iterator();
            Object object = results.next().getObject();

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
        if (edges == null) {
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
                    // the source vertex of edge from results is in the set of vertexIds,
                    // so just reserve the edge that it's target in the set of vertexIds .
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
                                           List<com.baidu.hugegraph.structure.graph.Path> paths) {
        if (paths == null) {
            return null;
        }
        Set<String> vertexIds = new HashSet<>();
        paths.stream().forEach(path -> path.objects().forEach(obj -> {
            if (obj instanceof Vertex) {
                vertexIds.add(obj.id());
            }
        }));
        return getVertices(hugeClient,
                vertexIds.stream().collect(Collectors.toList()));

    }

}
