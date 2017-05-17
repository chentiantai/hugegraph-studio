package com.baidu.hugegraph.studio.application.events;


import com.baidu.hugegraph.studio.application.Event;
import com.fasterxml.jackson.annotation.JsonProperty;

public final class RequestError implements Event {
    @JsonProperty("requestId")
    public final String requestId;
    @JsonProperty("error")
    public final Throwable reason;

    public RequestError(@JsonProperty("requestId") String requestId, @JsonProperty("error") Throwable reason) {
        this.requestId = requestId;
        this.reason = reason;
    }

    public String toString() {
        return String.format("RequestError(requestId=%s, error=%s)", new Object[]{this.requestId, this.reason});
    }
}

