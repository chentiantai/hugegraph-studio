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

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

/**
 * ViewSettings is used to save the front page widget's status.
 * The status such as :
 *   1. which is the current tab ?
 *   2. what is the height of current input ?
 *   3. what is the status of every button ?
 */
@JsonIgnoreProperties(ignoreUnknown = true)
public final class ViewSettings {

    /**
     * The enum View type.
     */
    public enum ViewType {
        /**
         * Table view type.
         */
        TABLE,
        /**
         * Raw view type.
         */
        RAW,
        /**
         * Graph view type.
         */
        GRAPH;
    }

    /**
     * The View type.
     */
    @JsonProperty("viewType")
    public ViewSettings.ViewType viewType;

    /**
     * The Cell height.
     */
    @JsonProperty("cellHeight")
    public Integer cellHeight;

    /**
     * The Cell width.
     */
    @JsonProperty("cellWidth")
    public Integer cellWidth;

    /**
     * The Full screen.
     */
    @JsonProperty("fullScreen")
    public boolean fullScreen;

    /**
     * The View.
     */
    @JsonProperty("view")
    public boolean view;

    /**
     * The type Validation settings.
     */
    public class ValidationSettings {
        @JsonProperty("enabled")
        private boolean enabled;
    }

    /**
     * Gets view type.
     *
     * @return the view type
     */
    public ViewType getViewType() {
        return viewType;
    }

    /**
     * Sets view type.
     *
     * @param viewType the view type
     */
    public void setViewType(ViewType viewType) {
        this.viewType = viewType;
    }

    /**
     * Gets cell height.
     *
     * @return the cell height
     */
    public Integer getCellHeight() {
        return cellHeight;
    }

    /**
     * Sets cell height.
     *
     * @param cellHeight the cell height
     */
    public void setCellHeight(Integer cellHeight) {
        this.cellHeight = cellHeight;
    }

    /**
     * Gets cell width.
     *
     * @return the cell width
     */
    public Integer getCellWidth() {
        return cellWidth;
    }

    /**
     * Sets cell width.
     *
     * @param cellWidth the cell width
     */
    public void setCellWidth(Integer cellWidth) {
        this.cellWidth = cellWidth;
    }

    /**
     * Is full screen boolean.
     *
     * @return the boolean
     */
    public boolean isFullScreen() {
        return fullScreen;
    }

    /**
     * Sets full screen.
     *
     * @param fullScreen the full screen
     */
    public void setFullScreen(boolean fullScreen) {
        this.fullScreen = fullScreen;
    }

    /**
     * Is view boolean.
     *
     * @return the boolean
     */
    public boolean isView() {
        return view;
    }

    /**
     * Sets view.
     *
     * @param view the view
     */
    public void setView(boolean view) {
        this.view = view;
    }
}
