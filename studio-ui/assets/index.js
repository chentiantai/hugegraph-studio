/**
 * @file Desciption: Hot Module Replacement Framework
 * @author huanghaiping(huanghaiping02@baidu.com)
 * Created on 17/5/31
 */
import React from 'react';
import ReactDOM from 'react-dom';
import {AppContainer} from 'react-hot-loader';
import NotebooksApp from './components/notebooksapp';
import {Provider} from 'react-redux';
import store from './components/store';
// import store from './components/notebooksApp/stores';


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

render(NotebooksApp);
// render(Container)
// Hot Module Replacement API
if (module.hot) {
    module.hot.accept('./components/notebooksapp', () => {
        render(NotebooksApp);
    });
}