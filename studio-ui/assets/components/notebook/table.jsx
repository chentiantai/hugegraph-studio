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
        return (
            <div>
                <table className="table table-bordered table-striped">
                    <tbody>
                    <tr className="info">
                        <th>id</th>
                        <th>label</th>
                        <th>type</th>
                    </tr>
                    <tr>
                        <td>person_josh</td>
                        <td>person</td>
                        <td>vertex</td>
                    </tr>
                    <tr>
                        <td>person_josh</td>
                        <td>person</td>
                        <td>vertex</td>
                    </tr>
                    <tr>
                        <td>person_josh</td>
                        <td>person</td>
                        <td>vertex</td>
                    </tr>
                    <tr>
                        <td>person_josh</td>
                        <td>person</td>
                        <td>vertex</td>
                    </tr>
                    <tr>
                        <td>person_josh</td>
                        <td>person</td>
                        <td>vertex</td>
                    </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}