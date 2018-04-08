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
import {connect} from 'react-redux';
import {alertMessage, loadConnections} from '../connection/actions';

export class NoteCardAdd extends React.Component {
    constructor() {
        super();
    }

    render() {
        return (
            <div className="notebook-card" onClick={() => this.addNoteCard()}>
                <div className="notebook-card-add">
                    <button type="button" className="btn btn-link">
                        <i className="fa fa-plus fa-4x" aria-hidden="true"/>
                    </button>
                </div>
            </div>
        )
    }

    componentDidMount() {
        this.props.loadConnections();
    }

    addNoteCard() {
        if (this.props.connections.length === 0) {
            this.props.alertMessage('There is not any connections, please' +
                                    ' create a connection firstly.', 'warning');
        } else {
            this.props.onClick();
        }
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
        loadConnections: () => dispatch(loadConnections()),
        alertMessage: (msg, type) => dispatch(alertMessage(msg, type))
    };
}

// Connected Component
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(NoteCardAdd);
