/**
 * @file Desciption:
 * @author huanghaiping(huanghaiping02@baidu.com)
 * Created on 17/6/30
 */


import React from 'react';
import {connect} from 'react-redux';
import {changeLoadingMode} from '../actions';

export default  class Code extends React.Component {
    constructor() {
        super();
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (this.props.content === nextProps.content) {
            return false;
        } else {
            return true;
        }
    }

    render() {
        console.log("Code render");
        return (
            <div style={{height: this.props.height + 'px'}}
                 className="code-content " id={this.props.id}>

            </div>
        );
    }

    componentDidUpdate() {
        let paneJson = '#' + this.props.id;
        let json = JSON.stringify(this.props.content);
        $(paneJson).JSONView(json);
        this.loadDone();
    }

    componentDidMount() {
        let paneJson = '#' + this.props.id;
        let json = JSON.stringify(this.props.content);
        $(paneJson).JSONView(json);
        this.loadDone();
    }

    loadDone = () => {
        let loadingId = this.props.cellId + '_loading';
        document.getElementById(loadingId).style.display = 'none';
    }
}
