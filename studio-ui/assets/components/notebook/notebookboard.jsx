/**
 * @file Desciption:
 * @author huanghaiping(huanghaiping02@baidu.com)
 * Created on 17/6/12
 */
import React from 'react';
import NotebookItem from './notebookitem';
import {connect} from 'react-redux';
import {itemScreenMode, addItem, loadCells, deleteItem} from './actions';
import {withRouter} from 'react-router-dom';

class NotebookBoard extends React.Component {
    constructor() {
        super();
        this.state = {
            itemKeys: [0],
            key: []
        }
        this.maxKey = Math.max(this.state.itemKeys) + 1;
    }

    componentDidMount() {
        this.props.loadCells(this.props.notebookId);
    }


    render() {

        console.log('id:' + this.props.match.params.id);
        console.log(this.state.itemKeys);

        let fullScreenItem = this.props.screenMode.itemKey;
        let fullScreen = this.props.screenMode.fullScreen;
        let addDisplay = fullScreen ? 'none' : 'block';
        let deleteCss = this.props.cells.length === 1 ? 'btn btn-link' +
            ' disabled' : 'btn btn-link';
        return (
            <div>
                {
                    this.props.cells.map(cell =>
                        <div key={cell.id}>
                            <NotebookItem
                                display={fullScreen ? fullScreenItem === i ? 'block' : 'none' : 'block'}
                                onDelete={this.deleteItem}
                                deleteCss={deleteCss}
                                itemId={cell.id}
                                itemContent={cell.code}
                                language={cell.language}/>
                            <NoteBookItemAdd itemKey={cell.id}
                                             display={addDisplay}
                                             onClick={this.addItem}/>
                        </div>
                    )
                }
            </div>
        );
    }


    addItem = preItemId => {
        let cells = this.props.cells;
        let len = cells.length;
        let position = len - 1;
        for (let i = 0; i < len; i++) {
            if (cells[i].id === preItemId) {
                position = i;
                break;
            }
        }
        console.log(position + 1);
        this.props.addItem(this.props.notebookId, position + 1);
    }

    deleteItem = cellId => {
        if (this.props.cells.length === 1) return;
        this.props.deleteItem(this.props.notebookId, cellId);
    }
}


class NoteBookItemAdd extends React.Component {
    onClick = () => {
        this.props.onClick(this.props.itemKey);
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
        screenMode: state.screenMode,
        cells: state.cells
    };
}

// Map Redux actions to component props
function mapDispatchToProps(dispatch) {
    return {
        itemScreenMode: (flag, itemKey) => dispatch(itemScreenMode(flag, itemKey)),
        addItem: (notebookId, position) => dispatch(addItem(notebookId, position)),
        loadCells: notebookId => dispatch(loadCells(notebookId)),
        deleteItem: (notebookId, cellId) => dispatch(deleteItem(notebookId, cellId))

    };
}

// Connected Component
export default  withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(NotebookBoard));
