/**
 * @file Desciption:
 * @author huanghaiping(huanghaiping02@baidu.com)
 * Created on 17/6/5
 */
import {alertMessage} from '../connection/actions';
import {changeHeadMode} from '../actions';
export const ADD_ITEM = 'add_item';
export const DELETE_ITEM = 'delete_item';
export const SHOW_NOTEBOOK = 'show_notebook';
export const UPDATE_ITEM = 'update_item';
export const CLEAR_NOTEBOOK_STATE = 'clear_notebook_state';


export function updateNoteBook(notebook) {
    //TODO
}



export function clearNotebookState() {
    return {
        type: CLEAR_NOTEBOOK_STATE

    }

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
        data,
        position
    };
}

export function updateItemSuccess(data) {
    return {
        type: UPDATE_ITEM,
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

export function updateItem(itemContent, notebookId, itemId) {
    let myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    return dispatch => {
        return fetch('/api/v1/notebooks/' + notebookId + '/cells/' + itemId,
            {
                method: 'PUT',
                body: JSON.stringify(itemContent),
                headers: myHeaders
            })
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    dispatch(alertMessage('Update NotebookItem: Server Side' +
                        ' Error；\r\nCode:' + response.status, 'danger'));
                }
            })
            .then(data => {
                console.log(JSON.stringify(data));
                dispatch(updateItemSuccess(data));
            })
            .catch(err => {
                dispatch(alertMessage('Update NotebookItem Fetch Exception:' + err, 'danger'));
            });
    };
}



