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
package com.baidu.hugegraph.studio.studio;

import java.io.File;
import java.io.FileInputStream;
import java.io.InputStream;
import java.util.Map;
import org.yaml.snakeyaml.Yaml;

public class BootstrapConfiguration
{
    private final Integer httpPort;
    private final String httpBindAddress;
    private final String logDir;
    private final String securityEncryptionPasswordFile;
    private final String maxLogFileSize;
    private final String logFileName;
    private final Integer maxLogArchives;
    private final String userDataBaseDir;

    public BootstrapConfiguration(String configurationFile)
    {
        if (configurationFile == null) {
            configurationFile = "conf/configuration.yaml";
        }
        System.setProperty("hugegraph.studio.config.yaml", configurationFile);

        try {
            InputStream is = new FileInputStream(new File(configurationFile));
            Throwable localThrowable = null;

            try {
                Yaml yaml = new Yaml();

                Map<String, Object> map = (Map)yaml.load(is);
                Map<String, Object> serverConfig = (Map)map.get("server");
                Map<String, Object> loggingConfig = (Map)map.get("logging");
                Map<String, Object> securityConfig = (Map)map.get("security");
                Map<String, Object> dataConfig = (Map)map.get("userData");
                if (serverConfig != null && serverConfig.get("httpPort") != null) {
                    this.httpPort = ((Integer)serverConfig.get("httpPort"));
                } else {
                    this.httpPort = Integer.valueOf(8080);
                }
                String httpBindAddress =
                        (String)serverConfig.get("httpBindAddress");
                if (httpBindAddress != null
                    && !httpBindAddress.isEmpty()) {
                    this.httpBindAddress = httpBindAddress;
                } else {
                    this.httpBindAddress = "localhost";
                }

                String configuredLogDir = null;
                String configuredLogFile = null;
                String configuredMaxLogFileSize = null;
                Integer configuredMaxLogArchives = null;
                if (securityConfig != null) {
                    this.securityEncryptionPasswordFile = ((String)securityConfig.get("encryptionPasswordFile"));
                } else {
                    this.securityEncryptionPasswordFile = "conf/security/security.properties";
                }
                if (dataConfig != null) {
                    this.userDataBaseDir = ((String)dataConfig.get("baseDirectory"));
                } else {
                    this.userDataBaseDir = null;
                }
                if (loggingConfig != null)
                {
                    configuredLogDir = (String)loggingConfig.get("directory");
                    configuredLogFile = (String)loggingConfig.get("fileName");
                    configuredMaxLogFileSize = (String)loggingConfig.get("maxLogFileSize");
                    configuredMaxLogArchives = (Integer)loggingConfig.get("maxFiles");
                }
                if (configuredLogDir != null) {
                    this.logDir = configuredLogDir;
                } else {
                    this.logDir = "./logs";
                }
                if (configuredLogFile != null) {
                    this.logFileName = configuredLogFile;
                } else {
                    this.logFileName = "studio.log";
                }
                if (configuredMaxLogFileSize != null) {
                    this.maxLogFileSize = configuredMaxLogFileSize;
                } else {
                    this.maxLogFileSize = "250 MB";
                }
                if (configuredMaxLogArchives != null) {
                    this.maxLogArchives = configuredMaxLogArchives;
                } else {
                    this.maxLogArchives = Integer.valueOf(10);
                }
            } catch (Throwable localThrowable1) {
                localThrowable = localThrowable1;
                throw localThrowable1;
            } finally {
                if (is != null && localThrowable != null) {
                    try {
                        is.close();
                    } catch (Throwable localThrowable2) {
                        localThrowable.addSuppressed(localThrowable2);
                    }
                } else {
                    is.close();
                }
            }
        } catch (Exception e) {
            throw new RuntimeException(String.format(
                      "Caught exception loading properties from %s: ",
                      new Object[] { configurationFile }), e);
        }
    }

    public Integer getHttpPort()
    {
        return this.httpPort;
    }

    public String getHttpBindAddress()
    {
        return this.httpBindAddress;
    }

    public String getLogDir()
    {
        return this.logDir;
    }

    public String getMaxLogFileSize()
    {
        return this.maxLogFileSize;
    }

    public Integer getMaxLogArchives()
    {
        return this.maxLogArchives;
    }

    public String getLogFileName()
    {
        return this.logFileName;
    }

    public String getSecurityEncryptionPasswordFile()
    {
        return this.securityEncryptionPasswordFile;
    }

    public String getUserDataBaseDir()
    {
        return this.userDataBaseDir;
    }
}

