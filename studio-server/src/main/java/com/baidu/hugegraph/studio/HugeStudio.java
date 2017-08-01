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
import org.apache.catalina.Host;
import org.apache.catalina.LifecycleState;
import org.apache.catalina.Server;
import org.apache.catalina.core.StandardContext;
import org.apache.catalina.startup.Tomcat;
import org.apache.coyote.AbstractProtocol;
import org.apache.coyote.ProtocolHandler;
import org.apache.tomcat.util.descriptor.web.ErrorPage;
import org.apache.tomcat.util.scan.StandardJarScanner;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.servlet.ServletException;
import java.io.File;
import java.io.IOException;
import java.net.InetAddress;
import java.net.ServerSocket;
import java.nio.file.Files;
import java.nio.file.LinkOption;
import java.nio.file.Path;
import java.nio.file.Paths;

/**
 * The Bootstrap of HugeStudio.
 */
public class HugeStudio {
    private static final Logger logger = LoggerFactory.getLogger(HugeStudio.class);
    private static final String DEFAULT_CONFIGURATION_FILE = "hugestudio.properties";
    // The embed tomcat server
    private static Server server;

    /**
     * The entry point of application.
     *
     * @throws Exception the exception
     */
    public static void main(String[] args) throws Exception {
        StudioConfiguration configuration =
                new StudioConfiguration(DEFAULT_CONFIGURATION_FILE);
        run(configuration);
        server.await();
    }


    /**
     * Run tomcat with configuration
     *
     * @param configuration the studio configuration
     * @throws Exception the exception
     */
    public static void run(StudioConfiguration configuration) throws Exception {

        String baseDir = configuration.getServerBasePath();
        String uiDir = String.format("%s/%s", baseDir, configuration.getServerUIDir());
        String apiWarFile = String.format("%s/%s", baseDir, configuration.getServerWarDir());

        validateHttpPort(configuration.getHttpBindAddress(), configuration.getHttpPort());
        validatePathExists(uiDir);
        validateFileExists(apiWarFile);

        Tomcat tomcat = new Tomcat();
        tomcat.setPort(configuration.getHttpPort());

        ProtocolHandler ph = tomcat.getConnector().getProtocolHandler();
        if (ph instanceof AbstractProtocol) {
            ((AbstractProtocol) ph).setAddress(InetAddress.getByName
                    (configuration.getHttpBindAddress()));
        }
        tomcat.setHostname(configuration.getHttpBindAddress());

        StandardContext ui = configureUi(tomcat, uiDir);
        StandardContext api = configureWar(apiWarFile, "/api", tomcat);

        tomcat.start();

        server = tomcat.getServer();
        while (!server.getState().equals(LifecycleState.STARTED)) {
            Thread.sleep(100L);
        }

        if (!ui.getState().equals(LifecycleState.STARTED)) {
            System.out.println(
                    "\nStudio-ui failed to start. Please check logs for details");
            System.exit(1);
        }
        if (!api.getState().equals(LifecycleState.STARTED)) {
            System.out.println(
                    "\nStudio-api failed to start. Please check logs for details");
            System.exit(1);
        }

        String upMessage = String.format(
                "HugeStudio is now running on: http://%s:%s\n",
                configuration.getHttpBindAddress(),
                configuration.getHttpPort());

        logger.info(upMessage);
    }


    private static StandardContext configureUi(Tomcat tomcat, String uiLocation)
            throws ServletException {
        ErrorPage errorPage = new ErrorPage();
        errorPage.setErrorCode(404);
        errorPage.setLocation("/index.html");

        StandardContext context = (StandardContext) tomcat.addWebapp(
                "", new File(uiLocation).getAbsolutePath());
        context.addWelcomeFile("/index.html");
        context.addErrorPage(errorPage);

        return context;
    }

    private static StandardContext configureWar(String warFile, String appBase,
                                                Tomcat tomcat)
            throws ServletException, IOException {
        if (warFile != null && warFile.length() > 0) {
            StandardContext context = (StandardContext) tomcat.addWebapp(
                    appBase, new File(warFile).getAbsolutePath());
            Host host = (Host) context.getParent();
            File appBaseDirectory = host.getAppBaseFile();
            if (!appBaseDirectory.exists()) {
                appBaseDirectory.mkdirs();
            }
            context.setUnpackWAR(true);
            if ((context.getJarScanner() instanceof StandardJarScanner)) {
                ((StandardJarScanner) context.getJarScanner())
                        .setScanAllDirectories(true);
            }
            return context;
        }

        return null;
    }

    /**
     * To validate that the http port is available.
     * System.exit() when the port is not available.
     */
    private static void validateHttpPort(String httpBindAddress, int httpPort) {
        try {
            ServerSocket socket = new ServerSocket(httpPort, 1,
                    InetAddress.getByName(httpBindAddress));
            Object localObject = null;
            if (socket != null) {
                if (localObject != null) {
                    try {
                        socket.close();
                    } catch (Throwable t) {
                        ((Throwable) localObject).addSuppressed(t);
                    }
                } else {
                    socket.close();
                }
            }
        } catch (IOException e) {
            logger.error(String.format(
                    "Can't start Studio on port %d: %s",
                    httpPort, e));
            System.exit(1);
        }
    }

    private static void validatePathExists(String pathName) {
        File file = new File(pathName);
        if (!(file.exists() && file.isDirectory())) {
            logger.error("Can't start Studio, directory:{} does not exist", pathName);
            System.exit(1);
        }
    }

    private static void validateFileExists(String fileName) {
        File file = new File(fileName);
        if (! (file.exists() && !file.isDirectory())) {
            logger.error("Can't start Studio, file:{} does not exist", fileName);
            System.exit(1);
        }
    }


}
