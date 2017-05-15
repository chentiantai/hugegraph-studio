package com.baidu.hugegraph.studio.common.errors;


public class GraphNotFound
        extends StudioError {
    public GraphNotFound(String graphName) {
        super(502, ErrorCodes.GraphNotFound(), String.format("Graph '%s' does not exist.", new Object[]{graphName}));
    }
}

