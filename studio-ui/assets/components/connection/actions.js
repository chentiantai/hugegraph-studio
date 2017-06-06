/**
 * @file Desciption:
 * @author huanghaiping(huanghaiping02@baidu.com)
 * Created on 17/6/5
 */
import React from 'react';


/*
 * action function
 */
export function showConnections(connections) {
    return {
        type: 'show',
        connections
    };
}
// export const addConnection = (newConnection) => ({
//     type: 'add',
//     newConnection
// });
export function editConnection(text) {
    return {
        type: 'edit',
        text
    };
}
export function deleteConnection(id) {
    return {
        type: 'delete',
        id
    };
}

export function addConnection(newConnection) {
    return dispatch => {
        dispatch(addConnectionRequest(newConnection));
        return fetch('/api/v1/connections')
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    alert('error');
                    console.error('Server Side Error；\r\nCode:' + response.status);
                }
            })
            .then(data => dispatch(addConnectionSuccess(newConnection, data)))
            .catch(err => {
                console.error(err);
            });
    };
}

export function addConnectionRequest(newConnection) {
    return {
        type: 'add_request',
        newConnection
    };
}
export function addConnectionSuccess(newConnection, data) {
    return {
        type: 'add_success',
        newConnection,
        data
    };
}
export function addConnectionFailure(newConnection) {
    return {
        type: 'add_failure',
        newConnection
    };
}

