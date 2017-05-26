package com.baidu.hugegraph.studio.connections.model;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.google.common.base.Preconditions;

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

    @JsonProperty("connectionHost")
    private String connectionHost;

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

    public String getConnectionHost() {
        return connectionHost;
    }

    public void setConnectionHost(String connectionHost) {
        this.connectionHost = connectionHost;
    }

    /**
     * Gets connection uri.
     *
     * @return the connection uri ,  http://{connectionHost}:{port}
     */
    public String getConnectionUri() {
        Preconditions.checkNotNull(connectionHost);
        return String.format("http://%s:%d", connectionHost, port);
    }
}
