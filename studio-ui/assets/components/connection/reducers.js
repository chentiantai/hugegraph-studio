/**
 * @file Desciption:
 * @author huanghaiping(huanghaiping02@baidu.com)
 * Created on 17/6/5
 */
import {
    OPEN_CONNECTION_MODAL,
    CLOSE_CONNECTION_MODAL,
    ALERT_SHOW,
    ALERT_HIDE,
    SHOW,
    ADD_SUCCESS,
    DELETE_SUCCESS,
    UPDATE_SUCCESS
} from './actions';


const initialState = {
    connections: [],
    modalInfo: {
        validation: true,
        title: '',
        operation: '',
        isOpen: false,
        connection: {
            id: '',
            name: '',
            graphName: '',
            connectionHost: '',
            port: ''
        }
    },
    alerts: {
        items: [],
        lastKey: -1
    }
};


export function connectionsOperation(state = initialState, action) {
    return {
        connections: connections(state.connections, action),
        modalInfo: modalInfo(state.modalInfo, action),
        alerts: alerts(state.alerts, action)
    };
}


function modalInfo(state = {}, action) {
    switch (action.type) {
        case OPEN_CONNECTION_MODAL:
            return {
                ...state,
                isOpen: true,
                operation: action.operation,
                title: action.title,
                connection: action.connection
            };
        case CLOSE_CONNECTION_MODAL:
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


function connections(state = [], action) {
    switch (action.type) {
        case SHOW: {
            return JSON.parse(JSON.stringify(action.connections));
        }
        case ADD_SUCCESS: {
            return [
                ...state,
                action.newConnection
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
