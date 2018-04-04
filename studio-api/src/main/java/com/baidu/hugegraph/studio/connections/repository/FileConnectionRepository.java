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

package com.baidu.hugegraph.studio.connections.repository;

import com.baidu.hugegraph.studio.config.StudioConfiguration;
import com.baidu.hugegraph.studio.connections.model.Connection;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.common.base.Preconditions;
import org.apache.commons.io.FileUtils;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Repository;

import java.io.BufferedWriter;
import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.*;
import java.util.concurrent.locks.Lock;
import java.util.concurrent.locks.ReadWriteLock;
import java.util.concurrent.locks.ReentrantReadWriteLock;

/**
 * The type File connection repository.
 *
 * To Save connection entity to disk as Json.
 * To Read connection entity from disk .
 */
@Repository("connectionRepository")
public class FileConnectionRepository implements ConnectionRepository {

    private static final Logger LOG =
            LoggerFactory.getLogger(FileConnectionRepository.class);

    private final ObjectMapper mapper = new ObjectMapper();
    private StudioConfiguration configuration;
    private String connectionsDataDirectory;

    private final ReadWriteLock lock = new ReentrantReadWriteLock();
    private final Lock readLock = lock.readLock();
    private final Lock writeLock = lock.writeLock();

    /**
     * Instantiates a new File connection repository.
     */
    public FileConnectionRepository() {
        initConnectionRepository();
    }

    private void initConnectionRepository() {
        configuration = new StudioConfiguration();
        connectionsDataDirectory = configuration.getConnectionsDirectory();
        Preconditions.checkNotNull(connectionsDataDirectory);

        LOG.info("connectionsDataDirectory: {}", connectionsDataDirectory);
        File dir = new File(connectionsDataDirectory);
        if (!dir.exists()) {
            dir.mkdirs();
        }
        Preconditions.checkArgument(dir.exists() && dir.isDirectory());
    }

    private void writeConnection(Connection connection) {
        Preconditions.checkNotNull(connection);
        Preconditions.checkArgument(StringUtils.isNotEmpty(connection.getId()));

        String filePath = connectionsDataDirectory + "/" + connection.getId();
        Path path = Paths.get(filePath);
        writeLock.lock();
        try (BufferedWriter writer = Files.newBufferedWriter(path)) {
            writer.write(mapper.writeValueAsString(connection));
            LOG.debug("Write connection file: {}", filePath);
        } catch (IOException e) {
            LOG.error("Can't write file: {}", filePath, e);
        }finally {
            writeLock.unlock();
        }
    }

    @Override
    public List<Connection> getConnections() {
        List<Connection> connections = new ArrayList<>();
        try {
            Files.list(Paths.get(connectionsDataDirectory))
                 .filter(Files::isRegularFile).forEach(path -> {
                    Connection connection = getConnectionByPath(path);
                    if (connection != null) {
                        connections.add(connection);
                    }
                 });
            Collections.sort(connections, (conn1, conn2) ->
                    conn2.getLastModified().compareTo(conn1.getLastModified()));
        } catch (IOException e) {
            LOG.error("Can't read file: {}", connectionsDataDirectory, e);
        } catch (NullPointerException e) {
            LOG.error("Can't sorting files. Some files may not have a " +
                      "lastModified Field: {}", connectionsDataDirectory, e);
        }
        return connections;
    }

    @Override
    public Connection createConnection(Connection connection) {
        Preconditions.checkNotNull(connection);
        Preconditions.checkArgument(connection.getConnectionHost() != null &&
                                    connection.getPort() > 0);

        if (StringUtils.isEmpty(connection.getId())) {
            connection.setId(UUID.randomUUID().toString());
        }
        writeConnection(connection);
        return connection;
    }

    @Override
    public Connection editConnection(Connection connection) {
        Preconditions.checkNotNull(connection);
        // Ensure connectionId is not empty.
        Preconditions.checkArgument(connection.getConnectionHost() != null &&
                                    connection.getPort() > 0 &&
                                    StringUtils.isNotEmpty(connection.getId()));
        writeConnection(connection);
        return connection;
    }

    @Override
    public Connection get(String connectionId) {
        readLock.lock();
        try {
            String path = connectionsDataDirectory + "/" + connectionId;
            return mapper.readValue(Files.readAllBytes(Paths.get(path)),
                                    Connection.class);
        } catch (IOException e) {
            LOG.error("Can't read connection file: {}/{}" ,
                      connectionsDataDirectory, connectionId, e);
        }finally {
            readLock.unlock();
        }
        return null;
    }

    public Connection getConnectionByPath(Path path) {
        readLock.lock();
        try {
            return mapper.readValue(Files.readAllBytes(path), Connection.class);
        } catch (IOException e) {
            LOG.error("Failed to read connection file: {}", path, e);
        }finally {
            readLock.unlock();
        }
        return null;
    }

    @Override
    public void deleteConnection(String connectionId) {
        writeLock.lock();
        try {
            FileUtils.forceDelete(FileUtils.getFile(connectionsDataDirectory,
                                  connectionId));
        } catch (IOException e) {
            LOG.error("Can't remove connection file: {}/{}",
                      connectionsDataDirectory, connectionId, e);
        }finally {
            writeLock.unlock();
        }
    }
}
