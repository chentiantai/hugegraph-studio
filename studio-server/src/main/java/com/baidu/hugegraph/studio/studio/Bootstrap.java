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

import com.google.common.base.Preconditions;
import org.apache.catalina.Host;
import org.apache.catalina.LifecycleState;
import org.apache.catalina.Server;
import org.apache.catalina.core.StandardContext;
import org.apache.catalina.startup.Tomcat;
import org.apache.commons.cli.*;
import org.apache.coyote.AbstractProtocol;
import org.apache.coyote.ProtocolHandler;
import org.apache.logging.log4j.core.LoggerContext;
import org.apache.logging.log4j.core.config.Configurator;
import org.apache.tomcat.util.descriptor.web.ErrorPage;
import org.apache.tomcat.util.scan.StandardJarScanner;
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

public class Bootstrap {
    public static final String DEFAULT_HTML_DIR = "/html";
    public static final String DEFAULT_CONF_DIR = "/conf";
    public static final String DEFAULT_WAR_API_FILE = "/war/studio-api.war";

    static Server server;

    public static void shutdown()
            throws Exception {
        server.stop();
    }

    public static void destroy()
            throws Exception {
        server.destroy();
    }

    public static Options buildOptions() {
        Options options = new Options();
        options.addOption("h", "help", false, "print help message and show all available options");
        options.addOption("conf", true, " conf dir location. Default : {user.home}/conf");
        options.addOption("html", true, " html dir location. Default : {user.home}/html");
        options.addOption("api", true, "api war file location. Default : {user.home}/war/studio-api.war");

        return options;
    }

    public static void printHelp() {
        Options options = buildOptions();
        HelpFormatter formatter = new HelpFormatter();
        formatter.printHelp("Bootstrap -html /html -api /war/studio-api.war", options);
    }

    public static String getAbsolutePath(String path) {
        if (path == null || path.length() == 0) {
            return "";
        }
        File dir = new File(path);
        if (!dir.exists()) {
            dir = new File(System.getProperty("user.dir") + path);
        }

        return dir.getAbsolutePath();
    }

    public static void main(String[] args) throws Exception {
        String baseDir = System.getProperty("user.dir");
        String htmlDir = baseDir + DEFAULT_HTML_DIR;
        String confDir = baseDir + DEFAULT_CONF_DIR;
        String apiWarFile = baseDir + DEFAULT_WAR_API_FILE;

        CommandLineParser parser = new DefaultParser();
        try {
            CommandLine cmdLine = parser.parse(buildOptions(), args);
            if (cmdLine.hasOption("help")) {
                printHelp();
                System.exit(0);
            }
            if (cmdLine.hasOption("html")) {
                htmlDir = cmdLine.getOptionValue("html", DEFAULT_HTML_DIR);
            }
            if (cmdLine.hasOption("conf")) {
                confDir = cmdLine.getOptionValue("html", DEFAULT_CONF_DIR);
            }
            if (cmdLine.hasOption("api")) {
                apiWarFile = cmdLine.getOptionValue("html", DEFAULT_WAR_API_FILE);
            }
        } catch (ParseException e) {
            System.out.println("Failed to parse command line.");
            printHelp();
            System.exit(0);
        }

        htmlDir = System.getProperty("user.dir") + "/studio-ui/html";
        apiWarFile = System.getProperty("user.dir")
                            + "/studio-api/target/studio-api.war";

        run(confDir, htmlDir, apiWarFile);
        server.await();
    }

