package com.baidu.hugegraph.studio.notebook.service;

import com.baidu.hugegraph.driver.GremlinManager;
import com.baidu.hugegraph.driver.HugeClient;
import com.baidu.hugegraph.structure.GraphElement;
import com.baidu.hugegraph.structure.graph.*;
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

import javax.ws.rs.*;
import javax.ws.rs.Path;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

/**
 * Created by jishilei on 2017/5/13.
 */
@Path("notebooks")
public class NoteBookService {
    private static final Logger logger = LoggerFactory.getLogger(NoteBookService.class);

    @Autowired
    private NotebookRepository notebookRepository;
    @Autowired
    private ConnectionRepository connectionRepository;

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response getNotebooks() {
        List<Notebook> notebookList = notebookRepository.getNotebooks();
        notebookList.forEach( notebook -> {
            Connection connection = connectionRepository.get(notebook.getConnectionId());
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
        Connection connection = connectionRepository.get(notebook.getConnectionId());
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
        Preconditions.checkArgument(StringUtils.isNotEmpty(notebook.getConnectionId()));
        Connection connection = connectionRepository.get(notebook.getConnectionId());
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
        Preconditions.checkArgument(notebookId != null && notebookId.equals(notebook.getId()));
        notebook = notebookRepository.editNotebook(notebook);
        Connection connection = connectionRepository.get(notebook.getConnectionId());
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
                .entity(notebookRepository.addCellToNotebook(notebookId, cell, position))
                .build();
        return response;
    }

    @DELETE
    @Path("{notebookId}/cells/{cellId}")
    public Response deleteNotebookCell(@PathParam("notebookId") String notebookId,
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
        Preconditions.checkArgument(cell != null && cellId.equals(cell.getId()));
        Response response = Response.status(200)
                .entity(notebookRepository.editNotebookCell(notebookId, cell))
                .build();
        return response;
    }

    @GET
    @Path("{notebookId}/cells/{cellId}/execute")
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public Response executeNotebookCell(@PathParam("notebookId") String notebookId,
                                     @PathParam("cellId") String cellId) {
        Preconditions.checkArgument( notebookId != null && cellId != null);
        NotebookCell cell = notebookRepository.getNotebookCell(notebookId, cellId);
        Preconditions.checkArgument(cellId.equals(cell.getId()));

        Notebook notebook = notebookRepository.getNotebook(notebookId);
        HugeClient hugeClient = HugeClient.open(
                notebook.getConnection().getConnectionUri(),
                notebook.getConnection().getGraphName());
        GremlinManager gremlinManager = hugeClient.gremlin();

        Long startTime = System.currentTimeMillis();

        System.out.println(cell.getCode());

        ResultSet resultSet = gremlinManager.gremlin(cell.getCode()).execute();
        Long endTime = System.currentTimeMillis();
        Long duration = endTime - startTime;

        com.baidu.hugegraph.studio.notebook.model.Result result = new com.baidu.hugegraph.studio.notebook.model.Result();
        result.setDuration(duration);
        result.setData(resultSet.data());


        Iterator<Result> results = resultSet.iterator();
        Object object = results.next().getObject();

        if (object instanceof Vertex) {
            result.setType(com.baidu.hugegraph.studio.notebook.model.Result.Type.VERTEX);
        } else if (object instanceof Edge) {
            result.setType(com.baidu.hugegraph.studio.notebook.model.Result.Type.EDGE);
        } else if (object instanceof com.baidu.hugegraph.structure.graph.Path) {
            result.setType(com.baidu.hugegraph.studio.notebook.model.Result.Type.PATH);
        } else if(object instanceof Integer){
            result.setType(com.baidu.hugegraph.studio.notebook.model.Result.Type.NUMBER);
        }else {
            result.setType(com.baidu.hugegraph.studio.notebook.model.Result.Type.EMPTY);
        }

        Response response = Response.status(200)
                .entity(result)
                .build();
        return response;
    }

    @POST
    @Path("{notebookId}/cells/{cellId}/save")
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public Response saveNotebookCell(@PathParam("notebookId") String notebookId,
                                        @PathParam("cellId") String cellId,
                                        NotebookCell cell) {
        /**
         * need to do
         */
        Response response = Response.status(200)
                .entity(notebookRepository.editNotebookCell(notebookId, cell))
                .build();
        return response;
    }

}
