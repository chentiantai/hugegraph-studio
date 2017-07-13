/**
 * @file Desciption:
 * @author huanghaiping(huanghaiping02@baidu.com)
 * Created on 17/6/27
 */

import {connections, alerts} from './connection/reducers';
import {noteCards} from  './notebooksApp/reducers';

import {notebook, schema} from './notebook/reducers';
import {CHANGE_HEAD_MODE, CHANGE_LOADING_MODE} from './actions';

const initialState = {
        noteCards: [],
        connections: [],
        alerts: {
            items: [],
            lastKey: -1
        },
        headMode: {
            studioHeadName: 'HugeGraph NoteBook Quick Start',
            fullScreen: false,
            cellId: ''
        },
        notebook: {
            cells: []
        },
        loadingMode: {
            loading: false,
            cellId: ''
        },
        schema: null
    }
;


export function operation(state = initialState, action) {
    return {
        connections: connections(state.connections, action),
        alerts: alerts(state.alerts, action),
        noteCards: noteCards(state.noteCards, action),
        headMode: headMode(state.headMode, action),
        notebook: notebook(state.notebook, action),
        loadingMode: loadingMode(state.loadingMode, action),
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

function loadingMode(state = {}, action) {
    switch (action.type) {
        case CHANGE_LOADING_MODE:
            return action.mode;
        default:
            return state;
    }
}
