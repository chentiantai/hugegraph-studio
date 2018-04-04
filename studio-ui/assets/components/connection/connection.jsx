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

import React from 'react';

export  default class Connection extends React.Component {

    render() {
        const connection = this.props.connection;
        return (
            <tr>
                <td>{connection.name}</td>
                <td>{connection.graphName}</td>
                <td>{connection.connectionHost}</td>
                <td>{connection.port}</td>
                <td>
                    <button type="button"
                            className="btn btn-link"
                            onClick={() => this.props.editConnection()}>
                        <i className="fa fa-pencil" aria-hidden="true"></i>
                    </button>
                    <button type="button"
                            className="btn btn-link"
                            onClick={() => this.props.deleteConnection()}>
                        <i className="fa fa-times" aria-hidden="true"></i>
                    </button>
                </td>
            </tr>
        );
    }
}
