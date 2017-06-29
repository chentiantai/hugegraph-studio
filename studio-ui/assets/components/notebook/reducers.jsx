/**
 * @file Desciption:
 * @author huanghaiping(huanghaiping02@baidu.com)
 * Created on 17/6/5
 */
import {
    FULL_SCREEN,
    ADD_ITEM,
    SHOW_NOTEBOOK,
    DELETE_ITEM,
    UPDATE_ITEMS
} from './actions';

export function notebook(state = [], action) {

    switch (action.type) {
        case ADD_ITEM:
            var newCell = {
                id: action.data.id,
                language: action.data.language,
                code: action.data.code
            };
            state.cells.splice(action.position, 0, newCell);
            return [
                ...state
            ];
        case SHOW_NOTEBOOK:
            return action.notebook;
        case DELETE_ITEM:
            return {
                ...state,
                cells: state.cells.filter(cell => cell.id !== action.cellId)
            };
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


export function screenMode(state = {fullScreen: false, cellId: ''}, action) {
    switch (action.type) {
        case FULL_SCREEN:
            return {
                ...state,
                fullScreen: action.flag,
                cellId: action.cellId
            };

        default:
            return state;
    }
}


