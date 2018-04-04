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

import static com.baidu.hugegraph.studio.notebook.model.vis.VisNode.SCALING_MAX;
import static com.baidu.hugegraph.studio.notebook.model.vis.VisNode.SCALING_MIN;

import java.util.Map;

public class Scaling {

    private Integer min = 10;
    private Integer max = 30;

    public Scaling(Map<String, Object> userData) {
        Number min = (Number) userData.get(SCALING_MIN);
        if (min != null) {
            this.min = min.intValue();
        }

        Number max = (Number) userData.get(SCALING_MAX);
        if (max != null) {
            this.max = max.intValue();
        }
    }

    public Scaling(Integer min, Integer max) {
        this.min = min;
        this.max = max;
    }

    public Scaling() {
        this(10, 30);
    }

    public Integer getMin() {
        return min;
    }

    public void setMin(Integer min) {
        this.min = min;
    }

    public Integer getMax() {
        return max;
    }

    public void setMax(Integer max) {
        this.max = max;
    }
}
