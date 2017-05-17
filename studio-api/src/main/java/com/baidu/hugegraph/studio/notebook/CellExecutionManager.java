package com.baidu.hugegraph.studio.notebook;

import com.baidu.hugegraph.studio.common.errors.StudioError;
import com.baidu.hugegraph.studio.notebook.model.NotebookCell;
import com.baidu.hugegraph.studio.notebook.model.Result;

import java.util.Optional;

/**
 * Created by jishilei on 2017/5/13.
 */
public class CellExecutionManager {
    public void setNotebookCellResult(String notebookId, String cellId, Result result, NotebookCell.Status status, Optional<StudioError> error, Throwable ex) {

    }
}
