package com.baidu.hugegraph.studio.common.service;

import com.fasterxml.jackson.annotation.JsonProperty;

public class ErrorMessage {
    @JsonProperty("code")
    public final int code;
    @JsonProperty("message")
    public final String message;

    public ErrorMessage(int code, String message) {
        this.code = code;
        this.message = message;
    }
}
