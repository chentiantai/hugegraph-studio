package com.baidu.hugegraph.studio.connections.repository;

import com.baidu.hugegraph.studio.conf.StudioConfiguration;
import com.baidu.hugegraph.studio.connections.model.Connection;
import com.baidu.hugegraph.studio.notebook.model.Notebook;
import com.baidu.hugegraph.studio.notebook.repository.FileNotebookRepository;
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
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

/**
 * Created by jishilei on 2017/5/19.
 */
@Repository("connectionRepository")
public class FileConnectionRepository implements ConnectionRepository {
    private static final Logger logger = LoggerFactory.getLogger(FileNotebookRepository.class);

    private ObjectMapper mapper = new ObjectMapper();

    private StudioConfiguration configuration;

    private String connectionsDataDirectory;

    public FileConnectionRepository() {
        initConnectionRepository();
    }

    private void initConnectionRepository() {
        configuration = new StudioConfiguration();
        connectionsDataDirectory = configuration.getConnectionsDirectory();
        Preconditions.checkNotNull(connectionsDataDirectory);

        logger.info("connectionsDataDirectory=" + connectionsDataDirectory);
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
        try {
            try (BufferedWriter writer = Files.newBufferedWriter(path)) {
                writer.write(mapper.writeValueAsString(connection));
            }
            logger.debug("Write Connection File :" + filePath);
        } catch (IOException e) {
            logger.error("Could Not Write File : " + filePath, e);
        }
    }

    @Override
    public List<Connection> getConnections() {
        List<Connection> connections = new ArrayList<>();
        try {
            Files.list(Paths.get(connectionsDataDirectory))
                    .filter(Files::isRegularFile)
                    .forEach(path -> {
                        try {
                            connections.add(mapper.readValue(Files.readAllBytes(path), Connection.class));
                        } catch (IOException e) {
                            logger.error("Could Not Read File : " + connectionsDataDirectory + "/" + path.getFileName(), e);
                            // only skips this iteration.
                            return;
                        }
                    });
        } catch (IOException e) {
            logger.error("Could Not Read File : " + connectionsDataDirectory, e);
        }
        return connections;
    }

    @Override
    public Connection createConnection(Connection connection) {
        Preconditions.checkNotNull(connection);
        Preconditions.checkArgument(connection.getConnectionHosts() != null
                && connection.getConnectionHosts().size() > 0
                && connection.getPort() > 0);

        if (StringUtils.isEmpty(connection.getId())) {
            connection.setId(UUID.randomUUID().toString());
        }
        writeConnection(connection);
        return connection;
    }

    @Override
    public Connection editConnection(Connection connection) {
        Preconditions.checkNotNull(connection);
        // ensure connectionId is not empty.
        Preconditions.checkArgument(connection.getConnectionHosts() != null
                && connection.getConnectionHosts().size() > 0
                && connection.getPort() > 0
                && StringUtils.isNotEmpty(connection.getId()));
        writeConnection(connection);
        return connection;
    }

    @Override
    public Connection get(String connectionId) {
        try {
            return mapper.readValue(
                    Files.readAllBytes(Paths.get(connectionsDataDirectory + "/" + connectionId)),
                    Connection.class);
        } catch (IOException e) {
            logger.error("Could Not Read Connection File : " + connectionsDataDirectory + "/" + connectionId, e);
        }
        return null;
    }

    @Override
    public void delete(String connectionId) {
        try {
            FileUtils.forceDelete(FileUtils.getFile(connectionsDataDirectory, connectionId));
        } catch (IOException e) {
            logger.error("Could Not Delete Connection File : " + connectionsDataDirectory + "/" + connectionId, e);
        }
    }
}
