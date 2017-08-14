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

import com.fasterxml.jackson.annotation.JsonProperty;

/**
 * The type Studio error.
 */
public class StudioError extends RuntimeException {
    /**
     * The Status.
     */
    public final int status;
    /**
     * The Code.
     */
    public final int code;

    /**
     * Instantiates a new Studio error.
     *
     * @param status  the status
     * @param code    the code
     * @param message the message
     */
    public StudioError(@JsonProperty("status") int status,
                       @JsonProperty("code") int code,
                       @JsonProperty("message") String message) {
        super(message);
        this.status = status;
        this.code = code;
    }

    /**
     * Invalid request studio error.
     *
     * @param message the message
     * @return the studio error
     */
    public static StudioError invalidRequest(String message) {
        return new StudioError(400, 0, message);
    }

    /**
     * Not found studio error.
     *
     * @param resourceName the resource name
     * @param id           the id
     * @return the studio error
     */
    public static StudioError notFound(String resourceName, String id) {
        return new StudioError(404, 0,
                               String.format("%s \"%s\" does not exist.",
                                             new Object[]{resourceName, id}));
    }

    /**
     * Not found studio error.
     *
     * @param id the id
     * @return the studio error
     */
    public static StudioError notFound(String id) {
        return new StudioError(404, 0,
                               String.format("%s does not exist.",
                                             new Object[]{id}));
    }

    /**
     * Conflict studio error.
     *
     * @param resourceName the resource name
     * @param id           the id
     * @return the studio error
     */
    public static StudioError conflict(String resourceName, String id) {
        return new StudioError(409, 0,
                               String.format("Resource with name %s already "
                                             + "exists and is associated with"
                                             + "id  \"%s\".",
                                             new Object[]{resourceName, id}));
    }

    /**
     * Bad gateway studio error.
     *
     * @param message the message
     * @return the studio error
     */
    public static StudioError badGateway(String message) {
        return new StudioError(502, 0, message);
    }

    /**
     * Gateway timeout studio error.
     *
     * @param message the message
     * @return the studio error
     */
    public static StudioError gatewayTimeout(String message) {
        return new StudioError(504, 0, message);
    }

    /**
     * Server error studio error.
     *
     * @param message the message
     * @return the studio error
     */
    public static StudioError serverError(String message) {
        return new StudioError(500, 0, message);
    }

    /**
     * Status int.
     *
     * @return the int
     */
    public int status() {
        return this.status;
    }

    /**
     * Code int.
     *
     * @return the int
     */
    public int code() {
        return this.code;
    }
}