    public static void run(String confDir, String uiDir, String apiWarFile)
            throws Exception {
        if (confDir == null || confDir.isEmpty()) {
            confDir = "conf";
        } else {
            confDir = replaceHomeDirReferences(confDir);
        }

        uiDir = getAbsolutePath(uiDir);
        confDir = getAbsolutePath(confDir);
        apiWarFile = getAbsolutePath(apiWarFile);

        BootstrapConfiguration configuration = new BootstrapConfiguration(
                String.format("%s/configuration.yaml", new Object[]{confDir}));

        String logDir = replaceHomeDirReferences(configuration.getLogDir());
        String userDataDir = replaceHomeDirReferences(
                            configuration.getUserDataBaseDir());
        String passwordEncryptionFile = replaceHomeDirReferences(
                            configuration.getSecurityEncryptionPasswordFile());

        validateConfiguration(configuration.getHttpBindAddress(),
                            configuration.getHttpPort().intValue(), logDir,
                            userDataDir, passwordEncryptionFile);

        configureLogging(configuration, logDir, confDir);

        Tomcat tomcat = new Tomcat();

        tomcat.setPort(configuration.getHttpPort().intValue());

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
                "Studio is now running on: http://%s:%s\n",
                new Object[]{configuration.getHttpBindAddress(),
                             configuration.getHttpPort()});

        System.out.println("\n" + upMessage);
        LoggerFactory.getLogger(Bootstrap.class).info(upMessage);
    }

    private static String replaceHomeDirReferences(String confDir) {
        if (confDir != null && System.getProperty("user.home") != null) {
                return confDir.replaceFirst(
                        "^~", System.getProperty("user.home"));
        }
        return confDir;
    }

    private static void validateConfiguration(String httpBindAddress,
                                              int httpPort, String logDir,
                                              String userDataDir,
                                              String passwordEncryptionFile) {
        validateHttpPort(httpBindAddress, httpPort);
        validateWriteablePath(logDir, "log directory", true);
        if (userDataDir != null && !userDataDir.isEmpty()) {
            validateWriteablePath(userDataDir, "user data directory", true);
        }
        validateReadablePath(passwordEncryptionFile, "security encryption file");
    }

    private static void validateWriteablePath(String path, String subject,
                                              boolean createdIfDoesNotExist) {
        validateWriteablePath(Paths.get(path, new String[0]).toAbsolutePath(),
                                        subject, createdIfDoesNotExist);
    }

    private static void validateWriteablePath(Path path, String subject,
                                              boolean createdIfDoesNotExist) {
        if (!Files.exists(path, new LinkOption[0]) && createdIfDoesNotExist
            && path.getParent() != null) {
            validateWriteablePath(path.getParent(), subject, true);
        } else {
            validateWriteablePath(path, subject);
        }
    }

    private static void validateWriteablePath(Path path, String subject) {
        validatePathExists(path, subject);
        if (!Files.isWritable(path)) {
            System.out.println(String.format(
                    "Can't start Studio, cannot write to configured %s %s",
                    new Object[]{subject, path}));
            System.exit(1);
        }
    }

    private static void validateReadablePath(String path, String subject) {
        validateReadablePath(Paths.get(path, new String[0]), subject);
    }

    private static void validateReadablePath(Path path, String subject) {
        validatePathExists(path, subject);
        if (!Files.isReadable(path)) {
            System.out.println(String.format(
                    "Can't start Studio, cannot read from configured %s %s",
                    new Object[]{subject, path}));
            System.exit(1);
        }
    }

    private static void validatePathExists(Path path, String subject) {
        if (!Files.exists(path, new LinkOption[0])) {
            System.out.println(String.format(
                    "Can't start Studio, configured %s %s does not exist",
                    new Object[]{subject, path}));
            System.exit(1);
        }
    }

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
            System.err.println(String.format(
                    "Can't start Studio on port %d: %s",
                    new Object[]{Integer.valueOf(httpPort), e}));
            System.exit(1);
        }
    }

    private static void configureLogging(BootstrapConfiguration configuration,
                                         String logDir, String confDir) {
        System.setProperty("studio.log.file", configuration.getLogFileName());
        System.setProperty("studio.log.dir", logDir);
        System.setProperty("studio.max.log.file.size",
                            configuration.getMaxLogFileSize());
        System.setProperty("studio.max.log.archives",
                            configuration.getMaxLogArchives().toString());

        String log4jConfLocation = String.format("%s/log4j2.xml",
                                                 new Object[]{confDir});
        System.setProperty("log4j.configurationFile", log4jConfLocation);
        LoggerContext context = Configurator.initialize(null, log4jConfLocation);

        context.start();
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
}
