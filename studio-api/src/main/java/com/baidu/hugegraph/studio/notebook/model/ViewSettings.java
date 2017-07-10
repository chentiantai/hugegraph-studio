package com.baidu.hugegraph.studio.notebook.model;


import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;

public final class ViewSettings {

    public enum ViewType {
        TABLE, CODE, GRAPH;
    }

    @JsonProperty("viewType")
    public ViewSettings.ViewType viewType;

    @JsonProperty("cellHeight")
    public Integer cellHeight;

    @JsonProperty("cellWidth")
    public Integer cellWidth;

    @JsonProperty("fullScreen")
    public boolean fullScreen;

    @JsonProperty("view")
    public boolean view;

    public class ValidationSettings {
        @JsonProperty("enabled")
        private boolean enabled;
    }

    public ViewType getViewType() {
        return viewType;
    }

    public void setViewType(ViewType viewType) {
        this.viewType = viewType;
    }

    public Integer getCellHeight() {
        return cellHeight;
    }

    public void setCellHeight(Integer cellHeight) {
        this.cellHeight = cellHeight;
    }

    public Integer getCellWidth() {
        return cellWidth;
    }

    public void setCellWidth(Integer cellWidth) {
        this.cellWidth = cellWidth;
    }

    public boolean isFullScreen() {
        return fullScreen;
    }

    public void setFullScreen(boolean fullScreen) {
        this.fullScreen = fullScreen;
    }

    public boolean isView() {
        return view;
    }

    public void setView(boolean view) {
        this.view = view;
    }
}