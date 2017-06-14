/**
 * @file Desciption:
 * @author liunanke(liunanke@baidu.com)
 * Created on 17/6/6
 */

import {OPEN_NOTECARD_MODAL, CLOSE_NOTECARD_MODAL, ALERT_HIDE, ALERT_SHOW} from './actions';

const initialState = {
    cardModalInfo: {
        title: '',
        operation: '',
        isOpen: false,
        noteCard: {
            id: '',
            name: '',
            connectionName: ''
        }
    },
    alerts: {
        items: [],
        lastKey: -1
    }

};

export function notebooksOperation(state = initialState, action) {
    return {
        cardModalInfo: cardModalInfo(state.cardModalInfo, action),
        alerts: alerts(state.alerts, action)
    };
}


function cardModalInfo(state, action) {
    switch (action.type) {
        case OPEN_NOTECARD_MODAL:
            return {
                ...state,
                isOpen: true,
                operation: action.operation,
                title: action.title,
                noteCard: action.noteCard

            };
        case CLOSE_NOTECARD_MODAL:
            return {
                ...state,
                isOpen: false
            };
        default:
            return state;
    }

}


function alerts(state = {items: [], lastKey: -1}, action) {
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
                items: state.items.filter(item => (item.key !== action.payload.key))
            };
        default:
            return state;
    }
}