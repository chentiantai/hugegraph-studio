/**
 * @file Desciption:
 * @author liunanke(liunanke@baidu.com)
 * Created on 17/6/6
 */

import React from 'react';
import Notebooks from './notebooks';
import {connect} from 'react-redux';
import {deleteNotebooks, showNotebooks, openEditModal} from './actions';
import {NotebooksModalApp} from './notebooksmodal';


class NotebooksBoard extends React.Component {
    componentDidMount() {
        fetch('/api/v1/notebooks')
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    alert('error');
                    console.error('Server Side Error；\r\nCode:' + response.status);
                }
            })
            .then(data => {
                this.props.showNotebooks(data);
            })
            .catch(err => {
                console.error(err);
            });
    }

    openAddModal() {
        let notebooks = {id: '', name: '', connectionName: ''};
        this.props.openEditModal(notebooks, 'add', 'Add Notebooks Information');
    }

    openUpdateModal(notebooks) {
        this.props.openEditModal(notebooks, 'update', 'Update Notebooks Information');
    }

    render() {
        const notebooks = this.props.notebooks;
        return (
            <div className="container">
                <div className="row">
                    <div className="panel panel-default">
                        <div className="panel-body">
                            {/*<div className="page-title">*/}
                            {/*Notebooks information*/}
                            {/*<div className="notebooks-header">*/}
                            {/*<button type="button" className="btn btn-default"*/}
                            {/*onClick={() => this.openAddModal()}>*/}
                            {/*<i className="fa fa-plus" aria-hidden="true"><span>add</span></i>*/}
                            {/*</button>*/}
                            {/*<NotebooksModalApp/>*/}
                            {/*</div>*/}
                            {/*</div>*/}
                            {/*<table className="table table-striped">*/}
                            {/*<tbody>*/}
                            {/*<tr>*/}
                            {/*<th>name</th>*/}
                            {/*<th>graphName</th>*/}
                            {/*<th>notebooksHost</th>*/}
                            {/*<th>port</th>*/}
                            {/*<th>operation</th>*/}
                            {/*</tr>*/}
                            {/*{*/}
                            {/*notebooks.map(notebooks =>*/}
                            {/*<Notebooks key={notebooks.id} notebooks={notebooks}*/}
                            {/*deleteNotebooks={() => this.props.deleteNotebooks(notebooks.id)}*/}
                            {/*editNotebooks={() => this.openUpdateModal(notebooks)}/>)*/}
                            {/*}*/}
                            {/*</tbody>*/}
                            {/*</table>*/}
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
        notebooks: state.notebooks
    };
}

// Map Redux actions to component props
function mapDispatchToProps(dispatch) {
    return {
        deleteNotebooks: id => dispatch(deleteNotebooks(id)),
        showNotebooks: notebookss => dispatch(showNotebooks(notebooks)),
        openEditModal: (notebooks, operation, title) => dispatch(openEditModal(notebooks, operation, title))
    };
}

// Connected Component
export const NotebooksBoardApp = connect(
    mapStateToProps,
    mapDispatchToProps
)(NotebooksBoard);