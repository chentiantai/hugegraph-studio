/**
 * @file Desciption:
 * @author liunanke(liunanke@baidu.com)
 * Created on 17/6/6
 */

import {
    ALERT_HIDE,
    ALERT_SHOW,
    ADD_NOTE_CARD_SUCCESS,
    SHOW_NOTE_CARDS,
    DELETE_NOTE_CARD_SUCCESS,
    UPDATE_NOTE_CARD_SUCCESS
} from './actions';

// const initialState = {
//     noteCards: [],
//     alerts: {
//         items: [],
//         lastKey: -1
//     }
// };
//
// export function notebooksOperation(state = initialState, action) {
//     return {
//         noteCards: noteCards(state.noteCards, action),
//         alerts: alerts(state.alerts, action)
//     };
// }


export function noteCards(state, action) {
    switch (action.type) {
        case ADD_NOTE_CARD_SUCCESS:
            return [
                action.noteCard,
                ...state
            ];
        case SHOW_NOTE_CARDS:
            return [...action.noteCards];
        case DELETE_NOTE_CARD_SUCCESS: {
            return state.filter(noteCard => noteCard.id !== action.id);
        }
        case UPDATE_NOTE_CARD_SUCCESS: {
            const noteCardArr = [];
            state.map(noteCard => {
                if (noteCard.id !== action.noteCard.id) {
                    noteCardArr.push(noteCard);
                } else {
                    noteCardArr.push(action.noteCard);
                }
            });
            return noteCardArr;
        }
        default:
            return state;
    }
}


// export function alerts(state = {items: [], lastKey: -1}, action) {
//     switch (action.type) {
//         case ALERT_SHOW:
//             return {
//                 ...state,
//                 items: [...state.items, action.payload],
//                 lastKey: state.lastKey + 1
//             };
//         case ALERT_HIDE:
//             return {
//                 ...state,
//                 items: state.items.filter(item => (item.key !== action.payload.key))
//             };
//         default:
//             return state;
//     }
// }