package com.baidu.hugegraph.studio.notebook.repository;

import com.baidu.hugegraph.studio.notebook.model.Notebook;
import com.baidu.hugegraph.studio.notebook.model.NotebookCell;

import java.util.List;

/**
 * Created by jishilei on 2017/5/14.
 */
public interface NotebookRepository {
    Notebook createNotebook(Notebook notebook);

    Notebook editNotebook(Notebook notebook);

    List<Notebook> getNotebooks();

    void deleteNotebook(String notebookId);

    Notebook getNotebook(String notebookId);

    NotebookCell addCellToNotebook(String notebookId, NotebookCell cell, Integer index);

    NotebookCell editNotebookCell(String notebookId, NotebookCell cell);

    void deleteNotebookCell(String notebookId, String cellId);

    NotebookCell getNotebookCell(String notebookId, String cellId);
}
