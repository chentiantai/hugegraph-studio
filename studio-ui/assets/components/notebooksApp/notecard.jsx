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

import  React from 'react'
import {deleteNoteCard} from './actions';
import {connect} from 'react-redux';
import TimeFormat from '../commoncomponents/time';
import {withRouter,Link,Route} from 'react-router-dom';

class NoteCard extends React.Component {

    del() {
        this.props.delete(this.props.value.id);
    }

    update() {
        this.props.onUpdate(this.props.value);
    }

    render() {
        const noteCard = this.props.value;
        let noteCardName = noteCard.name;

        return (
            <div className="notebook-card">
                <div className="notebook-card-close">
                    <button type="button" className="btn btn-link"
                            onClick={() => this.del()}>
                        <i className="fa fa-times"
                           aria-hidden="true"></i>
                    </button>
                </div>
                <Link to={'/notebook/'+noteCard.id}>
                    <div className="notebook-card-info">
                        <div className="notebook-card-title">
                                {noteCardName}
                        </div>
                        <div className="notebook-card-description">
                            {noteCard.connection.name}
                        </div>
                    </div>
                </Link>
                <div className="notebook-card-control">
                    <div className="notebook-card-createtime">
                        <TimeFormat timeFormat={noteCard.lastUsed}/>
                    </div>

                    <div className="notebook-card-operation">
                        <button type="button"
                                className="btn btn-link"
                                data-toggle="modal"
                                data-target="#notebookCardModal"
                                onClick={() => this.update()}>
                            <span>
                                <i className="fa fa-pencil-square-o"
                                   aria-hidden="true"></i>
                            </span>
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}

// Map Redux state to component props
function mapStateToProps(state) {
    return {
        noteCards: state.noteCards
    };
}

// Map Redux actions to component props
function mapDispatchToProps(dispatch) {
    return {
        delete: id => dispatch(deleteNoteCard(id))
    };
}

// Connected Component
export default  withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(NoteCard));
