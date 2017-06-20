/**
 * @file Desciption:
 * @author huanghaiping(huanghaiping02@baidu.com)
 * Created on 17/6/12
 */
import '../vendors/bootstrap/css/bootstrap.min.css';
import '../css/main.css';
import React from 'react';
import Head from './head';
import NotebookBoard from './notebook/notebookboard';
import StudioHead from './studiohead';
import 'whatwg-fetch';
import {connect} from 'react-redux';
import {itemScreenMode} from './notebook/actions';

class NotebookApp extends React.Component {
    render() {
        return (
            <div>
                <Head
                    containerCss={this.props.screenMode.fullScreen ? 'container-fluid' : 'container'}/>
                <StudioHead
                    display={this.props.screenMode.fullScreen ? 'none' : 'block'}/>
                <NotebookBoard/>
            </div>
        );
    }
}


// Map Redux state to component props
function mapStateToProps(state) {
    return {
        screenMode: state.screenMode
    };
}

// Map Redux actions to component props
function mapDispatchToProps(dispatch) {
    return {
        itemScreenMode: (flag, itemKey) => dispatch(itemScreenMode(flag, itemKey))
    };
}

// Connected Component
export default  connect(
    mapStateToProps,
    mapDispatchToProps
)(NotebookApp);