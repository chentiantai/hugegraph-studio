package com.baidu.hugegraph.studio.connections.repository;

import com.baidu.hugegraph.studio.connections.model.Connection;

import java.util.List;

/**
 * Created by jishilei on 2017/5/19.
 */
public interface ConnectionRepository {

    List<Connection> getConnections();

    Connection createConnection(Connection connection);

    Connection editConnection(Connection connection);

    Connection get(String connectionId);

    void delete(String connectionId);
}
