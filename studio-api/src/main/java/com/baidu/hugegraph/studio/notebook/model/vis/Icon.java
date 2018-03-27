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

import static com.baidu.hugegraph.studio.notebook.model.vis.VisNode.ICON_CODE;
import static com.baidu.hugegraph.studio.notebook.model.vis.VisNode.ICON_COLOR;
import static com.baidu.hugegraph.studio.notebook.model.vis.VisNode.ICON_SIZE;

import java.util.Map;

import org.apache.commons.lang3.StringUtils;

public class Icon {
    private String face;
    private String code;
    private Integer size;
    private String color;

    public Icon() {
        this("FontAwesome", "\uf111", 50, "#2B7CE9");
    }

    public Icon(String code) {
        this("FontAwesome", code, 50, "#2B7CE9");

    }

    public Icon(String face, String code, Integer size, String color) {
        this.face = face;
        this.code = code;
        this.size = size;
        this.color = color;
    }

    public Icon(Map<String, Object> userData) {
        this();
        String iconCode = (String) userData.get(ICON_CODE);
        if (!StringUtils.isBlank(iconCode)) {
            this.code = iconCode;
        }

        String iconColor = (String) userData.get(ICON_COLOR);
        if (!StringUtils.isBlank(iconColor)) {
            this.color = iconColor;
        }

        Number iconSize = (Number) userData.get(ICON_SIZE);
        if (iconSize != null) {
            this.size = iconSize.intValue();
        }
    }

    public String getFace() {
        return face;
    }

    public void setFace(String face) {
        this.face = face;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public Integer getSize() {
        return size;
    }

    public void setSize(Integer size) {
        this.size = size;
    }

    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
    }
}
