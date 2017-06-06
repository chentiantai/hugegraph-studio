/**
 * @file Desciption: Hot Module Replacement Framework
 * @author huanghaiping(huanghaiping02@baidu.com)
 * Created on 17/5/31
 */
import React from 'react';
import ReactDOM from 'react-dom';
// AppContainer is a necessary wrapper component for HMR
import {AppContainer} from 'react-hot-loader';
import NotebooksApp from './components/notebooksapp';
import Container from './components/notebooksApp/container';


const render = (Component) => {
    ReactDOM.render(
        <AppContainer>
            <Component/>
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