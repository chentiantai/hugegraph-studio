/**
 * @file Desciption:
 * @author huanghaiping(huanghaiping02@baidu.com)
 * Created on 17/7/20
 */

import React from 'react';

export default class ErrorResult extends React.Component {

    constructor() {
        super();
        this.state = {
            showDetail: false
        }
    }

    render() {
        let display = this.state.showDetail ? 'block' : 'none';
        let errorPanel = <div className="alert alert-danger err_msg">
                            <h5>{this.props.msg.title}</h5>
                         </div>;
        let  detailedMsg = this.props.msg.detailedMsg;
        if (detailedMsg !== undefined) {
            errorPanel = <div className="alert alert-danger err_msg">
                <h5>{this.props.msg.title}</h5>
                <div className="err_title">
                    {JSON.parse(detailedMsg.message).message}
                    <span className="label label-danger detail"
                          onClick={this.showDetail}>Detail</span>
                </div>
                <div id={this.props.cellId + '_error'}
                     className="detailed_err_msg"
                     style={{display: display}}>
                </div>
            </div>;
        }


        return (
            <div>
                {errorPanel}
            </div>
        );
    }

    showDetail = () => {
        this.setState({
            showDetail: !this.state.showDetail
        });
    }


    componentDidUpdate() {
        if (this.props.msg.detailedMsg !== undefined) {
            let paneJson = '#' + this.props.cellId + '_error';
            let json = this.formatMessage(this.props.msg.detailedMsg.message);
            $(paneJson).JSONView(json, {collapsed: false});
        }
        this.loadDone();
    }

    componentDidMount() {
        if (this.props.msg.detailedMsg !== undefined) {
            let paneJson = '#' + this.props.cellId + '_error';
            let json = this.formatMessage(this.props.msg.detailedMsg.message);
            $(paneJson).JSONView(json, {collapsed: false});
        }
        this.loadDone();
    }

    loadDone = () => {
        let loadingId = this.props.cellId + '_loading';
        document.getElementById(loadingId).style.display = 'none';
    }

    // replace \n\t with blank
    formatMessage = (message) => {

        if (message !== null || message !== undefined || message !== '') {
            return message.replace(/\\n\\t/g, "==>");
        } else {
            return message;
        }

    }


}