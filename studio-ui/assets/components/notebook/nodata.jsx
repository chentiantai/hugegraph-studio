/**
 * @file Desciption:
 * @author liunanke(liunanke@baidu.com)
 * Created on 17/10/19
 */


import React from 'react';

export default  class NoData extends React.Component {
    constructor() {
        super();
        this.state = {
            showDetail: false
        }
    }

    render() {
        let display = this.state.showDetail ? 'block' : 'none';
        return (
            <div>
                <div className="alert alert-danger err_msg">
                    <div className="err_title">
                        Return data is null...
                        <span className="label label-danger detail"
                              onClick={this.showDetail}>Detail</span>
                    </div>
                    <div style={{
                        height: this.props.height + 'px',
                        display: display
                    }}
                         className="code-content" id={this.props.id}>
                    </div>
                </div>
            </div>
        );
    }

    showDetail = () => {
        this.setState({
            showDetail: !this.state.showDetail
        });
    }

    componentDidUpdate() {
        let paneJson = '#' + this.props.id;
        let json = JSON.stringify(this.props.content);
        $(paneJson).JSONView(json, {collapsed: true});
        this.loadDone();
    }

    componentDidMount() {
        let paneJson = '#' + this.props.id;
        let json = JSON.stringify(this.props.content);
        $(paneJson).JSONView(json, {collapsed: true});
        this.loadDone();
    }

    loadDone = () => {
        let loadingId = this.props.cellId + '_loading';
        document.getElementById(loadingId).style.display = 'none';
    }
}
