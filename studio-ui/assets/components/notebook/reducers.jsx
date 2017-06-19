/**
 * @file Desciption:
 * @author huanghaiping(huanghaiping02@baidu.com)
 * Created on 17/6/5
 */
import {
    ALERT_SHOW,
    ALERT_HIDE,
    FULL_SCREEN
} from './actions';


const initialState = {
    screenMode: {
        fullScreen: false,
        itemKey: 0
    },
    alerts: {
        items: [],
        lastKey: -1
    }
};


export function notebookOperation(state = initialState, action) {
    return {
        screenMode: screenMode(state.screenMode, action),
        alerts: alerts(state.alerts, action)
    };
}


function screenMode(state = {fullScreen: false, itemKey: 0}, action) {
    switch (action.type) {
        case FULL_SCREEN:
            return {
                ...state,
                fullScreen: action.flag,
                itemKey: action.itemKey
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


