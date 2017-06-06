/**
 * @file Desciption:
 * @author huanghaiping(huanghaiping02@baidu.com)
 * Created on 17/6/5
 */

const initialState = {
    connections: []
};

// const initialState = {
//     connections: [
//         {
//             "id": "2a6a437c-4f0c-44ae-9ba3-192b10ec7d64",
//             "name": "demo2",
//             "port": 83,
//             "graphName": "Hugegraph",
//             "connectionHost": "127.0.01"
//         },
//         {
//             "id": "bb86a266-c3e0-4d3f-9e72-80d3c9e6fb2b",
//             "name": "demo",
//             "port": 80,
//             "graphName": "Hugegraph",
//             "connectionHost": "127.0.01"
//         }
//     ]
// };

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
                ]
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
        default:
            return state;
    }
}

