package com.baidu.hugegraph.studio.notebook.service;

import com.baidu.hugegraph.studio.notebook.CellExecutionManager;
import com.baidu.hugegraph.studio.notebook.model.Notebook;
import com.baidu.hugegraph.studio.notebook.model.NotebookCell;
import com.baidu.hugegraph.studio.notebook.repository.NotebookRepository;
import com.google.common.base.Preconditions;
import com.google.common.eventbus.EventBus;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

/**
 * Created by jishilei on 2017/5/13.
 */
@Path("notebooks")
public class NoteBookService {
    private static final Logger logger = LoggerFactory.getLogger(NoteBookService.class);

    @Autowired
    private NotebookRepository notebookRepository;

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response getNotebooks() {
        Response response = Response.status(200)
                .entity(notebookRepository.getNotebooks())
                .build();
        return response;
    }

    @GET
    @Path("{notebookId}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getNotebook(@PathParam("notebookId") String notebookId) {
        Response response = Response.status(200)
                .entity(notebookRepository.getNotebook(notebookId))
                .build();
        return response;
    }

    @POST
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public Response addNotebook(Notebook notebook) {
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

        notebookRepository.editNotebook(notebook);

        Response response = Response.status(200)
                .entity(notebook)
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

}
