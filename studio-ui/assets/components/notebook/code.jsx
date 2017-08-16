/**
 * @file Desciption:
 * @author huanghaiping(huanghaiping02@baidu.com)
 * Created on 17/6/30
 */


import React from 'react';

export default  class Code extends React.Component {
    constructor() {
        super();
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (document.getElementById(this.props.id) !== null) {
            document.getElementById(this.props.id).style.height = nextProps.height + 'px';
        }
        if (this.props.content === nextProps.content) {
            return false;
        } else {
            return true;
        }
    }

    render() {
        return (
            <div style={{height: this.props.height + 'px'}}
                 className="code-content " id={this.props.id}>

            </div>
        );
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
