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

import {connections, alerts} from './connection/reducers';
import {noteCards} from  './notebooksApp/reducers';

import {notebook, schema} from './notebook/reducers';
import {CHANGE_HEAD_MODE} from './actions';

const initialState = {
    noteCards: [],
    connections: [],
    alerts: {
        items: [],
        lastKey: -1
    },
    headMode: {
        studioHeadName: 'HugeGraph NoteBook Quick Start',
        fullScreen: false
    },
    notebook: {
        cells: []
    },
    schema: null
};

export function operation(state = initialState, action) {
    return {
        connections: connections(state.connections, action),
        alerts: alerts(state.alerts, action),
        noteCards: noteCards(state.noteCards, action),
        headMode: headMode(state.headMode, action),
        notebook: notebook(state.notebook, action),
        schema: schema(state.schema, action)
    };
}

function headMode(state = {}, action) {
    switch (action.type) {
        case CHANGE_HEAD_MODE:
            return {
                ...state,
                ...action.mode
            };
        default:
            return state;
    }
}
