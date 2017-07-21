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
package com.baidu.hugegraph.studio.config;
import com.baidu.hugegraph.config.ConfigOption;
import com.baidu.hugegraph.config.OptionHolder;

import static com.baidu.hugegraph.config.OptionChecker.disallowEmpty;
/**
 * The type Studio api options.
 */
public class StudioApiOptions extends OptionHolder {

    private StudioApiOptions() {
        super();
    }

    private static volatile StudioApiOptions instance;

    /**
     * Instance studio api options.
     *
     * @return the studio api options
     */
    public static StudioApiOptions Instance() {
        if (instance == null) {
            synchronized (StudioApiOptions.class) {
                if (instance == null) {
                    instance = new StudioApiOptions();
                    instance.registerOptions();

                }
            }
        }
        return instance;
    }
    /**
     * The constant STUDIO_DATA_BASE_DIR.
     */
    public static final ConfigOption<String> STUDIO_DATA_BASE_DIR =
            new ConfigOption<>(
                    "userData.baseDirectory",
                    "null",
                    true,
                    "The base directory of HugeStudio's user data.",
                    disallowEmpty(String.class)
            );

    /**
     * The constant STUDIO_DATA_CONNECTIONS_DIR.
     */
    public static final ConfigOption<String> STUDIO_DATA_CONNECTIONS_DIR =
            new ConfigOption<>(
                    "userData.connectionsDirectory",
                    "connections",
                    true,
                    "The connections directory of HugeStudio's user data.",
                    disallowEmpty(String.class)
            );

    /**
     * The constant STUDIO_DATA_NOTEBOOKS_DIR.
     */
    public static final ConfigOption<String> STUDIO_DATA_NOTEBOOKS_DIR =
            new ConfigOption<>(
                    "userData.notebooksDirectory",
                    "notebooks",
                    true,
                    "The notebooks directory of HugeStudio's user data.",
                    disallowEmpty(String.class)
            );
}
