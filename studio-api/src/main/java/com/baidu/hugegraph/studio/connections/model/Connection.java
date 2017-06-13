package com.baidu.hugegraph.studio.connections.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.google.common.base.Preconditions;

/**
 * Created by jishilei on 2017/5/18.
 */
@JsonInclude(JsonInclude.Include.NON_NULL)
public class Connection implements Comparable<Connection> {

    @JsonProperty("id")
    private String id;

    @JsonProperty("name")
    private String name;

    @JsonProperty("port")
    private int port;

    @JsonProperty("graphName")
    private String graphName;

    @JsonProperty("connectionHost")
    private String connectionHost;

    @JsonProperty("lastModified")
    private Long lastModified;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
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

    public Long getLastModified() {
        return lastModified;
    }

    public void setLastModified(Long lastModified) {
        this.lastModified = lastModified;
    }

    /**
     * Gets connection uri.
     *
     * @return the connection uri ,  http://{connectionHost}:{port}
     */
    @JsonIgnore
    public String getConnectionUri() {
        Preconditions.checkNotNull(connectionHost);
        return String.format("http://%s:%d", connectionHost, port);
    }

    @Override
    public int compareTo(Connection connection) {
        if (this.lastModified > connection.lastModified) {
            return 1;
        } else if (this.lastModified < connection.lastModified) {
            return -1;
        } else {
            return 0;
        }
    }
}
