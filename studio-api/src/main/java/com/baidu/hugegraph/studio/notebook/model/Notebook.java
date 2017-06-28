package com.baidu.hugegraph.studio.notebook.model;

import com.baidu.hugegraph.studio.connections.model.Connection;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.time.Instant;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

/**
 * Created by jishilei on 2017/5/13.
 */
@JsonInclude(JsonInclude.Include.NON_NULL)
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

    public Notebook() {
    }

    public boolean isFavorite() {
        return favorite;
    }



    public void setConnectionId(String connectionId) {
        this.connectionId = connectionId;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getId() {
        return id;
    }

    public String getConnectionId() {
        return connectionId;
    }

    public String getName() {
        return name;
    }

    public Long getCreated() {
        return created;
    }

    public Long getLastUsed() {
        return lastUsed;
    }

    public List<NotebookCell> getCells() {
        return cells;
    }

    public void setId(String id) {
        this.id = id;
    }


    public void setCreated(Long created) {
        this.created = created;
    }

    public void setLastUsed(Long lastUsed) {
        this.lastUsed = lastUsed;
    }

    public void setFavorite(boolean favorite) {
        this.favorite = favorite;
    }

    public void setCells(List<NotebookCell> cells) {
        this.cells = cells;
    }

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

    public void removeCell(String cellId) {
        this.cells.removeIf(c -> c.getId().equals(cellId));
    }

    public Connection getConnection() {
        return connection;
    }

    public void setConnection(Connection connection) {
        this.connection = connection;
    }
}
