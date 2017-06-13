/**
 * @file Desciption:
 * @author liunanke(liunanke@baidu.com)
 * Created on 17/6/6
 */

const initialState = {
    notebooks: [],
    modalInfo: {
        title: '',
        operation: '',
        isOpen: false,
        notebooks: {//TODO.......paras should be change
            id: '',
            name: '',
            connectionName: ''
        }
    }

};

export function notebooksOperation(state = initialState, action) {
    switch (action.type) {
        case 'show': {
            const newstate = JSON.parse(JSON.stringify(state));
            newstate.notebooks = action.notebooks;
            return newstate;
        }
        case 'add_success': {
            return Object.assign({}, state, {
                notebooks: [
                    ...state.notebooks,
                    action.newConnection
                ],
                modalInfo: Object.assign({}, state.modalInfo, {isOpen: false})
            });
        }
        case 'delete_success': {
            const notebooksArr = [];
            // Deep Clone
            const newstate = JSON.parse(JSON.stringify(state));
            newstate.notebooks.map(notebooks => {
                if (notebooks.id !== action.id) {
                    notebooksArr.push(notebooks);
                }
            });
            newstate.notebooks = notebooksArr;
            return newstate;
        }


        case 'open_edit_modal': {
            const newstate = JSON.parse(JSON.stringify(state));
            newstate.modalInfo.isOpen = true;
            newstate.modalInfo.operation = action.operation;
            newstate.modalInfo.title = action.title;
            if (action.operation === 'update') {
                newstate.modalInfo.notebooks = action.notebooks;
            } else {
                newstate.modalInfo.notebooks = action.notebooks;
            }
            return newstate;
        }
        case 'close_edit_modal': {
            const newstate = JSON.parse(JSON.stringify(state));
            newstate.modalInfo.isOpen = false;
            return newstate;
        }
        case 'refresh_edit_modal': {
            const newstate = JSON.parse(JSON.stringify(state));
            newstate.modalInfo.notebooks = action.notebooks;
            return newstate;
        }
        case 'update_success': {
            const notebooksArr = [];
            const newstate = JSON.parse(JSON.stringify(state));
            newstate.notebooks.map(notebooks => {
                if (notebooks.id !== action.notebooks.id) {
                    notebooksArr.push(notebooks);
                } else {
                    notebooksArr.push(action.notebooks);
                }
            });
            newstate.notebooks = notebooksArr;
            newstate.modalInfo.isOpen = false;
            return newstate;
        }
        default:
            return state;
    }
}
