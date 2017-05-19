package com.baidu.hugegraph.studio.notebook.model;


import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.Map;
import java.util.Set;
import java.util.UUID;

@JsonInclude(JsonInclude.Include.NON_NULL)
@JsonIgnoreProperties(ignoreUnknown = true)
public class Result {
    // g.V().count() -> type=Number , value = Array(i,n) : i is index, n is count number
    // g.V() -> type=vertex , value = Array<Vertex>
    // g.E() -> type=edge , value = Array<Edge>
    @JsonProperty("value")
    private final Object value;
    @JsonProperty("type")
    private final Result.Type type;
    @JsonProperty("truncated")
    private final boolean truncated;
    @JsonProperty("duration")
    private Long duration = null;

    // graph.put("edges",new HashSet<Edge>);
    // graph.put("vertices",new HashSet<Vertex>);
    @JsonProperty("graph")
    private Map<String, Set> graph;
    @JsonProperty("id")
    private String id;

    @JsonCreator
    public Result(
            @JsonProperty("value") Object value,
            @JsonProperty("type") Result.Type type,
            @JsonProperty("truncated") boolean truncated,
            @JsonProperty("duration") Long duration,
            @JsonProperty("graph") Map<String, Set> graph,
            @JsonProperty("id") String id) {
        this.graph = graph;
        this.value = value;
        this.type = type;
        this.truncated = truncated;
        this.duration = duration;
        this.id = id;
    }

    public Result(Object value, Result.Type type, boolean truncated) {
        this.value = value;
        this.type = type;
        this.truncated = truncated;
        this.id = UUID.randomUUID().toString();
    }

    public Result setGraph(Map<String, Set> graph) {
        this.graph = graph;
        return this;
    }

    public Result setDuration(long duration) {
        this.duration = Long.valueOf(duration);
        return this;
    }

    public String getId() {
        return this.id;
    }

    public Object getValue() {
        return this.value;
    }

    public Result.Type getType() {
        return this.type;
    }

    public boolean isTruncated() {
        return this.truncated;
    }

    public Map<String, Set> getGraph() {
        return this.graph;
    }

    public Long getDuration() {
        return this.duration;
    }

    // markdown -> HTML
    // g.V() -> VERTEX
    // g.E() -> EDGE
    // g.V().count() -> NUMBER
    public enum Type {
        HTML, VERTEX, EDGE, EMPTY, NUMBER;
    }
}