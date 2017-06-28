/**
 * @file Desciption:
 * @author huanghaiping(huanghaiping02@baidu.com)
 * Created on 17/6/5
 */


export const ALERT_SHOW = 'alert_show';
export const ALERT_HIDE = 'alert_hide';
export const FULL_SCREEN = 'full_screen';
export const ADD_ITEM = 'add_item';
export const DELETE_ITEM = 'delete_item';
export const SHOW_NOTEBOOK = 'show_notebook';
export const SAVE_ITEMS = 'save_items';
export const UPDATE_ITEMS = 'update_items';


export function showCells(data) {
    return {
        type: SHOW_NOTEBOOK,
        cells: data.cells
    };
}

export function addItemSuccess(data, position) {
    return {
        type: ADD_ITEM,
        data,
        position
    };
}
//map to reducer
export function deleteItemSuccess(cellId) {
    return {
        type: DELETE_ITEM,
        cellId: cellId
    };
}

export function loadCells(notebookId) {
    return dispatch => {
        return fetch('/api/v1/notebooks/' + notebookId)
            .then(response => {
                if (response.ok) {

                    return response.json();
                } else {
                    dispatch(alertMessage('Load Cells: Server Side' +
                        ' Error；\r\nCode:' + response.status, 'danger'));
                }
            })
            .then(data => {
                dispatch(showCells(data));
            })
            .catch(err => {
                dispatch(alertMessage('Load Cells Fetch Exception:' + err, 'danger'));
            });
    };
}

export function addItem(notebookId, position) {
    let myHeaders = new Headers();
    let initItem = {"code": "g.V()", "language": "gremlin"};
    myHeaders.append('Content-Type', 'application/json');
    return dispatch => {
        return fetch('/api/v1/notebooks/' + notebookId + '/cells?position=' + position,
            {
                method: 'POST',
                body: JSON.stringify(initItem),
                headers: myHeaders
            })
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    dispatch(alertMessage('Add NotebookID: Server Side' +
                        ' Error；\r\nCode:' + response.status, 'danger'));
                }
            })
            .then(data => {
                dispatch(addItemSuccess(data, position));
                // dispatch(alertMessage('Add NoteCard Success', 'success'));
            })
            .catch(err => {
                dispatch(alertMessage('Add NotebookID Fetch Exception:' + err, 'danger'));
            });
    };
}

export function deleteItem(notebookId, cellId) {
    let myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    return dispatch => {
        return fetch('/api/v1/notebooks/' + notebookId + '/cells/' + cellId,
            {
                method: 'DELETE'
            })
            .then(response => {
                if (response.ok) {
                    dispatch(deleteItemSuccess(cellId));
                } else {
                    dispatch(alertMessage('Delete NotebookItem:Server Side' +
                        ' Error；\r\nCode:' + response.status, 'danger'));
                }
            })
            .catch(err => {
                dispatch(alertMessage('Delete NotebookItem Fetch Exception:' + err, 'danger'));
            });
    };
}

//
// export function saveItems(cell) {
//     return {
//         type: SAVE_ITEMS,
//         cell
//     };
// }
//
// export function updateItems(cell) {
//     return {
//         type: UPDATE_ITEMS,
//         cell
//     };
// }

export function itemScreenMode(flag, itemKey) {
    return {
        type: FULL_SCREEN,
        flag: flag,
        itemKey: itemKey
    }
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

