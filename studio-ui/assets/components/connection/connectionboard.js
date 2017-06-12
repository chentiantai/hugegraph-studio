/**
 * @file Desciption:
 * @author huanghaiping(huanghaiping02@baidu.com)
 * Created on 17/6/5
 */

import React from 'react';
import Connection from './connection';
import {connect} from 'react-redux';
import {deleteConnection, loadConnections, openEditModal} from './actions';
import {ConnectionModalApp} from './connectionmodal';
import AlertModal from '../commoncomponents/alertmodal';
import AlertList from './alertlist';


class ConnectionsBoard extends React.Component {
    constructor() {
        super();
        this.state = {
            alert: null
        };
    }

    componentDidMount() {
        this.props.loadConnections();
    }

    openAddModal() {
        let connection = {id: '', name: '', graphName: '', connectionHost: '', port: ''};
        this.props.openEditModal(connection, 'add', 'Add Connection Information');
    }

    openUpdateModal(connection) {
        this.props.openEditModal(connection, 'update', 'Update Connection Information');
    }

    deleteConnection(id) {
        let alert = (
            <AlertModal
                cancel={() => this.cancelDelete()}
                confirm={() => this.confirmDelete(id)}
                message='Do you want to delete this connection'
            />

        );
        this.setState({
            alert: alert
        });
    }

    confirmDelete(id) {
        this.props.deleteConnection(id);
        this.setState({
            alert: null
        });
    }

    cancelDelete() {
        this.setState({
            alert: null
        });
    }

    render() {
        const connections = this.props.connections;
        return (
            <div className="container">
                <div className="row">
                    <AlertList/>
                </div>

                <div className="row">
                    <div className="panel panel-default">
                        <div className="panel-body">
                            <div className="page-title">
                                Connections information
                                <div className="connection-header">
                                    <button type="button" className="btn btn-default"
                                            onClick={() => this.openAddModal()}>
                                        <i className="fa fa-plus" aria-hidden="true"><span>add</span></i>
                                    </button>
                                    <ConnectionModalApp/>
                                </div>
                            </div>
                            <table className="table table-striped">
                                <tbody>
                                <tr>
                                    <th>name</th>
                                    <th>graphName</th>
                                    <th>connectionHost</th>
                                    <th>port</th>
                                    <th>operation</th>
                                </tr>
                                {
                                    connections.map(connection =>
                                        <Connection key={connection.id} connection={connection}
                                                    deleteConnection={() => this.deleteConnection(connection.id)}
                                                    editConnection={() => this.openUpdateModal(connection)}/>)
                                }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                {this.state.alert}
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
        loadConnections: () => dispatch(loadConnections()),
        openEditModal: (connection, operation, title) => dispatch(openEditModal(connection, operation, title))
    };
}

// Connected Component
export const ConnectionsBoardApp = connect(
    mapStateToProps,
    mapDispatchToProps
)(ConnectionsBoard);