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

import com.baidu.hugegraph.studio.connections.model.Connection;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;

/**
 * Notebook entity for jersey restful api, and will be return as json.
 * A notebook contains many cells.
 */
@JsonIgnoreProperties(ignoreUnknown = true)
public class Notebook {
    @JsonProperty("id")
    private String id;

    @JsonProperty("connectionId")
    private String connectionId;

    @JsonProperty("name")
    private String name;

    @JsonProperty("created")
    private Long created;

    @JsonProperty("lastUsed")
    private Long lastUsed;

    @JsonProperty("favorite")
    private boolean favorite;

    private Connection connection;

    private List<NotebookCell> cells;

    /**
     * Instantiates a new Notebook.
     */
    public Notebook() {
    }

    /**
     * Is favorite boolean.
     *
     * @return the boolean
     */
    public boolean isFavorite() {
        return favorite;
    }


    /**
     * Sets connection id.
     *
     * @param connectionId the connection id
     */
    public void setConnectionId(String connectionId) {
        this.connectionId = connectionId;
    }

    /**
     * Sets name.
     *
     * @param name the name
     */
    public void setName(String name) {
        this.name = name;
    }

    /**
     * Gets id.
     * NotebookId is uuid
     *
     * @return the id
     */
    public String getId() {
        return id;
    }

    /**
     * Gets connection id.
     *
     * @return the connection id
     */
    public String getConnectionId() {
        return connectionId;
    }

    /**
     * Gets name.
     *
     * @return the name
     */
    public String getName() {
        return name;
    }

    /**
     * Gets created.
     *
     * @return the created
     */
    public Long getCreated() {
        return created;
    }

    /**
     * Gets last used.
     *
     * @return the last used
     */
    public Long getLastUsed() {
        return lastUsed;
    }

    /**
     * Gets cells.
     *
     * @return the cells
     */
    public List<NotebookCell> getCells() {
        return cells;
    }

    /**
     * Gets cell by cellId from notebook
     * @param cellId the cellId
     * @return the non-null value
     * @throws NoSuchElementException if there is no value present
     */
    public NotebookCell getCellById(String cellId) {
        return this.cells
                   .stream().filter(c -> c.getId().equals(cellId))
                   .findFirst()
                   .get();
    }

    /**
     * Sets id.
     *
     * @param id the id
     */
    public void setId(String id) {
        this.id = id;
    }


    /**
     * Sets created.
     *
     * @param created the created
     */
    public void setCreated(Long created) {
        this.created = created;
    }

    /**
     * Sets last used.
     *
     * @param lastUsed the last used
     */
    public void setLastUsed(Long lastUsed) {
        this.lastUsed = lastUsed;
    }

    /**
     * Sets favorite.
     *
     * @param favorite the favorite
     */
    public void setFavorite(boolean favorite) {
        this.favorite = favorite;
    }

    /**
     * Sets cells.
     *
     * @param cells the cells
     */
    public void setCells(List<NotebookCell> cells) {
        this.cells = cells;
    }

    /**
     * Add cell.
     *
     * @param cell  the cell
     * @param index the index
     */
    public void addCell(NotebookCell cell, Integer index) {
        if (this.cells == null) {
            this.cells = new ArrayList<>();
        }
        this.cells.removeIf(c -> c.getId().equals(cell.getId()));
        if (index != null) {
            this.cells.add(index.intValue(), cell);
        }else {
            this.cells.add(cell);
        }
    }

    /**
     * Add cell.
     *
     * @param cell the cell
     */
    public void addCell(NotebookCell cell) {
        if (this.cells == null) {
            this.cells = new ArrayList<>();
        }
        int index = 0;
        for (int i = 0; i < this.cells.size(); i++) {
            if (this.cells.get(i).getId().equals(cell.getId())) {
                index = i;
                break;
            }
        }
        this.cells.removeIf(c -> c.getId().equals(cell.getId()));
        this.cells.add(index, cell);
    }

    /**
     * Remove cell.
     *
     * @param cellId the cell id
     */
    public void removeCell(String cellId) {
        this.cells.removeIf(c -> c.getId().equals(cellId));
    }

    /**
     * Gets connection.
     *
     * @return the connection
     */
    public Connection getConnection() {
        return connection;
    }

    /**
     * Sets connection.
     *
     * @param connection the connection
     */
    public void setConnection(Connection connection) {
        this.connection = connection;
    }
}
