package com.baidu.hugegraph.studio.common.errors;

import org.apache.commons.lang3.tuple.Pair;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.apache.tinkerpop.gremlin.driver.exception.ResponseException;

import javax.ws.rs.WebApplicationException;
import javax.ws.rs.core.Response;
import javax.ws.rs.ext.ExceptionMapper;
import javax.ws.rs.ext.Provider;
import java.util.concurrent.CompletionException;

@Provider
public class InternalExceptionMapper implements ExceptionMapper<Throwable> {
    private static final Logger logger = LogManager.getLogger(InternalExceptionMapper.class);

    public Response toResponse(Throwable ex) {
        Pair<Response.Status, StudioError> errorDetailsPair = toErrorDetails(ex);

        return Response.status((Response.Status) errorDetailsPair.getLeft()).entity(errorDetailsPair.getRight()).type("application/json").build();
    }

    public Pair<Response.Status, StudioError> toErrorDetails(Throwable ex) {
        if ((ex instanceof StudioError)) {
            StudioError er = (StudioError) ex;
            return Pair.of(Response.Status.fromStatusCode(er.status()), er);
        }
        int errorCode = 0;
        String message;
        Response.StatusType status;
        if ((ex instanceof WebApplicationException)) {
            logger.trace("Returning HTTP error:", ex);
            status = ((WebApplicationException) ex).getResponse().getStatusInfo();
            message = status.getReasonPhrase();
        } else {
            if ((ex instanceof ResponseException)) {
                message = ex.getMessage();
                switch (((ResponseException) ex).getResponseStatusCode().ordinal()) {
                    case 1:
                        status = Response.Status.BAD_GATEWAY;
                        break;
                    case 2:
                        status = Response.Status.BAD_REQUEST;
                        errorCode = ErrorCodes.ServerSerializationError();
                        break;
                    case 3:
                        status = Response.Status.BAD_REQUEST;
                        errorCode = ErrorCodes.ScriptEvaluationError();
                        break;
                    case 4:
                        status = Response.Status.GATEWAY_TIMEOUT;
                        break;
                    default:
                        status = Response.Status.fromStatusCode(((ResponseException) ex).getResponseStatusCode().getValue());
                }
                if (status == null) {
                    status = Response.Status.BAD_GATEWAY;
                }
            } else {
                if ((ex instanceof CompletionException)) {
                    return toErrorDetails(ex.getCause());
                }
                logger.error("Unknown internal server error: ", ex);
                status = Response.Status.INTERNAL_SERVER_ERROR;
                message = ex.getMessage();
            }
        }
        StudioError studioError = new StudioError(status.getStatusCode(), errorCode, message);
        return Pair.of(Response.Status.fromStatusCode(status.getStatusCode()), studioError);
    }
}
