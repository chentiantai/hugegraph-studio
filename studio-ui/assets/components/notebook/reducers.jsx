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
    ADD_ITEM,
    SHOW_NOTEBOOK,
    DELETE_ITEM,
    UPDATE_ITEM,
    CLEAR_NOTEBOOK_STATE,
    RUN_MODE,
    SHOW_SCHEMA,
    SYCN_ITEM,
    UPDATE_GRAPH
} from './actions';

export function notebook(state = [], action) {

    switch (action.type) {
        case ADD_ITEM: {
            let arr = [];
            let isAdd = false;
            for (let i = 0; i < state.cells.length; i++) {
                if (action.position == i) {
                    arr.push(action.newCell);
                    arr.push(state.cells[i]);
                    isAdd = true;
                } else {
                    arr.push(state.cells[i]);
                }
            }
            if (!isAdd) arr.push(action.newCell);
            return {
                ...state,
                cells: arr
            };
        }
        case SHOW_NOTEBOOK:
            return action.notebook;
        case DELETE_ITEM:
            return {
                ...state,
                cells: state.cells.filter(cell => cell.id !== action.cellId)
            };
        case UPDATE_ITEM: {
            return {
                ...state,
                cells: state.cells.map(
                    cell => cell.id === action.data.id ? {
                        ...cell,
                        code: action.data.code,
                        language: action.data.language,
                        viewSettings: action.data.viewSettings
                    } : cell
                )
            };
        }
        case SYCN_ITEM: {
            return {
                ...state,
                cells: state.cells.map(
                    cell => cell.id === action.data.id ? {
                        ...cell,
                        code: action.data.code
                    } : cell
                )
            };
        }
        case CLEAR_NOTEBOOK_STATE: {
            return {
                cells: []
            };
        }
        case RUN_MODE: {
            return {
                ...state,
                cells: state.cells.map(
                    cell => cell.id === action.cell.id ? {
                        ...cell,
                        ...action.cell
                    } : cell
                )
            }
        }
        case UPDATE_GRAPH: {
            return {
                ...state,
                cells: state.cells.map(
                    cell => {
                        if (cell.id === action.cellId) {
                            if (cell.result.type === 'EDGE') {
                                if (action.graph.edges !== null) {
                                    action.graph.edges.forEach(
                                        e => cell.result.data.push(e));
                                }
                            } else if (cell.result.type === 'VERTEX') {
                                if (action.graph.vertices !== null) {
                                    action.graph.vertices.forEach(
                                        v => cell.result.data.push(v));
                                }
                            }

                            if (action.graph.edges !== null) {
                                action.graph.edges.forEach(
                                    e => cell.result.graph.edges.push(e));
                            }
                            if (action.graph.vertices !== null) {
                                action.graph.vertices.forEach(
                                    v => cell.result.graph.vertices.push(v));
                            }
                        }
                        return cell;
                    }
                )
            };
        }
        default:
            return state;
    }
}

export function schema(state = null, action) {
    switch (action.type) {
        case SHOW_SCHEMA:
            return action.data;
        default:
            return state;
    }
}
