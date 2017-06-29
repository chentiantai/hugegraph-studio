/**
 * @file Desciption:
 * @author huanghaiping(huanghaiping02@baidu.com)
 * Created on 17/6/5
 */
import {
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
            let arr = [];
            for (let i = 0; i < state.cells.length; i++) {
                if (action.position == i) {
                    arr.push(newCell);
                    arr.push(state.cells[i]);
                } else {
                    arr.push(state.cells[i]);
                }
            }
            return {
                ...state,
                cells: arr
            };
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





