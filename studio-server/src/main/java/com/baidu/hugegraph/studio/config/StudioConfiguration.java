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

import com.baidu.hugegraph.config.HugeConfig;
import com.baidu.hugegraph.config.OptionSpace;
import com.google.common.base.Preconditions;

import java.net.URL;

/**
 * The type Studio configuration.
 */
public class StudioConfiguration {

    static {
        OptionSpace.register(StudioOptions.Instance());
    }

    private HugeConfig config = null;

    public StudioConfiguration(String configurationFile) {
        try {
            URL configurationUrl = this.getClass().getClassLoader()
                    .getResource(configurationFile);
            Preconditions.checkNotNull(configurationUrl);

            config = new HugeConfig(configurationUrl.getFile());
        } catch (org.apache.commons.configuration.ConfigurationException e) {
            throw new RuntimeException(String.format(
                    "Caught exception while loading Studio configuration " +
                    "from %s: ", configurationFile), e);
        }
    }

    public Integer getHttpPort() {
        return this.config.get(StudioOptions.STUDIO_SERVER_HTTP_PORT);
    }

    public String getHttpBindAddress() {
        return this.config.get(StudioOptions.STUDIO_SERVER_HTTP_BIND_ADDRESS);
    }

    public String getServerBasePath() {
        return this.config.get(StudioOptions.STUDIO_SERVER_BASE_DIR);
    }

    public String getServerUIDirectory() {
        return this.config.get(StudioOptions.STUDIO_SERVER_UI_DIR);
    }

    public String getServerWarDirectory() {
        return this.config.get(StudioOptions.STUDIO_SERVER_WAR_DIR);
    }
}
