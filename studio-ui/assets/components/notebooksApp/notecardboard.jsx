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
import NoteCardAdd from './notecardadd';
import NoteCard from './notecard';
import StudioHead from '../studiohead';
import {connect} from 'react-redux';
import {loadNoteCards} from './actions';
import NoteCardModal from './notecardmodal';
import {withRouter} from 'react-router-dom';

class NoteCardBoard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            addTimes: 0,
            noteCard: {
                id: '',
                name: '',
                connectionName: '',
                connectionId: ''
            },
            operation: 'add'
        }
    }

    addNoteCard() {
        this.setState({
            title: 'Add notebook',
            isOpen: true,
            addTimes: this.state.addTimes + 1,
            noteCard: {
                id: '',
                name: '',
                connectionId: ''
            },
            operation: 'add'
        });
    }

    updateNoteCard = noteCard => {
        this.setState({
            title: 'Update notebook',
            isOpen: true,
            addTimes: this.state.addTimes + 1,
            noteCard: {
                id: noteCard.id,
                name: noteCard.name,
                connectionId: noteCard.connectionId
            },
            operation: 'update'
        });
    }

    render() {
        const noteCards = this.props.noteCards;
        return (
            <div>
                <StudioHead
                    display="block"
                    name="HugeGraph NoteBook Quick Start"/>

                <div className="container">

                    <div className="row">
                        <div className="notebook-cards">
                            <NoteCardAdd onClick={() => this.addNoteCard()}/>
                            {
                                noteCards.map(noteCard =>
                                    <NoteCard key={noteCard.id}
                                              value={noteCard}
                                              onUpdate={this.updateNoteCard}/>)
                            }
                        </div>
                    </div>
                    <NoteCardModal noteCard={this.state.noteCard}
                                   addTime={this.state.addTimes}
                                   isOpen={this.state.isOpen}
                                   operation={this.state.operation}
                                   title={this.state.title}/>
                </div>
            </div>
        );
    }

    componentDidMount() {
        this.props.loadNoteCards();
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
        loadNoteCards: () => dispatch(loadNoteCards())
    };
}

// Connected Component
export default  withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(NoteCardBoard));
