/**
 * @file Desciption:
 * @author liunanke(liunanke@baidu.com)
 * Created on 17/6/6
 */

export const OPEN_NOTECARD_MODAL = 'open_notecard_modal';
export const CLOSE_NOTECARD_MODAL = 'close_notecard_modal';
export const ALERT_SHOW = 'alert_show';
export const ALERT_HIDE = 'alert_hide';


export function openNoteCardModal(noteCard, operation, title) {
    return {
        type: OPEN_NOTECARD_MODAL,
        noteCard,
        operation,
        title
    };
}


export function closeNoteCardModal(noteCard, operation, title) {
    return {
        type: CLOSE_NOTECARD_MODAL
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