/**
 * @file Desciption:
 * @author huanghaiping(huanghaiping02@baidu.com)
 * Created on 17/7/20
 */

import React from 'react';

export default class ErrorResult extends React.Component {



    render() {
        console.log('ErrorResult render');
        return (
            <div
                className="alert alert-danger">{this.props.status + ' : ' + this.props.msg}</div>
        );
    }

    componentDidUpdate() {
        this.loadDone();
    }

    componentDidMount() {
        this.loadDone();
    }

    loadDone = () => {
        let loadingId = this.props.cellId + '_loading';
        document.getElementById(loadingId).style.display = 'none';
    }
}