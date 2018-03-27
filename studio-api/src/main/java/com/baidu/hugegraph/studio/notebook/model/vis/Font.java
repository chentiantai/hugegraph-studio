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
 * License for the specific language governing permissions and limitations
 * under the License.
 */
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
