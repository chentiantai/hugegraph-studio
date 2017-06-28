/**
 * @file Desciption:
 * @author huanghaiping(huanghaiping02@baidu.com)
 * Created on 17/6/5
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
                items: state.items.filter(item => (item.key !== action.payload.key))
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
