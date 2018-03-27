/*
 * Copyright 2017 HugeGraph Authors
 *
 * Licensed to the Apache Software Foundation (ASF) under one or more
 * contributor license agreements. See the NOTICE file distributed with this
 * work for additional information regarding copyright ownership. The ASF
 * licenses this file to You under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations
 * under the License.
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
                        <Route path="/connections" component={ConnectionsBoard}/>
                        <Route path="/notebook/:id" component={NoteBookBoard}/>
                        <Route component={NoteCardBoard}/>
                    </Switch>
                </div>
            </Router>
        );
    }
}
