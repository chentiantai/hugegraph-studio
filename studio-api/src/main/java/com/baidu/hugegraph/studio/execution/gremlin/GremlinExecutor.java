package com.baidu.hugegraph.studio.execution.gremlin;

import com.baidu.hugegraph.studio.notebook.model.NotebookCell;
import com.baidu.hugegraph.studio.notebook.model.Result;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

@Component
public class GremlinExecutor {
    private static final Logger logger = LoggerFactory.getLogger(GremlinExecutor.class);
    private static final int RESULT_SIZE_LIMIT = 1000;

    public Result execute(String notebookId,
                          String code)
//                          NotebookCell.GremlinExecutionEngine executionEngine)
            throws Exception {
        return null;
    }
}
