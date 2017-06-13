/**
 * @file Desciption:
 * @author liunanke(liunanke@baidu.com)
 * Created on 17/6/6
 */
export function showNotebooks(notebooks) {
    return {
        type: 'show',
        notebooks
    };
}

export function openEditModal(notebooks, operation, title) {
    return {
        type: 'open_edit_modal',
        notebooks,
        operation,
        title
    };
}

export function closeEditModal() {
    return {
        type: 'close_edit_modal'
    };
}

export function refreshModal(notebooks) {
    return {
        type: 'refresh_edit_modal',
        notebooks
    };
}

export function saveNotebooks(modalInfo) {
    return dispatch => {
        alert("dagagagagag");
        if (modalInfo.operation === 'update') {
            dispatch(updateNotebooks(modalInfo.notebooks));
        } else {
            dispatch(addNotebooks(modalInfo.notebooks));
        }
    };
}

export function getConnectionName() {

    return dispatch => {
        return fetch('/api/v1/connections')
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    alert('error');
                    console.error('Server Side Error；\r\nCode:' + response.status);
                }
            })
            .then(data => {
                this.props.showConnections(data);
            })
            .catch(err => {
                console.error(err);
            });
    }
}

export function updateNotebooks(notebooks) {
    let myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    return dispatch => {
        return fetch('/api/v1/notebooks/' + notebooks.id,
            {
                method: 'PUT',
                body: JSON.stringify(notebooks),
                headers: myHeaders
            })
            .then(response => {
                if (response.ok) {
                    dispatch(updateNotebooksSuccess(notebooks));
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
export function updateNotebooksSuccess(notebooks) {
    return {
        type: 'update_success',
        notebooks
    };
}


export function addNotebooks(newNotebooks) {
    let myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    return dispatch => {
        dispatch(addNotebooksRequest(newNotebooks));
        return fetch('/api/v1/notebooks',

            {
                method: 'POST',
                body: JSON.stringify(newNotebooks),
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
                dispatch(addNotebooksSuccess(data));
            })
            .catch(err => {
                console.error(err);
            });
    };
}

export function addNotebooksRequest(newNotebooks) {
    return {
        type: 'add_request',
        newNotebooks
    };
}
export function addNotebooksSuccess(newNotebooks) {
    return {
        type: 'add_success',
        newNotebooks
    };
}
export function addNotebooksFailure(newNotebooks) {
    return {
        type: 'add_failure',
        newNotebooks
    };
}


export function deleteNotebooks(id) {
    let myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    return dispatch => {
        return fetch('/api/v1/notebooks/' + id,
            {
                method: 'DELETE'
            })
            .then(response => {
                if (response.ok) {
                    dispatch(deleteNotebooksSuccess(id));
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
export function deleteNotebooksSuccess(id) {
    return {
        type: 'delete_success',
        id
    };
}