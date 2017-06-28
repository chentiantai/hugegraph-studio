/**
 * @file Desciption:
 * @author huanghaiping(huanghaiping02@baidu.com)
 * Created on 17/5/31
 */
import '../vendors/bootstrap/css/bootstrap.min.css';
import '../css/main.css';
import React from 'react';
import Head from './head';
import ConnectionsBoard from './connection/connectionboard';
import StudioHead from './studiohead';
import 'whatwg-fetch';

export default class ConnectionsApp extends React.Component {
    render() {
        return (
            <div>
                <Head/>
                <StudioHead/>
                <ConnectionsBoard/>
            </div>
        );
    }
}
