/**
 * @file Desciption: Hot Module Replacement Framework
 * @author huanghaiping(huanghaiping02@baidu.com)
 * Created on 17/5/31
 */
import React from 'react';
import ReactDOM from 'react-dom';
import {AppContainer} from 'react-hot-loader';
import {Provider} from 'react-redux';
import ConnectionsApp from './components/connectionsapp';
import store from './components/connection/store';
require('react-hot-loader/patch');

const render = (Component) => {
    ReactDOM.render(
        <AppContainer>
            <Provider store={store}>
                <Component/>
            </Provider>
        </AppContainer>,
        document.getElementById('root')
    );
};

render(ConnectionsApp);

// Hot Module Replacement API
if (module.hot) {
    module.hot.accept('./components/connectionsapp', () => {
        render(ConnectionsApp);
    });
}