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

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

/**
 * A notebook contains many cells.
 * A cell can display a gremlin result or a markdown snippets.
 */
@JsonIgnoreProperties(ignoreUnknown = true)
public class NotebookCell {
    /**
     * Which view tab is show in front page?.
     */
    public enum DataViewType {
        /**
         * Table data view type.
         */
        TABLE, /**
         * Raw data view type.
         */
        RAW, /**
         * Graph data view type.
         */
        GRAPH;
    }

    /**
     * The enum Status.
     */
    public enum Status {
        /**
         * Success status.
         */
        SUCCESS, /**
         * Cancelled status.
         */
        CANCELLED, /**
         * Error status.
         */
        ERROR;
    }

    private String id;
    private NotebookCell.Status status;
    private String code;
    private String language;
    private Result result;
    private String msg;
    private NotebookCell.DataViewType dataViewType;
    private ViewSettings viewSettings;


    /**
     * Instantiates a new Notebook cell.
     *
     * @param id           the id
     * @param status       the status
     * @param code         the code
     * @param language     the language
     * @param result       the result
     * @param msg          the msg
     * @param dataViewType the data view type
     * @param viewSettings the view settings
     */
    @JsonCreator
    public NotebookCell(@JsonProperty("id") String id,
                        @JsonProperty("status") NotebookCell.Status status,
                        @JsonProperty("code") String code,
                        @JsonProperty("language") String language,
                        @JsonProperty("result") Result result,
                        @JsonProperty("msg") String msg,
                        @JsonProperty("dataViewType") NotebookCell.DataViewType dataViewType,
                        @JsonProperty("viewSettings") ViewSettings viewSettings) {
        this.id = id;
        this.status = status;
        this.code = code;
        this.language = (language != null ? language.toLowerCase() : null);
        this.result = result;
        this.msg = msg;
        this.dataViewType = dataViewType;
        this.viewSettings = viewSettings;
    }

    /**
     * Instantiates a new Notebook cell.
     */
    public NotebookCell() {
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
     * NotebookCell's id is uuid
     *
     * @return the id
     */
    public String getId() {
        return this.id;
    }

    /**
     * Current support gremlin or markdown
     *
     * @return the language
     */
    public String getLanguage() {
        return this.language;
    }

    /**
     * The code user input in the front page code editor.
     *
     * @return the code
     */
    public String getCode() {
        return this.code;
    }

    /**
     * Gets status.
     *
     * @return the status
     */
    public NotebookCell.Status getStatus() {
        return this.status;
    }

    /**
     * Gets msg.
     *
     * @return the msg
     */
    public String getMsg() {
        return this.msg;
    }

    /**
     * Gets result.
     *
     * @return the result
     */
    public Result getResult() {
        return this.result;
    }

    /**
     * Gets view settings.
     *
     * @return the view settings
     */
    public ViewSettings getViewSettings() {
        return this.viewSettings;
    }

    /**
     * Gets data view type.
     *
     * @return the data view type
     */
    public NotebookCell.DataViewType getDataViewType() {
        return this.dataViewType;
    }

    /**
     * Sets language.
     *
     * @param language the language
     */
    public void setLanguage(String language) {
        this.language = language;
    }

    /**
     * Sets status.
     *
     * @param status the status
     */
    public void setStatus(Status status) {
        this.status = status;
    }

    /**
     * Sets code.
     *
     * @param code the code
     */
    public void setCode(String code) {
        this.code = code;
    }

    /**
     * Sets result.
     *
     * @param result the result
     */
    public void setResult(Result result) {
        this.result = result;
    }

    /**
     * Sets msg.
     *
     * @param msg the msg
     */
    public void setMsg(String msg) {
        this.msg = msg;
    }

    /**
     * Sets data view type.
     *
     * @param dataViewType the data view type
     */
    public void setDataViewType(DataViewType dataViewType) {
        this.dataViewType = dataViewType;
    }

    /**
     * Sets view settings.
     *
     * @param viewSettings the view settings
     */
    public void setViewSettings(ViewSettings viewSettings) {
        this.viewSettings = viewSettings;
    }

    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if ((o == null) || (getClass() != o.getClass())) {
            return false;
        }
        NotebookCell that = (NotebookCell) o;

        return that.id == null ? true : this.id != null ? this.id.equals(that.id) : false;
    }

    public int hashCode() {
        return this.id != null ? this.id.hashCode() : 0;
    }
}

