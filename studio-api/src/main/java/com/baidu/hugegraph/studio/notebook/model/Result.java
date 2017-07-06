package com.baidu.hugegraph.studio.notebook.model;


import com.baidu.hugegraph.structure.graph.Edge;
import com.baidu.hugegraph.structure.graph.Vertex;
import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import org.apache.commons.collections.map.HashedMap;

import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.UUID;

/**
 * The type Result.
 */
@JsonInclude(JsonInclude.Include.NON_NULL)
@JsonIgnoreProperties(ignoreUnknown = true)
public class Result {
    private static final String VERTICES = "vertices";
    private static final String EDGES = "edges";

    @JsonProperty("id")
    private String id;

    @JsonProperty("data")
    private List<Object> data;

    @JsonProperty("type")
    private Result.Type type;

    @JsonProperty("duration")
    private Long duration = null;

    @JsonProperty("graph")
    private Map<String , Object> graph;

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
        this.graph = new HashedMap();
    }

    public Result() {
        this.id = UUID.randomUUID().toString();
        this.graph = new HashedMap();
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

    /**
     * Gets graph. when result type is VERTEX / EDGE / PATH ，
     * web page can draw network graphic with javascript.
     * To return vertices and edges list to meet the needs of network graphic drawing
     * <p>
     * graph.add('vertices',List<Vertex>)
     * graph.add('edges',List<Edge>)
     *
     * @return the graph
     */
    public Map<String, Object> getGraph() {
        return graph;
    }

    public void setGraphVertices(List<Vertex> vertices) {

        this.graph.put(VERTICES , vertices);
    }

    public void setGraphEdges(List<Edge> edges) {

        this.graph.put(EDGES , edges);
    }

    // g.V() -> VERTEX
    // g.E() -> EDGE
    // g.V().count() -> NUMBER
    // g.V().outE().path() -> PATH
    public enum Type {
        VERTEX, EDGE, PATH, EMPTY, NUMBER;
    }
}