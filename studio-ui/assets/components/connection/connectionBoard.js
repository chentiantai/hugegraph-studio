/**
 * @file Desciption:
 * @author huanghaiping(huanghaiping02@baidu.com)
 * Created on 17/6/5
 */

import React from 'react';
import Connection from './connection';
import {connect} from 'react-redux';
import {deleteConnection, showConnections} from './actions';
import {ConnectionmodalApp} from './connectionmodal';


class ConnectionsBoard extends React.Component {
    componentDidMount() {
        fetch('/api/v1/connections')
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    alert('error');
                    console.error('Server Side Error；\r\nCode:' + response.status);
                }
            })
            .then(data => {
                this.props.showConnections(data);
            })
            .catch(err => {
                console.error(err);
            });
    }

    render() {
        const connections = this.props.connections;
        return (
            <div className="container">
                <div className="row">
                    <div className="panel panel-default">
                        <div className="panel-body">
                            <div className="page-title">
                                Connections information
                                <div className="connection-header">
                                    <ConnectionmodalApp/>
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
                                                    deleteConnection={() => this.props.deleteConnection(connection.id)}
                                                    editConnection={() => this.handleEdit(connection.id)}/>)
                                }
                                </tbody>
                            </table>
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
        connections: state.connections
    };
}

// Map Redux actions to component props
function mapDispatchToProps(dispatch) {
    return {
        deleteConnection: id => dispatch(deleteConnection(id)),
        showConnections: connections => dispatch(showConnections(connections))
    };
}

// Connected Component
export const ConnectionsBoardApp = connect(
    mapStateToProps,
    mapDispatchToProps
)(ConnectionsBoard);