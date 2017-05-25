package com.baidu.hugegraph.studio.connections.service;

import com.baidu.hugegraph.studio.connections.model.Connection;
import com.baidu.hugegraph.studio.connections.model.ConnectionState;
import com.baidu.hugegraph.studio.connections.repository.ConnectionRepository;
import com.google.common.base.Preconditions;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

/**
 * Created by jishilei on 2017/5/19.
 */

@Path("connections")
public class ConnectionService {
    private static final Logger logger = LoggerFactory.getLogger(ConnectionService.class);

    @Autowired
    private ConnectionRepository connectionRepository;

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response getConnections() {
        Response response = Response.status(200)
                .entity(connectionRepository.getConnections())
                .build();
        return response;
    }

    @GET
    @Path("{connectionId}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getConnection(@PathParam("connectionId") String connectionId) {
        Response response = Response.status(200)
                .entity(connectionRepository.get(connectionId))
                .build();
        return response;
    }

    @POST
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public Response createConnection(Connection connection) {
        Response response = Response.status(201)
                .entity(connectionRepository.createConnection(connection))
                .build();
        return response;
    }

    @DELETE
    @Path("{connectionId}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response deleteConnection(@PathParam("connectionId") String connectionId) {
        connectionRepository.deleteConnection(connectionId);
        Response response = Response.status(204)
                .build();
        return response;
    }

    @PUT
    @Path("{connectionId}")
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public Response editConnection(@PathParam("connectionId") String connectionId,
                                   Connection connection) {
        Preconditions.checkArgument(connectionId != null && connectionId.equals(connection.getId()));
        connectionRepository.editConnection(connection);

        Response response = Response.status(200)
                .entity(connection)
                .build();
        return response;
    }

    @POST
    @Path("status")
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public Response getConnectionStatus(Connection connection) {
        // TODO : connect HugeServer to get connection status
        Response response = Response.status(200)
                .entity(ConnectionState.CLOSED)
                .build();
        return response;
    }

    @GET
    @Path("schema")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getConnectionSchema(@PathParam("connectionId") String connectionId) {
        Preconditions.checkNotNull(connectionId);

        // TODO : check connection status first

        // TODO : use hugegraph-client , return get schema ;

        Response response = Response.status(200)
                .build();
        return response;
    }
}
