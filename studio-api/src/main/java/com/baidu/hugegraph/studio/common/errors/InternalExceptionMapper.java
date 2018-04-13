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

    private static final Logger LOG =
            LogManager.getLogger(InternalExceptionMapper.class);

    public Response toResponse(Throwable e) {
        Pair<Response.Status, StudioError> errorDetailsPair = toErrorDetails(e);

        return Response.status(errorDetailsPair.getLeft())
                       .entity(errorDetailsPair.getRight())
                       .type("application/json")
                       .build();
    }

    public Pair<Response.Status, StudioError> toErrorDetails(Throwable e) {
        if (e instanceof StudioError) {
            StudioError err = (StudioError) e;
            return Pair.of(Response.Status.fromStatusCode(err.status()), err);
        }

        int errorCode = 0;
        Response.StatusType status = null;
        String message;
        if (e instanceof WebApplicationException) {
            LOG.debug("Returning HTTP error: ", e);
            status = ((WebApplicationException) e).getResponse()
                                                  .getStatusInfo();
            message = status.getReasonPhrase();
        } else {
            if (e instanceof ResponseException) {
                message = e.getMessage();
                switch (((ResponseException) e).getResponseStatusCode()) {
                    case REQUEST_ERROR_MALFORMED_REQUEST:
                    case REQUEST_ERROR_INVALID_REQUEST_ARGUMENTS:
                        status = Response.Status.BAD_REQUEST;
                        break;
                    case SERVER_ERROR_SCRIPT_EVALUATION:
                    case SERVER_ERROR_SERIALIZATION:
                        status = Response.Status.INTERNAL_SERVER_ERROR;
                        break;
                    case SERVER_ERROR_TIMEOUT:
                        status = Response.Status.GATEWAY_TIMEOUT;
                        break;
                    default:
                        status = Response.Status
                                         .fromStatusCode(((ResponseException) e)
                                         .getResponseStatusCode().getValue());
                        break;
                }
            } else {
                if (e instanceof CompletionException) {
                    return toErrorDetails(e.getCause());
                }
                LOG.error("Unknown internal server error: ", e);
                status = Response.Status.INTERNAL_SERVER_ERROR;
                message = e.getMessage();
            }
        }
        StudioError studioError = new StudioError(status.getStatusCode(),
                                                  errorCode, message);
        return Pair.of(Response.Status.fromStatusCode(status.getStatusCode()),
                       studioError);
    }
}
