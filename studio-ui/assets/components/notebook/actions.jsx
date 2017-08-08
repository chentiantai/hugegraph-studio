/**
 * @file Desciption:
 * @author huanghaiping(huanghaiping02@baidu.com)
 * Created on 17/6/5
 */
import {alertMessage} from '../connection/actions';
import {changeHeadMode} from '../actions';
import {HTTPSTATUS} from '../httpstatus';


export const ADD_ITEM = 'add_item';
export const DELETE_ITEM = 'delete_item';
export const SHOW_NOTEBOOK = 'show_notebook';
export const UPDATE_ITEM = 'update_item';
export const CLEAR_NOTEBOOK_STATE = 'clear_notebook_state';
export const RUN_MODE = 'run_mode';
export const SHOW_SCHEMA = 'show_schema';
export const SYCN_ITEM = 'sycn_item';
export const UPDATE_GRAPH = 'update_graph';


export function runMode(cell) {
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
                let existFullScreenCell = data.cells.some(cell => cell.viewSettings.fullScreen);
                dispatch(changeHeadMode({
                    fullScreen: existFullScreenCell
                }));
            })
            .catch(err => {
                dispatch(alertMessage('Load Cells Fetch Exception:' + err, 'danger'));
            });
    };
}

export function addItem(notebookId, position) {
    let myHeaders = new Headers();
    let initItem = {
        'code': '',
        'language': 'gremlin',
        'viewSettings': {'fullScreen': false, 'view': true}
    };
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

export function updateItem(notebookId, itemId, cell) {
    let myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    let url = '/api/v1/notebooks/' + notebookId + '/cells/' + itemId;
    return dispatch => {
        return fetch(url,
            {
                method: 'PUT',
                body: JSON.stringify(cell),
                headers: myHeaders
            })
            .then(checkStatus)
            .then(parseJSON)
            .then(data => {
                dispatch(updateItemSuccess(data));
            })
            .catch(err => {
                console.log('Update NotebookItem Fetch Exception');
                // dispatch(alertMessage('Update NotebookItem Fetch Exception:' + err, 'danger'));
            });
    };
}

export function executeCell(notebookId, itemId, cell) {
    let myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    let url = '/api/v1/notebooks/' + notebookId + '/cells/' + itemId + '/execute';
    return dispatch => {
        let responseStatus = {
            status: 200,
            statusText: 'ok'
        }
        return fetch(url,
            {
                method: 'PUT',
                body: JSON.stringify(cell),
                headers: myHeaders
            })
            .then(response => {
                responseStatus.status = response.status;
                responseStatus.statusText = response.statusText;
                return response.json();
            })
            .then(response => {
                if (responseStatus.status >= 200 && responseStatus.status < 300) {
                    return response
                } else {
                    let error = new Error(responseStatus.statusText);
                    error.response = response;
                    throw error
                }
            })
            .then(data => {
                let newCell = {
                    ...cell,
                    id: itemId,
                    status: 200,
                    msg: 'ok',
                    result: data
                }
                dispatch(runMode(newCell));
            })
            .catch(err => {
                if (responseStatus.statusText === '') {
                    responseStatus.statusText = HTTPSTATUS[responseStatus.status];
                }


                let newCell = {
                    ...cell,
                    id: itemId,
                    status: responseStatus.status,
                    msg: {
                        title: responseStatus.statusText,
                        detailedMsg: err.response
                    },
                    result: null
                }
                dispatch(runMode(newCell));
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


export function updateGraph(cellId, graph) {
    return {
        type: UPDATE_GRAPH,
        cellId,
        graph
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





