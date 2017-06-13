/**
 * @file Desciption:
 * @author huanghaiping(huanghaiping02@baidu.com)
 * Created on 17/6/6
 */
import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import {connectionsOperation} from './reducers';
// import * as reducers from './reducers';


let store;
if (!(window.__REDUX_DEVTOOLS_EXTENSION__ || window.__REDUX_DEVTOOLS_EXTENSION__)) {
    store = createStore(
        connectionsOperation,
        applyMiddleware(thunk)
    );
} else {
    store = createStore(
        connectionsOperation,
        compose(applyMiddleware(thunk), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
    );
}

export default store;