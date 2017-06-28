/**
 * @file Desciption:
 * @author huanghaiping(huanghaiping02@baidu.com)
 * Created on 17/6/27
 */
import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import {operation} from './reducers';


let store;
if (!(window.__REDUX_DEVTOOLS_EXTENSION__ || window.__REDUX_DEVTOOLS_EXTENSION__)) {
    store = createStore(
        operation,
        applyMiddleware(thunk)
    );
} else {
    store = createStore(
        operation,
        compose(applyMiddleware(thunk), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
    );
}

export default store;