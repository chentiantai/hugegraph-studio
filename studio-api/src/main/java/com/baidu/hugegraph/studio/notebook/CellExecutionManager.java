package com.baidu.hugegraph.studio.notebook;

import com.baidu.hugegraph.studio.common.errors.StudioError;
import com.baidu.hugegraph.studio.execution.Executor;
import com.baidu.hugegraph.studio.notebook.model.NotebookCell;
import com.baidu.hugegraph.studio.notebook.model.Result;
import com.baidu.hugegraph.studio.notebook.repository.NotebookRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.Optional;

/**
 * Created by jishilei on 2017/5/13.
 * Modified by wangjiankui on 2017/6/23
 */
public class CellExecutionManager {
    private static final Logger logger = LoggerFactory.getLogger(CellExecutionManager.class);
    private Executor executor;

    @Autowired
    private NotebookRepository notebookRepository;

    public void setNotebookCellResult(String notebookId, String cellId, Result result,
                                      NotebookCell.Status status, Optional<StudioError> error, Throwable ex) {

    }
}
