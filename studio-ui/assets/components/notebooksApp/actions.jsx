/**
 * @file Desciption:
 * @author liunanke(liunanke@baidu.com)
 * Created on 17/6/6
 */

import {alertMessage} from '../connection/actions';
import {changeHeadMode} from '../actions';
export const ADD_NOTE_CARD_SUCCESS = 'add_note_card_success';
export const SHOW_NOTE_CARDS = 'show_note_cards';
export const DELETE_NOTE_CARD_SUCCESS = 'delete_note_card_success';
export const UPDATE_NOTE_CARD_SUCCESS = 'update_note_card_success';


export function deleteNoteCard(id) {
    let myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    let url = '/api/v1/notebooks/' + id;
    return dispatch => {
        return fetch(url,
            {
                method: 'DELETE'
            })
            .then(checkStatus)
            .then(() => {
                dispatch(deleteNoteCardSuccess(id));
                dispatch(alertMessage('Delete NoteCard Success', 'success'));
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
    let url = '/api/v1/notebooks';
    return dispatch => {
        return fetch(url)
            .then(checkStatus)
            .then(parseJSON)
            .then(data => {
                dispatch(showNoteCards(data));
                dispatch(changeHeadMode({
                    fullScreen: false
                }));
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
    let url = '/api/v1/notebooks/' + noteCard.id;
    return dispatch => {
        return fetch(url,
            {
                method: 'PUT',
                body: JSON.stringify(noteCard),
                headers: myHeaders
            })
            .then(checkStatus)
            .then(parseJSON)
            .then(data => {
                dispatch(updateNoteCardSuccess(data));
                dispatch(alertMessage('Update NoteCard Success', 'success'));
            })
            .catch(err => {
                dispatch(alertMessage('Update NoteCard Fetch Exception:' + err, 'danger'));
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
    let url = '/api/v1/notebooks';
    return dispatch => {
        return fetch(url,
            {
                method: 'POST',
                body: JSON.stringify(noteCard),
                headers: myHeaders
            })
            .then(checkStatus)
            .then(parseJSON)
            .then(data => {
                dispatch(addNoteCardSuccess(data));
                dispatch(alertMessage('Add NoteCard Success', 'success'));
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

