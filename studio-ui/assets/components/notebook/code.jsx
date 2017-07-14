/**
 * @file Desciption:
 * @author huanghaiping(huanghaiping02@baidu.com)
 * Created on 17/6/30
 */


import React from 'react';
import {connect} from 'react-redux';
import {changeLoadingMode} from '../actions';

export  class Code extends React.Component {
    constructor() {
        super();
    }

    render() {
        return (
            <div style={{height: this.props.height + 'px'}}
                 className="code-content " id={this.props.id}>

            </div>
        );
    }

    componentDidMount() {
        let paneJson = '#' + this.props.id;
        let json = JSON.stringify(this.props.content);
        $(paneJson).JSONView(json);
        this.loadDone();
    }

    loadDone = () => {
        this.props.changeLoadingMode({
            loading: false,
            cellId: this.props.cellId
        });
    }
}

// Map Redux state to component props
function mapStateToProps(state) {
    return {
        loading: state.loadingMode.loading
    };
}

// Map Redux actions to component props
function mapDispatchToProps(dispatch) {
    return {
        changeLoadingMode: mode => dispatch(changeLoadingMode(mode))
    };
}

// Connected Component
export default  connect(
    mapStateToProps,
    mapDispatchToProps
)(Code);