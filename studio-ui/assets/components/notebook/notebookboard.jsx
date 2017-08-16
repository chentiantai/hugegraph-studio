/**
 * @file Desciption:
 * @author huanghaiping(huanghaiping02@baidu.com)
 * Created on 17/6/12
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
    }

    render() {
        let existFullScreenCell = this.props.notebook.cells.some(cell => cell.viewSettings.fullScreen);
        let addDisplay = existFullScreenCell ? 'none' : 'block';
        let canBeDelete = this.props.notebook.cells.length > 1 ? true : false;
        return (
            <div>
                <StudioHead
                    display={existFullScreenCell ? 'none' : 'block'}
                    name={this.props.notebook.name}
                    connection={this.props.notebook.connection}/>
                {
                    this.props.notebook.cells.map(cell => {

                            let display = existFullScreenCell ? (cell.viewSettings.fullScreen ? 'block' : 'none') : 'block';

                            return <div key={cell.id} style={{display: display}}>
                                <NotebookCell cell={cell}
                                              notebookId={this.props.match.params.id}
                                              canBeDelete={canBeDelete}/>

                                <NoteBookItemAdd cellId={cell.id}
                                                 display={addDisplay}
                                                 onClick={this.addItem}/>
                            </div>;
                        }
                    )
                }
            </div>
        );
    }

    componentDidMount() {
        this.props.loadCells(this.props.match.params.id);
    }

    componentWillUnmount() {
        this.props.clearNotebookState();
    }

    onbeforeunload = () => {
        // TODO
        // console.log(JSON.stringify(this.props.notebook));
        // return this.props.updateNoteBook(this.props.notebook);
        //
        // let warning="确认退出?";
        // return warning;
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

    // deleteItem = cellId => {
    //     if (this.props.notebook.cells.length === 1) return;
    //     this.props.deleteItem(this.props.match.params.id, cellId);
    // }
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
                                       aria-hidden="true"></i>
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
        addItem: (notebookId, position) => dispatch(addItem(notebookId, position)),
        loadCells: notebookId => dispatch(loadCells(notebookId)),
        deleteItem: (notebookId, cellId) => dispatch(deleteItem(notebookId, cellId)),
        clearNotebookState: () => dispatch(clearNotebookState()),
        updateNoteBook: notebook => dispatch(updateNoteBook(notebook))
    };
}

// Connected Component
export default  withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(NotebookBoard));
