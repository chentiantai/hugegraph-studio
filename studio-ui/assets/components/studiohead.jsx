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
import Schema from './notebook/schema';
import AlertList from './connection/alertlist';

export default class StudioHead extends React.Component {

    constructor() {
        super();
        this.state = {
            showSchema: false
        };
    }

    render() {
        let display = this.props.display === undefined ?
                      'block' : this.props.display;
        let name = this.props.name === undefined ?
                   'HugeGraph Notebook Quick Start' : this.props.name;
        let headRight = this.props.connection === undefined ? null :
                        <div className="header-control-right">
                            <div className="graph">
                                <i className="fa fa-database"
                                   aria-hidden="true"></i>
                                &nbsp;{this.props.connection.graph}
                            </div>
                            <div className="schema-bt">
                                <ul className="nav nav-pills">
                                    <li role="presentation">
                                        <a onClick={this.showSchemaView}>
                                            <i className="fa fa-share-alt"
                                               aria-hidden="true"/>
                                            Schema
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>

        let schemaView = null;
        if (this.props.connection !== undefined && this.state.showSchema) {
            schemaView =
                <div className="schema-view"
                     style={{
                         display: this.state.showSchema ? 'block' : 'none'
                     }}>
                    <Schema connection={this.props.connection}/>
                </div>
        }

        return (
            <div style={{display: display}}>
                <div className="studio-header">
                    <div className="container">
                        <div className="row">
                            <div className="header-title">
                                <h1>
                                    <i className="fa fa-book"
                                       aria-hidden="true"/>
                                    {name}
                                </h1>
                            </div>
                            {headRight}

                        </div>
                    </div>
                </div>
                {schemaView}
                <div className="container">
                    <div className="row" style={{padding: '0 15px'}}>
                        <AlertList/>
                    </div>
                </div>
            </div>
        );
    }

    showSchemaView = () => {
        this.setState({showSchema: !this.state.showSchema});
    }
}
