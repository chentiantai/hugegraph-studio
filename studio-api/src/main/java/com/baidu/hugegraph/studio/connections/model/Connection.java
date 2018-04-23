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

package com.baidu.hugegraph.studio.connections.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.google.common.base.Preconditions;

/**
 * The Connection contain the information about HugeGraph Server.
 * Huge Server host address, port and graph name is required.
 */
@JsonInclude(JsonInclude.Include.NON_NULL)
public class Connection implements Comparable<Connection> {

    @JsonProperty("id")
    private String id;

    @JsonProperty("name")
    private String name;

    @JsonProperty("port")
    private int port;

    @JsonProperty("graph")
    private String graph;

    @JsonProperty("host")
    private String host;

    @JsonProperty("lastModified")
    private Long lastModified;

    /**
     * Gets id from uuid.
     *
     * @return the id.
     */
    public String getId() {
        return id;
    }

    /**
     * Sets id.
     *
     * @param id the id.
     */
    public void setId(String id) {
        this.id = id;
    }

    /**
     * Gets name.
     *
     * @return the name.
     */
    public String getName() {
        return name;
    }

    /**
     * Sets name.
     *
     * @param name the name.
     */
    public void setName(String name) {
        this.name = name;
    }

    /**
     * Gets port.
     *
     * @return the port.
     */
    public int getPort() {
        return port;
    }

    /**
     * Sets port.
     *
     * @param port the port.
     */
    public void setPort(int port) {
        this.port = port;
    }

    /**
     * Gets graph name.
     *
     * @return the graph name.
     */
    public String getGraph() {
        return graph;
    }

    /**
     * Sets graph name.
     *
     * @param graph the graph name.
     */
    public void setGraph(String graph) {
        this.graph = graph;
    }

    /**
     * Gets connection host.
     *
     * @return the connection host.
     */
    public String getConnectionHost() {
        return host;
    }

    /**
     * Sets connection host.
     *
     * @param host the connection host.
     */
    public void setConnectionHost(String host) {
        this.host = host;
    }

    /**
     * Gets last modified.
     *
     * @return the last modified.
     */
    public Long getLastModified() {
        return lastModified;
    }

    /**
     * Sets last modified.
     *
     * @param lastModified the last modified.
     */
    public void setLastModified(Long lastModified) {
        this.lastModified = lastModified;
    }

    /**
     * Gets connection uri.
     *
     * @return the connection uri, http://{host}:{port}
     */
    @JsonIgnore
    public String getConnectionUri() {
        Preconditions.checkNotNull(host);
        return String.format("http://%s:%d", host, port);
    }

    /**
     * Used for array sorting.
     *
     * @param connection
     * @return
     */
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
