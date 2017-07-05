/**
 * @file Desciption:
 * @author huanghaiping(huanghaiping02@baidu.com)
 * Created on 17/6/30
 */


import React from 'react';

export default class Code extends React.Component {
    constructor() {
        super();
    }

    render() {
        return (
            <div id={this.props.id}>

            </div>
        );
    }

    componentDidMount() {
        let paneJson = '#' + this.props.id;
        let json = JSON.stringify(this.props.content);
        $(paneJson).JSONView(json);
    }
}