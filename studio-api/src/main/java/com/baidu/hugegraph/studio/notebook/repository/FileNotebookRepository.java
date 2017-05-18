package com.baidu.hugegraph.studio.notebook.repository;

import com.baidu.hugegraph.studio.conf.StudioConfiguration;
import com.baidu.hugegraph.studio.notebook.model.Notebook;
import com.baidu.hugegraph.studio.notebook.model.NotebookCell;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by jishilei on 2017/5/14.
 */
@Repository("notebookRepository")
public class FileNotebookRepository implements NotebookRepository {

    private String notebooksDataDirectory;

    private StudioConfiguration configuration;

    public FileNotebookRepository() {

        configuration = new StudioConfiguration();
        notebooksDataDirectory = "";
    }

    @Override
    public Notebook createNotebook(Notebook notebook) {
        return null;
    }

    @Override
    public Notebook editNotebook(Notebook notebook) {
        return null;
    }

    @Override
    public List<Notebook> getNotebooks() {
        List<Notebook> notebooks = new ArrayList<>();
        notebooks.add(new Notebook());
        return notebooks;
    }

    @Override
    public void deleteNotebook(String notebookId) {

    }

    @Override
    public Notebook getNotebook(String notebookId) {
        return null;
    }

    @Override
    public NotebookCell addCellToNotebook(String notebookId, NotebookCell cell) {
        return null;
    }

    @Override
    public NotebookCell editNotebookCell(String paramString, NotebookCell cell) {
        return null;
    }

    @Override
    public void deleteNotebookCell(String notebookId, String cellId) {

    }

    @Override
    public NotebookCell getNotebookCell(String notebookId, String cellId) {
        return null;
    }
}
