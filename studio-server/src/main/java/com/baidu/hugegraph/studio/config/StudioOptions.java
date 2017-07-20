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
import org.apache.commons.lang3.StringUtils;

import static com.baidu.hugegraph.config.OptionChecker.disallowEmpty;
import static com.baidu.hugegraph.config.OptionChecker.positiveInt;

/**
 * Options for StudioConfiguration.
 */
public class StudioOptions extends OptionHolder {

    private StudioOptions() {
        super();
    }

    private static volatile StudioOptions instance;

    /**
     * Single Instance for StudioOptions.
     *
     * @return the studio options
     */
    public static StudioOptions Instance() {
        if (instance == null) {
            synchronized (StudioOptions.class) {
                if (instance == null) {
                    instance = new StudioOptions();
                    instance.registerOptions();

                }
            }
        }
        return instance;
    }


    // STUDIO_HOME defined in hugestudio.sh
    public static final ConfigOption<String> STUDIO_SERVER_BASE_DIR =
            new ConfigOption<>(
                    "server.baseDirectory",
                    StringUtils.isNoneEmpty(System.getenv("STUDIO_HOME")) ?
                            System.getenv("STUDIO_HOME") : System.getProperty("user.dir"),
                    true,
                    "The base path of HugeStudio server.",
                    disallowEmpty(String.class)
            );

    public static final ConfigOption<String> STUDIO_SERVER_UI_DIR =
            new ConfigOption<>(
                    "server.ui",
                    "ui",
                    true,
                    "The ui directory of HugeStudio server.",
                    disallowEmpty(String.class)
            );

    public static final ConfigOption<String> STUDIO_SERVER_WAR_DIR =
            new ConfigOption<>(
                    "server.api.war",
                    "war/studio-api.war",
                    true,
                    "The war directory of HugeStudio server.",
                    disallowEmpty(String.class)
            );

    /**
     * The constant STUDIO_SERVER_HTTP_BIND_ADDRESS.
     */
    public static final ConfigOption<String> STUDIO_SERVER_HTTP_BIND_ADDRESS =
            new ConfigOption<>(
                    "server.httpBindAddress",
                    "localhost",
                    true,
                    "The http bind address of HugeStudio.",
                    disallowEmpty(String.class)
            );

    /**
     * The constant STUDIO_SERVER_HTTP_PORT.
     */
    public static final ConfigOption<Integer> STUDIO_SERVER_HTTP_PORT =
            new ConfigOption<>(
                    "server.httpPort",
                    8088,
                    true,
                    "The http port of HugeStudio http server.",
                    positiveInt()
            );
}
