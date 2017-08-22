/**
 * @file Desciption:
 * @author huanghaiping(huanghaiping02@baidu.com)
 * Created on 17/6/5
 */

import {changeHeadMode} from '../actions';
export const SHOW = 'show';
export const UPDATE_SUCCESS = 'update_success';
export const ADD_REQUEST = 'add_request';
export const ADD_SUCCESS = 'add_success';
export const DELETE_SUCCESS = 'delete_success';
export const ALERT_SHOW = 'alert_show';
export const ALERT_HIDE = 'alert_hide';

export function loadConnections() {
    let url = '/api/v1/connections';
    return dispatch => {
        return fetch(url)
            .then(checkStatus)
            .then(parseJSON)
            .then(data => {
                dispatch(showConnections(data));
                dispatch(changeHeadMode({
                    fullScreen: false
                }));
            })
            .catch(err => {
                dispatch(alertMessage('Load Connections Fetch Exception:' + err, 'danger'));
            });
    };
}

export function showConnections(connections) {
    return {
        type: SHOW,
        connections
    };
}

export function saveConnection(modalInfo) {
    return dispatch => {
        if (modalInfo.operation === 'update') {
            dispatch(updateConnection(modalInfo.connection));
        } else {
            dispatch(addConnection(modalInfo.connection));
        }
    };
}

export function updateConnection(connection) {
    let myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    let url = '/api/v1/connections/' + connection.id;
    return dispatch => {
        return fetch(url,
            {
                method: 'PUT',
                body: JSON.stringify(connection),
                headers: myHeaders
            })
            .then(checkStatus)
            .then(() => {
                dispatch(updateConnectionSuccess(connection));
                dispatch(alertMessage('Update Connection Success', 'success'));
            })
            .catch(err => {
                dispatch(alertMessage('Update Connection Fetch Exception:' + err, 'danger'));

            });
    };
}

export function updateConnectionSuccess(connection) {
    return {
        type: UPDATE_SUCCESS,
        connection
    };
}

export function addConnection(newConnection) {
    let myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    let url = '/api/v1/connections';
    return dispatch => {
        dispatch(addConnectionRequest(newConnection));
        return fetch(url,
            {
                method: 'POST',
                body: JSON.stringify(newConnection),
                headers: myHeaders
            })
            .then(checkStatus)
            .then(parseJSON)
            .then(data => {
                dispatch(addConnectionSuccess(data));
                dispatch(alertMessage('Add Connection Success', 'success'));
            })
            .catch(err => {
                dispatch(alertMessage('Add Connection Fetch Exception:' + err, 'danger'));
            });
    };
}

export function addConnectionRequest(newConnection) {
    return {
        type: ADD_REQUEST,
        newConnection
    };
}

export function addConnectionSuccess(newConnection) {
    return {
        type: ADD_SUCCESS,
        newConnection
    };
}

// export function addConnectionFailure(newConnection) {
//     return {
//         type: ADD_FAILURE,
//         newConnection
//     };
// }

export function deleteConnection(id) {
    let myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    let url = '/api/v1/connections/' + id;
    return dispatch => {
        return fetch(url,
            {
                method: 'DELETE'
            })
            .then(response => {
                // avoid the case : when the response is null
                if (response.status > 400)
                    return response.json();
                else
                    return response;
            })
            .then(response => {
                if (response.status >= 200 && response.status < 300) {
                    return response
                } else {
                    let error = new Error(response.message);
                    error.status = response.status;
                    throw error
                }
            })
            .then(() => {
                dispatch(deleteConnectionSuccess(id));
                dispatch(alertMessage('Delete Connection Success', 'success'));
            })
            .catch(err => {
                dispatch(alertMessage('Danger: ' + err.message, 'danger'));
            });
    };
}


export function deleteConnectionSuccess(id) {
    return {
        type: DELETE_SUCCESS,
        id
    };
}


export function alertShow(messageText, messageType, key) {
    return {
        type: ALERT_SHOW,
        payload: {
            messageText, messageType, key
        }
    };
}

export function alertHide(key) {
    return {
        type: ALERT_HIDE,
        payload: {key}
    };
}

// TODO: Please add comments for why delay should be 1000 and make (success, warning..) as a variable.
export function alertMessage(messageText, messageType, delay = 1000) {
    return (dispatch, getState) => {
        if (typeof messageText === 'string' && ['success', 'warning', 'danger', 'info'].indexOf(messageType) > -1) {
            const key = getState().alerts.lastKey + 1;
            dispatch(alertShow(messageText, messageType, key));
            if (messageType === 'danger') {
                // setTimeout(() => dispatch(alertHide(key)), 20000);
            } else if (messageType === 'warning') {
                setTimeout(() => dispatch(alertHide(key)), 5000);
            } else {
                setTimeout(() => dispatch(alertHide(key)), delay);
            }
        } else {
            console.error('messageText must be string type and messageType must be either [%s, %s, %s, %s]', 'success', 'warning', 'danger', 'info');
        }
    };
}

// TODO: Please add comments for why delay should be 1500.
export function hideAllAlert(delay = 1500) {
    return (dispatch, getState) => {
        getState().alerts.items.forEach(item => {
            setTimeout(() => {
                dispatch(alertHide(item.key));
            }, delay);
        });
    };
}

function checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
        return response
    } else {
        let error = new Error(response.statusText);
        error.status = response.status;
        throw error
    }
}

function parseJSON(response) {
    return response.json()
}
