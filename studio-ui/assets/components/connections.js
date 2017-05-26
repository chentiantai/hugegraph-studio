/**
 * @file Desciption:
 * @author huanghaiping(huanghaiping02@baidu.com)
 * Created on 17/5/31
 */
import '../vendors/bootstrap/css/bootstrap.min.css';
import '../css/main.css';
import React from 'react';

export default class Connections extends React.Component {
    render() {
        return (
            <div>
                <div className="container">
                    <div className="row">
                        <div className="panel panel-default">
                            <div className="panel-body">
                                <div className="page-title">
                                    Connections information
                                    <div className="connection-header">
                                        <button type="button" className="btn btn-default" data-toggle="modal"
                                                data-target="#connectionModal">
                                            <i className="fa fa-plus" aria-hidden="true"><span>add</span></i>
                                        </button>
                                    </div>
                                </div>
                                <table className="table table-striped">
                                    <tbody>
                                    <tr>
                                        <th>name</th>
                                        <th>port</th>
                                        <th>host</th>
                                        <th>operation</th>
                                    </tr>
                                    <tr>
                                        <td>Tutorial Connetion</td>
                                        <td>9042</td>
                                        <td>127.0.0.1</td>
                                        <td>
                                            <button type="button" className="btn btn-link"><i className="fa fa-pencil"
                                                                                              aria-hidden="true"></i>
                                            </button>
                                            <button type="button" className="btn btn-link"><i className="fa fa-times"
                                                                                              aria-hidden="true"></i>
                                            </button>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Tutorial Connetion</td>
                                        <td>9042</td>
                                        <td>127.0.0.1</td>
                                        <td>
                                            <button type="button" className="btn btn-link"><i className="fa fa-pencil"
                                                                                              aria-hidden="true"></i>
                                            </button>
                                            <button type="button" className="btn btn-link"><i className="fa fa-times"
                                                                                              aria-hidden="true"></i>
                                            </button>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Tutorial Connetion</td>
                                        <td>9042</td>
                                        <td>127.0.0.1</td>
                                        <td>
                                            <button type="button" className="btn btn-link"><i className="fa fa-pencil"
                                                                                              aria-hidden="true"></i>
                                            </button>
                                            <button type="button" className="btn btn-link"><i className="fa fa-times"
                                                                                              aria-hidden="true"></i>
                                            </button>
                                        </td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}





