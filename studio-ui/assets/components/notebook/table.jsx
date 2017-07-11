/**
 * @file Desciption:
 * @author huanghaiping(huanghaiping02@baidu.com)
 * Created on 17/6/30
 */

import React from 'react';
export default class TableResult extends React.Component {
    constructor() {
        super();
    }

    render() {
        const tableContent = this.props.content.data;
        let dataType = this.props.content.type;
        switch (dataType) {
            case 'VERTEX':
                return (
                    <div style={{height: this.props.height + 'px'}}
                         className="code-content">
                        <table className="table table-bordered table-striped">
                            <tbody>
                            <tr className="info">
                                <th>id</th>
                                <th>label</th>
                                <th>properties</th>
                            </tr>
                            {
                                tableContent.map((tableContent, index) =>
                                    <tr key={index}>
                                        <td>{tableContent.id}</td>
                                        <td>{tableContent.label}</td>
                                        <td>{JSON.stringify(tableContent.properties)}</td>
                                    </tr>
                                )
                            }
                            </tbody>
                        </table>
                    </div>
                );
            case 'EDGE':
                return (
                    <div style={{height: this.props.height + 'px'}}
                         className="code-content">
                        <table className="table table-bordered table-striped">
                            <tbody>
                            <tr className="info">
                                <th>id</th>
                                <th>label</th>
                                <th>source</th>
                                <th>target</th>
                                <th>properties</th>
                            </tr>
                            {
                                tableContent.map((tableContent, index) =>
                                    <tr key={index}>
                                        <td>{tableContent.id}</td>
                                        <td>{tableContent.label}</td>
                                        <td>{tableContent.outV}</td>
                                        <td>{tableContent.inV}</td>
                                        <td>{JSON.stringify(tableContent.properties)}</td>
                                    </tr>
                                )
                            }
                            </tbody>
                        </table>
                    </div>
                );
            case 'NUMBER':
                return (
                    <div style={{height: this.props.height + 'px'}}
                         className="code-content">
                        <table className="table table-bordered table-striped">
                            <tbody>
                            <tr className="info">
                                <th>count</th>
                            </tr>
                            <tr>
                                <td>{tableContent}</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                );
            default :
                return (<div></div>);
        }
    }
}