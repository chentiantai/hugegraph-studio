/**
 * @file Desciption:
 * @author huanghaiping(huanghaiping02@baidu.com)
 * Created on 17/6/5
 */



export const SHOW = 'show';
export const UPDATE_SUCCESS = 'update_success';
export const ADD_REQUEST = 'add_request';
export const ADD_SUCCESS = 'add_success';
export const ADD_FAILURE = 'add_failure';
export const DELETE_SUCCESS = 'delete_success';
export const ALERT_SHOW = 'alert_show';
export const ALERT_HIDE = 'alert_hide';


export function loadConnections() {
    return dispatch => {
        return fetch('/api/v1/connections')
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    dispatch(alertMessage('Load Connection: Server Side Error；\r\nCode:' + response.status, 'danger'));
                }
            })
            .then(data => {
                dispatch(showConnections(data));
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
    return dispatch => {
        return fetch('/api/v1/connections/' + connection.id,
            {
                method: 'PUT',
                body: JSON.stringify(connection),
                headers: myHeaders
            })
            .then(response => {
                if (response.ok) {
                    dispatch(updateConnectionSuccess(connection));
                    dispatch(alertMessage('Update Connection Success', 'success'));
                } else {
                    dispatch(alertMessage('Update Connection:Server Side Error；\r\nCode:' + response.status, 'danger'));
                }
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
                    dispatch(alertMessage('Add Connection: Server Side Error；\r\nCode:' + response.status, 'danger'));
                }
            })
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
export function addConnectionFailure(newConnection) {
    return {
        type: ADD_FAILURE,
        newConnection
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
                    dispatch(alertMessage('Delete Connection Success', 'success'));
                } else {
                    dispatch(alertMessage('Delete Connection:Server Side Error；\r\nCode:' + response.status, 'danger'));
                }
            })
            .catch(err => {
                dispatch(alertMessage('Delete Connection Fetch Exception:' + err, 'danger'));
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

export function alertMessage(messageText, messageType, delay = 1500) {
    return (dispatch, getState) => {
        if (typeof messageText === 'string' && ['success', 'warning', 'danger', 'info'].indexOf(messageType) > -1) {
            const key = getState().alerts.lastKey + 1;
            dispatch(alertShow(messageText, messageType, key));
            if (messageType === 'danger') {
                // setTimeout(() => dispatch(alertHide(key)), 20000);
            } else {
                setTimeout(() => dispatch(alertHide(key)), delay);
            }
        } else {
            console.error('messageText must be string and messageType must be success, warning, danger, info');
        }
    };
}

export function hideAllAlert(delay = 1500) {
    return (dispatch, getState) => {
        getState().alerts.items.forEach(item => {
            setTimeout(() => {
                dispatch(alertHide(item.key));
            }, delay);
        });
    };
}

