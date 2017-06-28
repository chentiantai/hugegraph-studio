/**
 * @file Desciption:
 * @author huanghaiping(huanghaiping02@baidu.com)
 * Created on 17/6/5
 */
import {
    ALERT_SHOW,
    ALERT_HIDE,
    FULL_SCREEN,
    ADD_ITEM,
    SHOW_NOTEBOOK,
    DELETE_ITEM,
    SAVE_ITEMS,
    UPDATE_ITEMS
} from './actions';


const initialState = {
    screenMode: {
        fullScreen: false,
        itemKey: 0
    },
    alerts: {
        items: [],
        lastKey: -1
    },
    cells: []

};

export function cells(state = [], action) {

    switch (action.type) {
        case ADD_ITEM:
            var newCell = {
                id: action.data.id,
                language: action.data.language,
                code: action.data.code
            };
            state.splice(action.position, 0, newCell);
            return [
                ...state
            ];
        case SHOW_NOTEBOOK:
            return [...action.cells];
        case DELETE_ITEM:
            return state.filter(cell => cell.id !== action.cellId);
        // case SAVE_ITEMS:
        // case UPDATE_ITEMS: {
        //     const cellsArr = [];
        //     state.map(cell => {
        //         if (cell.id !== action.cell.id) {
        //             cellsArr.push(cell);
        //         } else {
        //             cellsArr.push(action.cell);
        //         }
        //     });
        //     return cellsArr;
        // }
        default:
            return state;
    }

}

export function notebookOperation(state = initialState, action) {
    return {
        screenMode: screenMode(state.screenMode, action),
        cells: cells(state.cells, action),
        alerts: alerts(state.alerts, action)
    };
}


export function screenMode(state = {fullScreen: false, itemKey: 0}, action) {
    switch (action.type) {
        case FULL_SCREEN:
            return {
                ...state,
                fullScreen: action.flag,
                itemKey: action.itemKey
            };

        default:
            return state;
    }
}


export function alerts(state = {items: [], lastKey: -1}, action) {
    switch (action.type) {
        case ALERT_SHOW:
            return {
                ...state,
                items: [...state.items, action.payload],
                lastKey: state.lastKey + 1
            };
        case ALERT_HIDE:
            return {
                ...state,
                items: state.items.filter(item => (item.key !== action.payload.key))
            };
        default:
            return state;
    }
}


