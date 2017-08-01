/**
 * @file Desciption:
 * @author1 huanghaiping(huanghaiping02@baidu.com)
 * @author2 liunanke(liunanke@baidu.com)
 * Created on 17/5/31
 */
import '../vendors/bootstrap/css/bootstrap.min.css';
import '../css/main.css';
import React from 'react';
import Head from './head';
import NoteCardBoard from './notebooksApp/notecardboard';
import ConnectionsBoard from './connection/connectionboard';
import NoteBookBoard from './notebook/notebookboard';

import 'whatwg-fetch';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
require('react-hot-loader/patch');

export default class NotebooksApp extends React.Component {

    constructor() {
        super();
    }

    render() {
        return (
            <Router >
                <div>
                    <Head/>
                    <Switch>
                        <Route path="/index" component={NoteCardBoard}/>
                        <Route path="/connections"
                               component={ConnectionsBoard}/>
                        <Route path="/notebook/:id" component={NoteBookBoard}/>
                        <Route component={NoteCardBoard}/>
                    </Switch>
                </div>
            </Router>
        );
    }
}






