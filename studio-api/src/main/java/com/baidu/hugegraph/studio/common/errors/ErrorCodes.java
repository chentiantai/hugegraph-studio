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

/**
 * The enum Error codes.
 */
public enum ErrorCodes {
    /**
     * Graph not found error codes.
     */
    GRAPH_NOT_FOUND(100401), /**
     * Invalid connection error codes.
     */
    INVALID_CONNECTION(100402), /**
     * Script evaluation error error codes.
     */
    SCRIPT_EVALUATION_ERROR(10403), /**
     * Server serialization error error codes.
     */
    SERVER_SERIALIZATION_ERROR(10404);

    private final int errorCode;

    private ErrorCodes(int errorCode) {
        this.errorCode = errorCode;
    }

    /**
     * Graph not found int.
     *
     * @return the int
     */
    public static int GraphNotFound() {
        return GRAPH_NOT_FOUND.errorCode;
    }

    /**
     * Invalid connection int.
     *
     * @return the int
     */
    public static int InvalidConnection() {
        return INVALID_CONNECTION.errorCode;
    }

    /**
     * Script evaluation error int.
     *
     * @return the int
     */
    public static int ScriptEvaluationError() {
        return SCRIPT_EVALUATION_ERROR.errorCode;
    }

    /**
     * Server serialization error int.
     *
     * @return the int
     */
    public static int ServerSerializationError() {
        return SERVER_SERIALIZATION_ERROR.errorCode;
    }

    /**
     * Error code int.
     *
     * @return the int
     */
    public int errorCode() {
        return this.errorCode;
    }
}
