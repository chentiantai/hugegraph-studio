/**
 * @file Desciption:
 * @author huanghaiping(huanghaiping02@baidu.com)
 * Created on 17/6/5
 */


export const ALERT_SHOW = 'alert_show';
export const ALERT_HIDE = 'alert_hide';
export const FULL_SCREEN = 'full_screen';


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

