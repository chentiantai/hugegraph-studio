/*
 * Copyright 2017 HugeGraph Authors
 *
 * Licensed to the Apache Software Foundation (ASF) under one or more
 * contributor license agreements. See the NOTICE file distributed with this
 * work for additional information regarding copyright ownership. The ASF
 * licenses this file to You under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations
 * under the License.
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
                dispatch(alertMessage('Load Connections Fetch Exception:' + err,
                                      'danger'));
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
                dispatch(
                    alertMessage('Update Connection Fetch Exception:' + err,
                                 'danger')
                );
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
                dispatch(alertMessage('Add Connection Fetch Exception:' + err,
                                      'danger'));
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
                // Avoid the case : when the response is null
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

export function alertMessage(messageText, messageType, delay = 1000) {
    let msgContent = 'messageText must be string type and messageType must ' +
                     'be either [%s, %s, %s, %s]';
    let msgType = ['success', 'warning', 'danger', 'info'];
    return (dispatch, getState) => {
        if (typeof messageText === 'string' &&
            msgType.indexOf(messageType) > -1) {
            const key = getState().alerts.lastKey + 1;
            dispatch(hideAllAlert(0));
            dispatch(alertShow(messageText, messageType, key));
            if (messageType === 'danger') {
                // setTimeout(() => dispatch(alertHide(key)), 20000);
            } else if (messageType === 'warning') {
                setTimeout(() => dispatch(alertHide(key)), 5000);
            } else {
                setTimeout(() => dispatch(alertHide(key)), delay);
            }
        } else {
            console.error(msgContent, ...msgType);
        }
    };
}

export function hideAllAlert(delay = 0) {
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
