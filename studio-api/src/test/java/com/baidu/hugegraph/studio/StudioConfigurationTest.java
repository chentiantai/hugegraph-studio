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

package com.baidu.hugegraph.studio;

import com.baidu.hugegraph.studio.config.StudioConfiguration;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;

public class StudioConfigurationTest {

    private StudioConfiguration configuration;
    @Before
    public void setUp() throws Exception {
        String basedir = System.getProperty("user.dir");
        System.setProperty("studio.conf.dir", basedir + "/conf");
        configuration = new StudioConfiguration();
    }

    @Test
    public void testConfiguration() {

        Assert.assertEquals(System.getProperty("user.home") + "/.hugestudio",
                configuration.getBaseUserDataDirectory());
        Assert.assertEquals(System.getProperty("user.home") + "/.hugestudio/connections",
                configuration.getConnectionsDirectory());
        Assert.assertEquals(System.getProperty("user.home") + "/.hugestudio/notebooks",
                configuration.getNotebooksDirectory());


    }
}
