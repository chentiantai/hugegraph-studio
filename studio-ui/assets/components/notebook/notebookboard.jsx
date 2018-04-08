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
import NotebookCell from './notebookcell';
import StudioHead from '../studiohead';
import {connect} from 'react-redux';
import {
    addItem,
    loadCells,
    deleteItem,
    clearNotebookState,
    updateNoteBook
} from './actions';
import {withRouter} from 'react-router-dom';

class NotebookBoard extends React.Component {
    constructor() {
        super();
        this.shouldScroll = false;
    }

    componentWillReceiveProps(nextProps) {
        let nextCellsLen = nextProps.notebook.cells.length;
        let currentCellsLen = this.props.notebook.cells.length;
        if(currentCellsLen != 0){
            this.shouldScroll = nextCellsLen > currentCellsLen ? true : false;
        } else {
            this.shouldScroll = false;
        }
    }

    render() {
        let cells = this.props.notebook.cells;
        let existFullScreenCell = cells.some(cell => cell.viewSettings.fullScreen);
        let addDisplay = existFullScreenCell ? 'none' : 'block';
        let cellLength = this.props.notebook.cells.length;
        let canBeDelete = cellLength > 1 ? true : false;
        return (
            <div>
                <StudioHead
                    display={existFullScreenCell ? 'none' : 'block'}
                    name={this.props.notebook.name}
                    connection={this.props.notebook.connection}/>
                {
                    this.props.notebook.cells.map(cell => {
                        let display = existFullScreenCell ?
                                      (cell.viewSettings.fullScreen ?
                                       'block' : 'none') : 'block'

                        return (
                            <div key={cell.id}
                                 style={{display: display}}>
                                <NotebookCell cell={cell}
                                              notebookId=
                                                  {this.props.match.params.id}
                                              canBeDelete={canBeDelete}/>

                                <NoteBookItemAdd cellId={cell.id}
                                                 display={addDisplay}
                                                 onClick={this.addItem}/>
                            </div>
                        )}
                    )
                }
            </div>
        );
    }

    componentDidMount() {
        this.props.loadCells(this.props.match.params.id);
    }

    componentDidUpdate() {
        if (this.shouldScroll) {
            this.handleScroll();
        }
    }

    componentWillUnmount() {
        this.props.clearNotebookState();
    }

    addItem = preItemId => {
        let cells = this.props.notebook.cells;
        let len = cells.length;
        let position = len - 1;
        for (let i = 0; i < len; i++) {
            if (cells[i].id === preItemId) {
                position = i;
                break;
            }
        }
        this.props.addItem(this.props.match.params.id, position + 1);
    }

    handleScroll = () => {
        let scrollTop = document.body.scrollTop;
        scrollTo(0, scrollTop + 200);
    }
}


class NoteBookItemAdd extends React.Component {
    onClick = () => {
        this.props.onClick(this.props.cellId);
    }

    render() {
        return (
            <div className="container" style={{display: this.props.display}}>
                <div className="row">
                    <div className="col-md-12 col-box card-add">
                        <div className="card-add-line"></div>
                        <div className="card-add-btn">
                            <div className="btn-group btn-group-sm"
                                 role="group">
                                <button type="button"
                                        className="btn btn-default"
                                        onClick={this.onClick}>
                                    <i className="fa fa-plus"
                                       aria-hidden="true"/>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

// Map Redux state to component props
function mapStateToProps(state) {
    return {
        notebook: state.notebook
    };
}

// Map Redux actions to component props
function mapDispatchToProps(dispatch) {
    return {
        addItem: (notebookId, position) =>
                  dispatch(addItem(notebookId, position)),
        loadCells: notebookId => dispatch(loadCells(notebookId)),
        deleteItem: (notebookId, cellId) =>
                     dispatch(deleteItem(notebookId, cellId)),
        clearNotebookState: () => dispatch(clearNotebookState()),
        updateNoteBook: notebook => dispatch(updateNoteBook(notebook))
    };
}

// Connected Component
export default  withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(NotebookBoard));
