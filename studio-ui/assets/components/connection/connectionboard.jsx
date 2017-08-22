/**
 * @file Desciption:
 * @author huanghaiping(huanghaiping02@baidu.com)
 * Created on 17/6/5
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
            title: 'Update Connection Information',
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
                                                onClick={() => this.openAddModal()}>
                                            <i className="fa fa-plus"
                                               aria-hidden="true"><span>add</span></i>
                                        </button>
                                        <ConnectionModal
                                            connection={this.state.connection}
                                            isOpen={this.state.isOpen}
                                            operation={this.state.operation}
                                            title={this.state.title}
                                            operationTime={this.state.operationTime}/>
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
                                            <Connection key={connection.id}
                                                        connection={connection}
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
