package com.baidu.hugegraph.studio.notebook.service;

import com.baidu.hugegraph.studio.notebook.CellExecutionManager;
import com.baidu.hugegraph.studio.notebook.model.Notebook;
import com.baidu.hugegraph.studio.notebook.repository.NotebookRepository;
import com.google.common.eventbus.EventBus;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import java.util.List;

/**
 * Created by jishilei on 2017/5/13.
 */
@Path("/notebooks")
public class NoteBookService {
    private static final Logger logger = LoggerFactory.getLogger(NoteBookService.class);
    private EventBus eventBus;
    private CellExecutionManager executionManager;

    @Autowired
    private NotebookRepository notebookRepository;

    public NoteBookService() {
        eventBus = new EventBus();
        executionManager = new CellExecutionManager();
    }

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public List<Notebook> getNotebooks(){
        logger.info("getNotebooks -- >");
        return notebookRepository.getNotebooks();
    }




}
