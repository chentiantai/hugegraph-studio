package com.baidu.hugegraph.studio.notebook.model;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.time.Instant;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

/**
 * Created by jishilei on 2017/5/13.
 */
public class Notebook {
    @JsonProperty("id")
    private String id;

    @JsonProperty("connectionId")
    private String connectionId;

    @JsonProperty("name")
    private String name;

    @JsonProperty("created")
    private Instant created;

    @JsonProperty("lastUsed")
    private Instant lastUsed;

    @JsonProperty("favorite")
    private boolean favorite;

    private List<NotebookCell> cells;

    public Notebook() {
        cells = new ArrayList<>();
        created = Instant.now();
        lastUsed = Instant.now();
        favorite = false;
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

    public Instant getCreated() {
        return created;
    }

    public Instant getLastUsed() {
        return lastUsed;
    }

    public boolean isFavorite() {
        return favorite;
    }

    public List<NotebookCell> getCells() {
        return cells;
    }
}
