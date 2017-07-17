package com.baidu.hugegraph.studio.connections.service;

import com.baidu.hugegraph.driver.HugeClient;
import com.baidu.hugegraph.exception.ClientException;
import com.baidu.hugegraph.structure.schema.EdgeLabel;
import com.baidu.hugegraph.structure.schema.PropertyKey;
import com.baidu.hugegraph.structure.schema.VertexLabel;
import com.baidu.hugegraph.studio.connections.model.Connection;
import com.baidu.hugegraph.studio.connections.model.ConnectionState;
import com.baidu.hugegraph.studio.connections.repository.ConnectionRepository;
import com.baidu.hugegraph.studio.notebook.model.Notebook;
import com.baidu.hugegraph.studio.notebook.repository.NotebookRepository;
import com.google.common.base.Preconditions;

import org.apache.commons.collections.map.HashedMap;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;

// import javax.ws.rs.Path;
// import javax.ws.rs.POST;
// import javax.ws.rs.DELETE;
// import javax.ws.rs.GET;
// import javax.ws.rs.PUT;
// import javax.ws.rs.PathParam;
// import javax.ws.rs.Produces;
// import javax.ws.rs.Consumes;
// import javax.ws.rs.core.MediaType;
// import javax.ws.rs.core.Response;

import javax.ws.rs.Path;
import javax.ws.rs.POST;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.PUT;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.Consumes;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

// import java.util.List;
// import java.util.Map;
// import java.util.HashMap;

import java.util.List;
import java.util.Map;
import java.util.HashMap;

/**
 * Created by jishilei on 2017/5/19.
 */
@Path("connections")
public class ConnectionService {
    private static final Logger logger =
            LoggerFactory.getLogger(ConnectionService.class);

    @Autowired
    private ConnectionRepository connectionRepository;
    @Autowired
    private NotebookRepository notebookRepository;

    /**
     * Gets connections.
     *
     * @return the connections
     */
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response getConnections() {
        Response response = Response.status(200)
                .entity(connectionRepository.getConnections())
                .build();
        return response;
    }

    /**
     * Gets connection.
     *
     * @param connectionId the connection id
     *
     * @return the connection
     */
    @GET
    @Path("{connectionId}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getConnection(
            @PathParam("connectionId") String connectionId) {
        Response response = Response.status(200)
                .entity(connectionRepository.get(connectionId))
                .build();
        return response;
    }

    /**
     * Create connection response.
     *
     * @param connection the connection
     *
     * @return the response
     */
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public Response createConnection(Connection connection) {
        connection.setLastModified(System.currentTimeMillis());
        Response response = Response.status(201)
                .entity(connectionRepository.createConnection(connection))
                .build();
        return response;
    }

    /**
     * Delete connection response.
     *
     * @param connectionId the connection id
     *
     * @return the response
     */
    @DELETE
    @Path("{connectionId}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response deleteConnection(
            @PathParam("connectionId") String connectionId) {
        Preconditions.checkArgument(!notebookRepository.getNotebooks().stream()
                        .anyMatch(n -> n.getConnectionId().equals(connectionId)),
                "The connection can not been deleted if it has been used by "
                        + "any notebook");

        connectionRepository.deleteConnection(connectionId);
        Response response = Response.status(204).build();
        return response;
    }

    /**
     * Edit connection response.
     *
     * @param connectionId the connection id
     * @param connection   the connection
     *
     * @return the response
     */
    @PUT
    @Path("{connectionId}")
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public Response editConnection(
            @PathParam("connectionId") String connectionId,
            Connection connection) {
        Preconditions.checkArgument(connectionId != null
                && connectionId.equals(connection.getId()));
        connection.setLastModified(System.currentTimeMillis());
        connectionRepository.editConnection(connection);

        Response response = Response.status(200)
                .entity(connection)
                .build();
        return response;
    }

    /**
     * Gets connection status.
     *
     * @param connection the connection
     *
     * @return the connection status
     */
    @GET
    @Path("status")
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public Response getConnectionStatus(Connection connection) {
        Preconditions.checkNotNull(connection);
        Response response = Response.status(200)
                .entity(ConnectionState.OPEN)
                .build();
        try {
            HugeClient.open(connection.getConnectionUri(),
                    connection.getGraphName());
        } catch (ClientException ex) {
            response = Response.status(ex.status())
                    .entity(ConnectionState.CLOSED)
                    .build();
        }
        return response;
    }

    /**
     * Gets connection schema.
     *
     * @param connectionId the connection id
     *
     * @return the connection schema
     */
    @GET
    @Path("{connectionId}/schema")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getConnectionSchema(
            @PathParam("connectionId") String connectionId) {
        Preconditions.checkNotNull(connectionId);
        Connection connection = connectionRepository.get(connectionId);
        Preconditions.checkNotNull(connection);
        Preconditions.checkArgument(connection.getId().equals(connectionId));
        Response response = null;
        HugeClient hugeClient = null;
        try {
            hugeClient = HugeClient.open(connection.getConnectionUri(),
                    connection.getGraphName());
            Map<String, List> schemas = new HashMap<>();
            List<PropertyKey> propertyKeys =
                    hugeClient.schema().getPropertyKeys();
            List<VertexLabel> vertexLabels =
                    hugeClient.schema().getVertexLabels();
            List<EdgeLabel> edgeLabels = hugeClient.schema().getEdgeLabels();
            schemas.put("propertyKeys", propertyKeys);
            schemas.put("vertexLabels", vertexLabels);
            schemas.put("edgeLabels", edgeLabels);
            response = Response.status(200)
                    .entity(schemas)
                    .build();
        } catch (ClientException ex) {
            response = Response.status(ex.status())
                    .entity(ex.message())
                    .build();
        }
        return response;
    }
}
