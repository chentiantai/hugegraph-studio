package com.baidu.hugegraph.studio.notebook.model;


import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.UUID;

@JsonInclude(JsonInclude.Include.NON_NULL)
@JsonIgnoreProperties(ignoreUnknown = true)
public class Result {
    @JsonProperty("id")
    private String id;

    @JsonProperty("data")
    private List<Object> data;

    @JsonProperty("type")
    private Result.Type type;

    @JsonProperty("duration")
    private Long duration = null;

    @JsonCreator
    public Result(
            @JsonProperty("data") List<Object> data,
            @JsonProperty("type") Result.Type type,
            @JsonProperty("duration") Long duration,
            @JsonProperty("id") String id) {
        this.data = data;
        this.type = type;
        this.duration = duration;
        this.id = id;
    }

    public Result() {
        this.id = UUID.randomUUID().toString();
    }

    public String getId() {
        return this.id;
    }

    public Result.Type getType() {
        return this.type;
    }

    public Long getDuration() {
        return this.duration;
    }

    public List<Object> getData() {
        return data;
    }

    public void setData(List<Object> data) {
        this.data = data;
    }

    public void setType(Type type) {
        this.type = type;
    }

    public void setDuration(Long duration) {
        this.duration = duration;
    }


    // g.V() -> VERTEX
    // g.E() -> EDGE
    // g.V().count() -> NUMBER
    // g.V().outE().path() -> PATH
    public enum Type {
        VERTEX, EDGE, PATH, EMPTY, NUMBER;
    }
}