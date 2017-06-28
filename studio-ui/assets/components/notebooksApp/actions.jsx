/**
 * @file Desciption:
 * @author liunanke(liunanke@baidu.com)
 * Created on 17/6/6
 */

import {alertMessage} from '../connection/actions';

export const ADD_NOTE_CARD_SUCCESS = 'add_note_card_success';
export const SHOW_NOTE_CARDS = 'show_note_cards';
export const DELETE_NOTE_CARD_SUCCESS = 'delete_note_card_success';
export const UPDATE_NOTE_CARD_SUCCESS = 'update_note_card_success';


export function deleteNoteCard(id) {
    let myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    return dispatch => {
        return fetch('/api/v1/notebooks/' + id,
            {
                method: 'DELETE'
            })
            .then(response => {
                if (response.ok) {
                    dispatch(deleteNoteCardSuccess(id));
                    // dispatch(alertMessage('Delete NoteCard Success', 'success'));
                } else {
                    dispatch(alertMessage('Delete NoteCard:Server Side Error；\r\nCode:' + response.status, 'danger'));
                }
            })
            .catch(err => {
                dispatch(alertMessage('Delete NoteCard Fetch Exception:' + err, 'danger'));
            });
    };
}

export function deleteNoteCardSuccess(id) {
    return {
        type: DELETE_NOTE_CARD_SUCCESS,
        id
    };
}

export function loadNoteCards() {
    return dispatch => {
        return fetch('/api/v1/notebooks')
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    dispatch(alertMessage('Load Notebooks: Server Side Error；\r\nCode:' + response.status, 'danger'));
                }
            })
            .then(data => {
                dispatch(showNoteCards(data));
            })
            .catch(err => {
                dispatch(alertMessage('Load Notebooks Fetch Exception:' + err, 'danger'));
            });
    };
}


export function showNoteCards(noteCards) {
    return {
        type: SHOW_NOTE_CARDS,
        noteCards
    };
}


export function saveNoteCard(modalInfo) {
    return dispatch => {
        if (modalInfo.operation === 'update') {
            dispatch(updateNoteCard(modalInfo.noteCard));
        } else {
            dispatch(addNoteCard(modalInfo.noteCard));
        }
    };
}


export function updateNoteCard(noteCard) {
    let myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    return dispatch => {
        return fetch('/api/v1/notebooks/' + noteCard.id,
            {
                method: 'PUT',
                body: JSON.stringify(noteCard),
                headers: myHeaders
            })
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    dispatch(alertMessage('Update NoteCard:Server Side Error；\r\nCode:' + response.status, 'danger'));
                }
            })
            .then(data => {
                dispatch(updateNoteCardSuccess(data));
                // dispatch(alertMessage('Update NoteCard Success', 'success'));
            })
            .catch(err => {
                dispatch(alertMessage('Test114 :Update NoteCard Fetch Exception:' + err, 'danger'));

            });
    };
}

export function updateNoteCardSuccess(noteCard) {
    return {
        type: UPDATE_NOTE_CARD_SUCCESS,
        noteCard
    };
}


export function addNoteCard(noteCard) {
    let myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    return dispatch => {
        return fetch('/api/v1/notebooks',
            {
                method: 'POST',
                body: JSON.stringify(noteCard),
                headers: myHeaders
            })
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    dispatch(alertMessage('Add NoteCard: Server Side Error；\r\nCode:' + response.status, 'danger'));
                }
            })
            .then(data => {
                dispatch(addNoteCardSuccess(data));
            })
            .catch(err => {
                dispatch(alertMessage('Add noteCard Fetch Exception:' + err, 'danger'));
            });
    };
}


export function addNoteCardSuccess(noteCard) {
    return {
        type: ADD_NOTE_CARD_SUCCESS,
        noteCard
    };
}

//
//
// export function alertShow(messageText, messageType, key) {
//     return {
//         type: ALERT_SHOW,
//         payload: {
//             messageText, messageType, key
//         }
//     };
// }
//
// export function alertHide(key) {
//     return {
//         type: ALERT_HIDE,
//         payload: {key}
//     };
// }
//
// export function alertMessage(messageText, messageType, delay = 1500) {
//     return (dispatch, getState) => {
//         if (typeof messageText === 'string' && ['success', 'warning', 'danger', 'info'].indexOf(messageType) > -1) {
//             const key = getState().alerts.lastKey + 1;
//             dispatch(alertShow(messageText, messageType, key));
//             if (messageType !== 'danger') {
//                 setTimeout(() => dispatch(alertHide(key)), delay);
//             }
//         } else {
//             console.error('messageText must be string and messageType must be success, warning, danger, info');
//         }
//     };
// }
//
// export function hideAllAlert(delay = 1500) {
//     return (dispatch, getState) => {
//         getState().alerts.items.forEach(item => {
//             setTimeout(() => {
//                 dispatch(alertHide(item.key));
//             }, delay);
//         });
//     };
// }