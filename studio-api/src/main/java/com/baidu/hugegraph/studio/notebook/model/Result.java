/*
 * Copyright 2017 HugeGraph Authors
 *
 * Licensed to the Apache Software Foundation (ASF) under one or more
 * contributor license agreements. See the NOTICE file distributed with this
 * work for additional information regarding copyright ownership. The ASF
 * licenses this file to You under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations under
 * the License.
 */
package com.baidu.hugegraph.studio.notebook.model;

import com.baidu.hugegraph.structure.graph.Edge;
import com.baidu.hugegraph.structure.graph.Vertex;
import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

import static java.util.stream.Collectors.toMap;

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
            // distinct using map
            this.vertices = vertices.stream()
                    .collect(toMap(Vertex::id, v -> v, (v1, v2) -> v1))
                    .values().stream()
                    .collect(Collectors.toList());
        }

        public List<Edge> getEdges() {
            return edges;
        }

        // distinct using map
        public void setEdges(List<Edge> edges) {
            this.edges = edges.stream()
                    .collect(toMap(Edge::id, e -> e, (e1, e2) -> e1))
                    .values().stream()
                    .collect(Collectors.toList());
        }
    }
}