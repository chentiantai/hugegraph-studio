package com.baidu.hugegraph.studio.connections.model;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.List;

/**
 * Created by jishilei on 2017/5/18.
 */
@JsonInclude(JsonInclude.Include.NON_NULL)
public class Connection {

    @JsonProperty("id")
    private String id;

    @JsonProperty("name")
    private int name;

    @JsonProperty("port")
    private int port;

    @JsonProperty("graphName")
    private String graphName;

    @JsonProperty("connectionHosts")
    private List<String> connectionHosts;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public int getName() {
        return name;
    }

    public void setName(int name) {
        this.name = name;
    }

    public int getPort() {
        return port;
    }

    public void setPort(int port) {
        this.port = port;
    }

    public String getGraphName() {
        return graphName;
    }

    public void setGraphName(String graphName) {
        this.graphName = graphName;
    }

    public List<String> getConnectionHosts() {
        return connectionHosts;
    }

    public void setConnectionHosts(List<String> connectionHosts) {
        this.connectionHosts = connectionHosts;
    }
}
