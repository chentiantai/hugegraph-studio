package com.baidu.hugegraph.studio.notebook.model;

/**
 * Created by jishilei on 2017/5/13.
 */
public class NotebookCell {
    public enum DataViewType {
        TABLE, GRAPH;
    }

    private String id;

    private String code;
    private DataViewType dataViewType;
    private String errorDetails;
    private String gremlinExecutionEngine;
    private String language;
    private String msg;
    private Result result;
    private String status;
    private ViewSettings viewSettings;
}

