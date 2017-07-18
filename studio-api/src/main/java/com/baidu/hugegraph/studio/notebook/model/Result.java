package com.baidu.hugegraph.studio.notebook.model;

import com.baidu.hugegraph.structure.graph.Edge;
import com.baidu.hugegraph.structure.graph.Vertex;
import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.List;
import java.util.UUID;

/**
 * The type Result.
 */
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

    @JsonProperty("graph")
    private Graph graph;

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
        this.graph = new Graph();
    }

    public Result() {
        this.id = UUID.randomUUID().toString();
        this.graph = new Graph();
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
     *
     * @return the graph
     */
    public Graph getGraph() {
        return graph;
    }

    public void setGraphVertices(List<Vertex> vertices) {

        this.graph.setVertices(vertices);
    }

    public void setGraphEdges(List<Edge> edges) {

        this.graph.setEdges(edges);
    }

    // g.V() -> VERTEX
    // g.E() -> EDGE
    // g.V().count() -> NUMBER
    // g.V().outE().path() -> PATH
    public enum Type {
        VERTEX, EDGE, PATH, EMPTY, NUMBER;
    }


    // The Graph class is used for contain Vertices & edges
    @JsonIgnoreProperties(ignoreUnknown = true)
    public class Graph {

        @JsonProperty
        private List<Vertex> vertices;

        @JsonProperty
        private List<Edge> edges;

        public List<Vertex> getVertices() {
            return vertices;
        }

        public void setVertices(List<Vertex> vertices) {
            this.vertices = vertices;
        }

        public List<Edge> getEdges() {
            return edges;
        }

        public void setEdges(List<Edge> edges) {
            this.edges = edges;
        }
    }
}