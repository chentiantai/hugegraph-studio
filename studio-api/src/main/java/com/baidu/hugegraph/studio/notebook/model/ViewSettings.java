package com.baidu.hugegraph.studio.notebook.model;


import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;

public final class ViewSettings {
    @JsonProperty("CHART")
    public final ViewSettings.ChartSettings chart;
    @JsonProperty("GRAPH")
    public final ViewSettings.GraphSettings graph;
    @JsonProperty("CODE")
    public final ViewSettings.CodeSettings code;
    @JsonProperty("VALIDATIONS")
    public final ViewSettings.ValidationSettings validations;
    @JsonProperty("CELL_HEIGHT")
    public final Integer cellHeight;
    @JsonProperty("EDITOR_HEIGHT")
    public final Integer editorHeight;

    @JsonCreator
    public ViewSettings(
            @JsonProperty("CHART") ViewSettings.ChartSettings chartSettings,
            @JsonProperty("GRAPH") ViewSettings.GraphSettings graphSettings,
            @JsonProperty("CODE") ViewSettings.CodeSettings codeSettings,
            @JsonProperty("VALIDATIONS") ViewSettings.ValidationSettings validationSettings,
            @JsonProperty("CELL_HEIGHT") Integer cellHeight,
            @JsonProperty("EDITOR_HEIGHT") Integer editorHeight) {
        this.chart = chartSettings;
        this.graph = graphSettings;
        this.code = (codeSettings != null ? codeSettings : new ViewSettings.CodeSettings());
        this.validations = (validationSettings != null ? validationSettings : new ViewSettings.ValidationSettings());
        this.cellHeight = cellHeight;
        this.editorHeight = editorHeight;
    }

    public String toString() {
        return "ViewSettings{chart=" + this.chart
                + ", graph=" + this.graph
                + ", code=" + this.code
                + ", validations=" + this.validations
                + ", cellHeight=" + this.cellHeight
                + ", editorHeight=" + this.editorHeight
                + '}';
    }

    public class ChartSettings {
        //TODO : implement.
    }

    public class GraphSettings {
        //TODO : implement.
    }

    public class CodeSettings {
        @JsonProperty("hidden")
        private boolean hidden;
        //TODO : implement.
    }

    public class ValidationSettings {
        @JsonProperty("enabled")
        private boolean enabled;
    }
}