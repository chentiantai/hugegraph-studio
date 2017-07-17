/**
 * @file Desciption:
 * @author huanghaiping(huanghaiping02@baidu.com)
 * Created on 17/6/5
 */
import {alertMessage} from '../connection/actions';
import {changeHeadMode, changeLoadingMode} from '../actions';
import {updateNoteCard} from '../notebooksApp/actions';

export const ADD_ITEM = 'add_item';
export const DELETE_ITEM = 'delete_item';
export const SHOW_NOTEBOOK = 'show_notebook';
export const UPDATE_ITEM = 'update_item';
export const CLEAR_NOTEBOOK_STATE = 'clear_notebook_state';
export const RUN_MODE = 'run_mode';
export const SHOW_SCHEMA = 'show_schema';
export const SYCN_ITEM = 'sycn_item';


export function runModeSuccess(cell) {
    return {
        type: RUN_MODE,
        cell
    }
}

export function updateNoteBook(notebook) {
    // TODO updateNoteCard(notebook);
}


export function clearNotebookState() {
    return {
        type: CLEAR_NOTEBOOK_STATE

    };

}

export function showCells(data) {
    return {
        type: SHOW_NOTEBOOK,
        notebook: data
    };
}

export function addItemSuccess(data, position) {
    return {
        type: ADD_ITEM,
        newCell: data,
        position
    };
}

export function updateItemSuccess(data) {
    return {
        type: UPDATE_ITEM,
        data
    };
}


export function sycnItemState(data) {
    return {
        type: SYCN_ITEM,
        data
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
    let url = '/api/v1/notebooks/' + notebookId;
    return dispatch => {
        return fetch(url)
            .then(checkStatus)
            .then(parseJSON)
            .then(data => {
                dispatch(showCells(data));
                dispatch(changeHeadMode({
                    studioHeadName: data.name,
                    fullScreen: false
                }));
            })
            .catch(err => {
                dispatch(alertMessage('Load Cells Fetch Exception:' + err, 'danger'));
            });
    };
}

export function addItem(notebookId, position) {
    let myHeaders = new Headers();
    let initItem = {'code': '', 'language': 'gremlin'};
    myHeaders.append('Content-Type', 'application/json');
    let url = '/api/v1/notebooks/' + notebookId + '/cells?position=' + position;
    return dispatch => {
        return fetch(url,
            {
                method: 'POST',
                body: JSON.stringify(initItem),
                headers: myHeaders
            })
            .then(checkStatus)
            .then(parseJSON)
            .then(data => {
                dispatch(addItemSuccess(data, position));
            })
            .catch(err => {
                dispatch(alertMessage('Add NotebookID Fetch Exception:' + err, 'danger'));
            });
    };
}

export function deleteItem(notebookId, cellId) {
    let myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    let url = '/api/v1/notebooks/' + notebookId + '/cells/' + cellId;
    return dispatch => {
        return fetch(url,
            {
                method: 'DELETE'
            })
            .then(response => {
                if (response.status >= 200 && response.status < 300) {
                    dispatch(deleteItemSuccess(cellId));
                } else {
                    let error = new Error(response.statusText);
                    error.status = response.status;
                    throw error
                }
            })
            .catch(err => {
                dispatch(alertMessage('Delete NotebookItem Fetch Exception:' + err, 'danger'));
            });
    };
}

export function updateItem(itemContent, notebookId, itemId, runFlag) {
    let myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    let url = '/api/v1/notebooks/' + notebookId + '/cells/' + itemId;
    return dispatch => {
        return fetch(url,
            {
                method: 'PUT',
                body: JSON.stringify(itemContent),
                headers: myHeaders
            })
            .then(checkStatus)
            .then(parseJSON)
            .then(data => {
                if (runFlag) {
                    dispatch(runMode(notebookId, itemId));
                }
                dispatch(updateItemSuccess(data));
            })
            .catch(err => {
                console.log('Update NotebookItem Fetch Exception');
                // dispatch(alertMessage('Update NotebookItem Fetch Exception:' + err, 'danger'));
            });
    };
}

export function runMode(notebookId, itemId) {
    let myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    let url = '/api/v1/notebooks/' + notebookId + '/cells/' + itemId + '/execute';
    return dispatch => {
        return fetch(url)
            .then(checkStatus)
            .then(parseJSON)
            .then(data => {
                let cell = {
                    id: itemId,
                    status: 200,
                    msg: 'success',
                    result: data
                }
                dispatch(runModeSuccess(cell));
                dispatch(changeLoadingMode({
                    loading: false,
                    cellId: cell.id
                }));
            })
            .catch(err => {
                let cell = {
                    id: itemId,
                    status: err.status,
                    msg: err.message,
                    result: null
                }
                dispatch(runModeSuccess(cell));
                dispatch(changeLoadingMode({
                    loading: false,
                    cellId: cell.id
                }));
            });
    };
}

export function showSchema(connectionId) {
    let myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    let url = '/api/v1/connections/' + connectionId + '/schema';
    return dispatch => {
        return fetch(url)
            .then(checkStatus)
            .then(parseJSON)
            .then(data => {
                dispatch(showSchemaSuccess(data));
            })
            .catch(err => {
                dispatch(alertMessage('Show Schema Fetch Exception:' + err, 'danger'));
            });
    };
}

export function showSchemaSuccess(data) {
    return {
        type: SHOW_SCHEMA,
        data
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







