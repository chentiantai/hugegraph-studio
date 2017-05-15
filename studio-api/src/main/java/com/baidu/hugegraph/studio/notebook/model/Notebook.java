package com.baidu.hugegraph.studio.notebook.model;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.Date;

/**
 * Created by jishilei on 2017/5/13.
 */
public class Notebook {
    @JsonProperty("id")
    private String id;
//    private String connectionId;
//    private String name;
//    private Date created;
//    private Date lastUsed;
//    private boolean favorite;

    public Notebook() {
        this.id = "id";
    }
}
