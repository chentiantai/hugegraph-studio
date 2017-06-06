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
    let myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    return dispatch => {
        return fetch('/api/v1/connections/' + id,
            {
                method: 'DELETE'
            })
            .then(response => {
                if (response.ok) {
                    dispatch(deleteConnectionSuccess(id));
                } else {
                    alert('error');
                    console.error('Server Side Error；\r\nCode:' + response.status);
                }
            })
            .catch(err => {
                console.error(err);
            });
    };
}


export function deleteConnectionSuccess(id) {
    return {
        type: 'delete_success',
        id
    };
}


export function addConnection(newConnection) {
    let myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    return dispatch => {
        dispatch(addConnectionRequest(newConnection));
        return fetch('/api/v1/connections',
            {
                method: 'POST',
                body: JSON.stringify(newConnection),
                headers: myHeaders
            })
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    alert('error');
                    console.error('Server Side Error；\r\nCode:' + response.status);
                }
            })
            .then(data => {
                dispatch(addConnectionSuccess(data));
            })
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
export function addConnectionSuccess(newConnection) {
    return {
        type: 'add_success',
        newConnection
    };
}
export function addConnectionFailure(newConnection) {
    return {
        type: 'add_failure',
        newConnection
    };
}

