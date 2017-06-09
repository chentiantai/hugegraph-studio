/**
 * @file Desciption:
 * @author huanghaiping(huanghaiping02@baidu.com)
 * Created on 17/6/5
 */

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
    }

};

export function connectionsOperation(state = initialState, action) {
    switch (action.type) {
        case 'show': {
            const newstate = JSON.parse(JSON.stringify(state));
            newstate.connections = action.connections;
            return newstate;
        }
        case 'add_success': {
            return Object.assign({}, state, {
                connections: [
                    ...state.connections,
                    action.newConnection
                ],
                modalInfo: Object.assign({}, state.modalInfo, {isOpen: false})
            });
        }
        case 'delete_success': {
            const connectionsArr = [];
            // Deep Clone
            const newstate = JSON.parse(JSON.stringify(state));
            newstate.connections.map(connection => {
                if (connection.id !== action.id) {
                    connectionsArr.push(connection);
                }
            });
            newstate.connections = connectionsArr;
            return newstate;
        }


        case 'open_edit_modal': {
            const newstate = JSON.parse(JSON.stringify(state));
            newstate.modalInfo.isOpen = true;
            newstate.modalInfo.operation = action.operation;
            newstate.modalInfo.title = action.title;
            if (action.operation === 'update') {
                newstate.modalInfo.connection = action.connection;
            } else {
                newstate.modalInfo.connection = action.connection;
            }
            return newstate;
        }
        case 'close_edit_modal': {
            const newstate = JSON.parse(JSON.stringify(state));
            newstate.modalInfo.isOpen = false;
            return newstate;
        }
        case 'refresh_edit_modal': {
            const newstate = JSON.parse(JSON.stringify(state));
            newstate.modalInfo.connection = action.connection;
            return newstate;
        }
        case 'update_success': {
            const connectionsArr = [];
            const newstate = JSON.parse(JSON.stringify(state));
            newstate.connections.map(connection => {
                if (connection.id !== action.connection.id) {
                    connectionsArr.push(connection);
                } else {
                    connectionsArr.push(action.connection);
                }
            });
            newstate.connections = connectionsArr;
            newstate.modalInfo.isOpen = false;
            return newstate;
        }
        default:
            return state;
    }
}

