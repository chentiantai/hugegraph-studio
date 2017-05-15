package com.baidu.hugegraph.studio.common.errors;


public enum ErrorCodes {
    GRAPH_NOT_FOUND(100401), INVALID_CONNECTION(100402), SCRIPT_EVALUATION_ERROR(10403), SERVER_SERIALIZATION_ERROR(10404);

    private final int errorCode;

    private ErrorCodes(int errorCode) {
        this.errorCode = errorCode;
    }

    public static int GraphNotFound() {
        return GRAPH_NOT_FOUND.errorCode;
    }

    public static int InvalidConnection() {
        return INVALID_CONNECTION.errorCode;
    }

    public static int ScriptEvaluationError() {
        return SCRIPT_EVALUATION_ERROR.errorCode;
    }

    public static int ServerSerializationError() {
        return SERVER_SERIALIZATION_ERROR.errorCode;
    }

    public int errorCode() {
        return this.errorCode;
    }
}
