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
    ADD_NOTE_CARD_SUCCESS,
    SHOW_NOTE_CARDS,
    DELETE_NOTE_CARD_SUCCESS,
    UPDATE_NOTE_CARD_SUCCESS
} from './actions';

export function noteCards(state, action) {
    switch (action.type) {
        case ADD_NOTE_CARD_SUCCESS:
            return [
                action.noteCard,
                ...state
            ];
        case SHOW_NOTE_CARDS:
            return [...action.noteCards];
        case DELETE_NOTE_CARD_SUCCESS: {
            return state.filter(noteCard => noteCard.id !== action.id);
        }
        case UPDATE_NOTE_CARD_SUCCESS: {
            const noteCardArr = [];
            state.map(noteCard => {
                if (noteCard.id !== action.noteCard.id) {
                    noteCardArr.push(noteCard);
                } else {
                    noteCardArr.push(action.noteCard);
                }
            });
            return noteCardArr;
        }
        default:
            return state;
    }
}
