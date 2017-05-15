package com.baidu.hugegraph.studio.common.errors;


import com.fasterxml.jackson.annotation.JsonProperty;

public class StudioError extends RuntimeException {
    public final int status;
    public final int code;

    public StudioError(@JsonProperty("status") int status, @JsonProperty("code") int code, @JsonProperty("message") String message) {
        super(message);
        this.status = status;
        this.code = code;
    }

    public static StudioError invalidRequest(String message) {
        return new StudioError(400, 0, message);
    }

    public static StudioError notFound(String resourceName, String id) {
        return new StudioError(404, 0, String.format("%s \"%s\" does not exist.", new Object[]{resourceName, id}));
    }

    public static StudioError notFound(String id) {
        return new StudioError(404, 0, String.format("%s does not exist.", new Object[]{id}));
    }

    public static StudioError conflict(String resourceName, String id) {
        return new StudioError(409, 0, String.format("Resource with name %s already exists and is associated with id  \"%s\".", new Object[]{resourceName, id}));
    }

    public static StudioError badGateway(String message) {
        return new StudioError(502, 0, message);
    }

    public static StudioError gatewayTimeout(String message) {
        return new StudioError(504, 0, message);
    }

    public static StudioError serverError(String message) {
        return new StudioError(500, 0, message);
    }

    public int status() {
        return this.status;
    }

    public int code() {
        return this.code;
    }
}