package com.baidu.hugegraph.studio.notebook.model.vis;

import static com.baidu.hugegraph.studio.notebook.model.vis.VisNode.FONT_COLOR;
import static com.baidu.hugegraph.studio.notebook.model.vis.VisNode.FONT_FACE;
import static com.baidu.hugegraph.studio.notebook.model.vis.VisNode.FONT_MULTI;
import static com.baidu.hugegraph.studio.notebook.model.vis.VisNode.FONT_SIZE;

import java.util.Map;

import org.apache.commons.lang3.StringUtils;

public class Font {
    private String color = "#343434";
    private Integer size = 12;
    private String face = "arial";
    private Boolean multi = false;

    public Font() {

    }

    public Font(Map<String, Object> userData) {
        Number size = (Number) userData.get(FONT_SIZE);
        if (size != null) {
            this.size = size.intValue();
        }

        String color = (String) userData.get(FONT_COLOR);
        if (!StringUtils.isBlank(color)) {
            this.color = color;
        }

        String face = (String) userData.get(FONT_FACE);
        if (!StringUtils.isBlank(face)) {
            this.face = face;
        }

        Boolean multi = (Boolean) userData.get(FONT_MULTI);
        if (multi != null) {
            this.multi = multi;
        }
    }

    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
    }

    public Integer getSize() {
        return size;
    }

    public void setSize(Integer size) {
        this.size = size;
    }

    public String getFace() {
        return face;
    }

    public void setFace(String face) {
        this.face = face;
    }

    public Boolean getMulti() {
        return multi;
    }

    public void setMulti(Boolean multi) {
        this.multi = multi;
    }
}
