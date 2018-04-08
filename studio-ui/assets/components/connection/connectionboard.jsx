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
import StudioHead from '../studiohead';
import Connection from './connection';
import {connect} from 'react-redux';
import {deleteConnection, loadConnections} from './actions';
import ConnectionModal from './connectionmodal';
import AlertModal from '../commoncomponents/alertmodal';
import {withRouter} from 'react-router-dom';

class ConnectionsBoard extends React.Component {

    constructor() {
        super();
        this.state = {
            alert: null,
            title: 'Add a new connection',
            isOpen: false,
            connection: {
                id: '',
                name: '',
                graphName: '',
                connectionHost: '',
                port: ''
            },
            operation: 'add',
            operationTime: 0
        }
    }

    componentDidMount() {
        this.props.loadConnections();
    }

    openAddModal() {
        this.setState({
            title: 'Add a new connection',
            isOpen: true,
            connection: {
                id: '',
                name: '',
                graphName: '',
                connectionHost: '',
                port: ''
            },
            operation: 'add',
            operationTime: this.state.operationTime + 1
        });
    }

    openUpdateModal(connection) {
        this.setState({
            title: 'Update connection information',
            isOpen: true,
            connection: {...connection},
            operation: 'update',
            operationTime: this.state.operationTime + 1
        });
    }

    deleteConnection(id) {
        let alert = (
            <AlertModal
                cancel={() => this.cancelDelete()}
                confirm={() => this.confirmDelete(id)}
                message='Do you want to delete this connection?'
            />
        );
        this.setState({
            alert: alert,
            isOpen: false
        });
    }

    confirmDelete(id) {
        this.props.deleteConnection(id);
        this.setState({
            alert: null,
            isOpen: false
        });
    }

    cancelDelete() {
        this.setState({
            alert: null,
            isOpen: false
        });
    }

    render() {
        const connections = this.props.connections;
        return (
            <div>
                <StudioHead
                    display="block"
                    name="HugeGraph NoteBook Quick Start"/>
                <div className="container">
                    <div className="row">
                        <div className="panel panel-default">
                            <div className="panel-body">
                                <div className="page-title">
                                    Connections information
                                    <div className="connection-header">
                                        <button type="button"
                                                className="btn btn-default"
                                                onClick={() =>
                                                    this.openAddModal()}>
                                            <i className="fa fa-plus"
                                               aria-hidden="true">
                                                <span>add</span>
                                            </i>
                                        </button>
                                        <ConnectionModal
                                            connection={this.state.connection}
                                            isOpen={this.state.isOpen}
                                            operation={this.state.operation}
                                            title={this.state.title}
                                            operationTime=
                                                {this.state.operationTime}/>
                                    </div>
                                </div>
                                <table className="table table-striped">
                                    <tbody>
                                    <tr>
                                        <th>Name</th>
                                        <th>Graph</th>
                                        <th>Host</th>
                                        <th>Port</th>
                                        <th>Operation</th>
                                    </tr>
                                    {
                                        connections.map(connection =>
                                            <Connection
                                                key={connection.id}
                                                connection={connection}
                                                deleteConnection={() =>
                                                    this.deleteConnection(
                                                         connection.id)
                                                }
                                                editConnection={() =>
                                                    this.openUpdateModal(
                                                         connection)
                                                }
                                            />
                                        )
                                    }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    {this.state.alert}
                </div>
            </div>
        );
    }
}

// Map Redux state to component props
function mapStateToProps(state) {
    return {
        connections: state.connections
    };
}

// Map Redux actions to component props
function mapDispatchToProps(dispatch) {
    return {
        deleteConnection: id => dispatch(deleteConnection(id)),
        loadConnections: () => dispatch(loadConnections())
    };
}

// Connected Component
export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(ConnectionsBoard));
