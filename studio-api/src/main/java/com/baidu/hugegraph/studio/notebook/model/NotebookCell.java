package com.baidu.hugegraph.studio.notebook.model;

import com.baidu.hugegraph.studio.common.errors.StudioError;
import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import java.util.Optional;

@JsonIgnoreProperties(ignoreUnknown = true)
public class NotebookCell {
    public enum DataViewType {
        TABLE, GRAPH;
    }

    public enum Status {
        SUCCESS, CANCELLED, ERROR;
    }

    public class GremlinExecutionEngine {

    }

    private String id;
    private NotebookCell.Status status;
    private Optional<StudioError> errorDetails = Optional.empty();
    private String code;
    private String language;
    private NotebookCell.GremlinExecutionEngine gremlinExecutionEngine;
    private Result result;
    private String msg;
    private NotebookCell.DataViewType dataViewType;
    private ViewSettings viewSettings;


    @JsonCreator
    public NotebookCell(@JsonProperty("id") String id,
                        @JsonProperty("status") NotebookCell.Status status,
                        @JsonProperty("errorDetails") Optional<StudioError> errorDetails,
                        @JsonProperty("code") String code,
                        @JsonProperty("language") String language,
                        @JsonProperty("gremlinExecutionEngine") NotebookCell.GremlinExecutionEngine gremlinExecutionEngine,
                        @JsonProperty("result") Result result,
                        @JsonProperty("msg") String msg,
                        @JsonProperty("dataViewType") NotebookCell.DataViewType dataViewType,
                        @JsonProperty("viewSettings") ViewSettings viewSettings) {
        this.id = id;
        this.status = status;
        this.errorDetails = errorDetails;
        this.code = code;
        this.language = (language != null ? language.toLowerCase() : null);
        this.gremlinExecutionEngine = gremlinExecutionEngine;
        this.result = result;
        this.msg = msg;
        this.dataViewType = dataViewType;
        this.viewSettings = viewSettings;
    }

    public String getId() {
        return this.id;
    }

    public String getLanguage() {
        return this.language;
    }

    public NotebookCell.GremlinExecutionEngine getGremlinExecutionEngine() {
        return this.gremlinExecutionEngine;
    }

    public String getCode() {
        return this.code;
    }

    public NotebookCell.Status getStatus() {
        return this.status;
    }

    public Optional<StudioError> getErrorDetails() {
        return this.errorDetails;
    }


    public String getMsg() {
        return this.msg;
    }

    public Result getResult() {
        return this.result;
    }

    public ViewSettings getViewSettings() {
        return this.viewSettings;
    }

    public NotebookCell.DataViewType getDataViewType() {
        return this.dataViewType;
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

