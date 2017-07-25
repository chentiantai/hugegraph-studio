/**
 * @file Desciption:
 * @author huanghaiping(huanghaiping02@baidu.com)
 * Created on 17/6/5
 */
import {
    ADD_ITEM,
    SHOW_NOTEBOOK,
    DELETE_ITEM,
    UPDATE_ITEM,
    CLEAR_NOTEBOOK_STATE,
    RUN_MODE,
    SHOW_SCHEMA,
    SYCN_ITEM
} from './actions';

export function notebook(state = [], action) {

    switch (action.type) {
        case ADD_ITEM:
            let arr = [];
            let isAdd = false;
            for (let i = 0; i < state.cells.length; i++) {
                if (action.position == i) {
                    arr.push(action.newCell);
                    arr.push(state.cells[i]);
                    isAdd = true;
                } else {
                    arr.push(state.cells[i]);
                }
            }
            if (!isAdd) arr.push(action.newCell);
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
        case UPDATE_ITEM: {
            return {
                ...state,
                cells: state.cells.map(
                    cell => cell.id === action.data.id ? {
                        ...cell,
                        code: action.data.code,
                        language: action.data.language
                    } : cell
                )
            };
        }
        case SYCN_ITEM: {
            return {
                ...state,
                cells: state.cells.map(
                    cell => cell.id === action.data.id ? {
                        ...cell,
                        code: action.data.code
                    } : cell
                )
            };
        }
        case CLEAR_NOTEBOOK_STATE: {
            return {
                cells: []
            };
        }
        case RUN_MODE: {
            console.log(action.cell);
            return {
                ...state,
                cells: state.cells.map(
                    cell => cell.id === action.cell.id ? {
                        ...cell,
                        result: action.cell.result,
                        msg: action.cell.msg,
                        status: action.cell.status
                    } : cell
                )
            };
        }
        default:
            return state;
    }

}


export function schema(state = null, action) {
    switch (action.type) {
        case SHOW_SCHEMA:
            return action.data;
        default:
            return state;
    }
}


