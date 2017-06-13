/**
 * @file Desciption:
 * @author huanghaiping(huanghaiping02@baidu.com)
 * Created on 17/6/12
 */
import '../vendors/bootstrap/css/bootstrap.min.css';
import '../css/main.css';
import React from 'react';
import Head from './head';
import NotebookBoard from './notebook/notebookboard';
import StudioHead from './studiohead';
import 'whatwg-fetch';

export default class NotebookApp extends React.Component {
    render() {
        return (
            <div>
                <Head/>
                <StudioHead/>
                <NotebookBoard/>
            </div>
        );
    }
}
