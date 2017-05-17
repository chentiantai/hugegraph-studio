package com.baidu.hugegraph.studio.execution;

import com.baidu.hugegraph.studio.common.errors.InternalExceptionMapper;
import com.baidu.hugegraph.studio.common.errors.StudioError;
import com.baidu.hugegraph.studio.execution.gremlin.GremlinExecutor;
import com.baidu.hugegraph.studio.execution.markdown.MarkdownExecutor;
import com.baidu.hugegraph.studio.notebook.CellExecutionManager;
import com.baidu.hugegraph.studio.notebook.model.NotebookCell;
import com.baidu.hugegraph.studio.notebook.model.Result;
import org.apache.commons.lang3.tuple.Pair;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Async;
import org.springframework.scheduling.annotation.AsyncResult;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.stereotype.Component;

import javax.ws.rs.core.Response;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.Future;

@Component
@EnableAsync
public class Executor {
    private static final Logger logger = LoggerFactory.getLogger(Executor.class);
    final InternalExceptionMapper exceptionMapper = new InternalExceptionMapper();
    final List<String> supportedLanguages = Arrays.asList("gremlin", "markdown");

    @Autowired
    private GremlinExecutor gremlinExecutor;

    @Autowired
    private MarkdownExecutor markdownExecutor;

    @Async
    public Future<Void> executeCell(String notebookId, NotebookCell cell, CellExecutionManager notebookManager) {
        logger.debug(String.format("Executing cell %s ", new Object[]{cell.getId()}));
        try {
            Result result;
            switch (cell.getLanguage()) {
                case "gremlin":
                    result = this.gremlinExecutor.execute(notebookId, cell.getCode(), cell.getGremlinExecutionEngine());
                    break;
                case "markdown":
                    result = this.markdownExecutor.execute(cell.getCode());
                    break;
                default:
                    throw StudioError.invalidRequest(
                            String.format("Attempt to execute code for an unrecognized language: '%s'."
                                    , new Object[]{cell.getLanguage()})
                    );
            }
            logger.debug(String.format("Execution completed for cell %s.", new Object[]{cell.getId()}));

            notebookManager.setNotebookCellResult(notebookId, cell.getId(), result,
                    NotebookCell.Status.SUCCESS, Optional.empty(), null);
        } catch (InterruptedException e) {
            logger.debug(String.format("Execution interrupted/cancelled for cell %s.",
                    new Object[]{cell.getId()}));
            notebookManager.setNotebookCellResult(notebookId, cell.getId(), null,
                    NotebookCell.Status.CANCELLED, Optional.empty(), null);
        } catch (Exception e) {
            logger.error(String.format("Exception while executing cell %s.",
                    new Object[]{cell.getId()}), e);
            StudioError studioError = null;
            Object temp = e;
            while (temp != null) {
                if ((temp instanceof StudioError)) {
                    studioError = (StudioError) temp;
                    break;
                }
                temp = ((Throwable) temp).getCause();
            }
            if (studioError == null) {
                Pair<Response.Status, StudioError> errorDetailsPair = this.exceptionMapper.toErrorDetails(e);
                if ((errorDetailsPair == null) || (errorDetailsPair.getRight() == null)) {
                    studioError = new StudioError(0, 0,
                            e.getMessage() != null ? e.getMessage() : "Unknown error cause, see the Studio logs");
                } else {
                    studioError = errorDetailsPair.getRight();
                }
            }
            notebookManager.setNotebookCellResult(notebookId, cell.getId(), null,
                    NotebookCell.Status.ERROR, Optional.of(studioError), e);
        }
        return new AsyncResult(null);
    }

    public List<String> supportedLanguages() {
        return this.supportedLanguages;
    }

}
