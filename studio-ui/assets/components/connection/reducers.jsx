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
 * License for the specific language governing permissions and limitations
 * under the License.
 */

import {
    ALERT_SHOW,
    ALERT_HIDE,
    SHOW,
    ADD_SUCCESS,
    DELETE_SUCCESS,
    UPDATE_SUCCESS
} from './actions';

export function alerts(state = {items: [], lastKey: -1}, action) {
    switch (action.type) {
        case ALERT_SHOW:
            return {
                ...state,
                items: [...state.items, action.payload],
                lastKey: state.lastKey + 1
            };
        case ALERT_HIDE:
            return {
                ...state,
                items: state.items
                            .filter(item => (item.key !== action.payload.key))
            };
        default:
            return state;
    }
}

export function connections(state = [], action) {
    switch (action.type) {
        case SHOW: {
            return JSON.parse(JSON.stringify(action.connections));
        }
        case ADD_SUCCESS: {
            return [
                action.newConnection,
                ...state
            ];
        }
        case DELETE_SUCCESS: {
            return state.filter(connection => connection.id !== action.id);
        }
        case UPDATE_SUCCESS: {
            const connectionsArr = [];
            state.map(connection => {
                if (connection.id !== action.connection.id) {
                    connectionsArr.push(connection);
                } else {
                    connectionsArr.push(action.connection);
                }
            });
            return connectionsArr;
        }
        default:
            return state;
    }
}
