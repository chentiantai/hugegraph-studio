/**
 * @file Desciption:
 * @author huanghaiping(huanghaiping02@baidu.com)
 * Created on 17/6/5
 */

import React from 'react';


export  default class Connection extends React.Component {
    render() {
        const connection = this.props.connection;
        return (
            <tr>
                <td>{connection.name}</td>
                <td>{connection.graphName}</td>
                <td>{connection.connectionHost}</td>
                <td>{connection.port}</td>
                <td>
                    <button type="button" className="btn btn-link" onClick={() => this.props.editConnection()}>
                        <i className="fa fa-pencil" aria-hidden="true"></i>
                    </button>
                    <button type="button" className="btn btn-link" onClick={() => this.props.deleteConnection()}>
                        <i className="fa fa-times" aria-hidden="true"></i>
                    </button>
                </td>
            </tr>
        );
    }


}
