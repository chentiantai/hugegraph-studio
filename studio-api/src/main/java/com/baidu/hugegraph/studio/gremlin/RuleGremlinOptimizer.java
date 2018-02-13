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

package com.baidu.hugegraph.studio.gremlin;

import com.baidu.hugegraph.studio.config.StudioConfiguration;

import java.util.Set;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Repository;

/**
 * Add some rules for gremlin code.
 */
@Repository("ruleGremlinOptimizer")
public class RuleGremlinOptimizer implements GremlinOptimizer {

    private StudioConfiguration configuration;
    private Set<String> appendLimitSuffixes;

    public RuleGremlinOptimizer() {
        configuration = new StudioConfiguration();
        appendLimitSuffixes = configuration.getAppendLimitSuffixes();
    }

    /**
     * Add 'limit' to the end of gremlin statement to avoid OOM,
     * when the statement end up with the desired suffix string.
     *
     * @param code.
     * @param limit the value need be greater than 0.
     * @return
     */
    @Override
    public String limitOptimize(String code, Long limit) {
        for (String suffix : appendLimitSuffixes) {
            if (code.endsWith(suffix)) {
                return code + ".limit(" + limit + ")";
            }
        }
        return code;
    }

    @Override
    public String limitOptimize(String code) {
        return limitOptimize(code, configuration.getDataLimit());
    }
}
