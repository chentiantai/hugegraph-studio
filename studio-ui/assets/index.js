/**
 * @file Desciption: Hot Module Replacement Framework
 * @author huanghaiping(huanghaiping02@baidu.com)
 * Created on 17/5/31
 */
import React from 'react';
import ReactDOM from 'react-dom';
// AppContainer is a necessary wrapper component for HMR
import {AppContainer} from 'react-hot-loader';
import App from './components/app';

const render = (Component) => {
    ReactDOM.render(
        <AppContainer>
            <Component/>
        </AppContainer>,
        document.getElementById('root')
    );
};

render(App);

// Hot Module Replacement API
if (module.hot) {
    module.hot.accept('./components/app', () => {
        render(App);
    });
}