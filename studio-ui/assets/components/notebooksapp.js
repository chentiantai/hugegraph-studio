/**
 * @file Desciption:
 * @author1 huanghaiping(huanghaiping02@baidu.com)
 * @author2 liunanke(liunanke@baidu.com)
 * Created on 17/5/31
 */
import '../vendors/bootstrap/css/bootstrap.min.css';
import '../css/main.css';
import React from 'react';
import Head from './head';
import StudioHead from './studiohead';
import NoteCardBoard from './notebooksApp/notecardboard';
import ConnectionsBoard from './connection/connectionboard';
import NoteBookBoard from './notebook/notebookboard';
import {connect} from 'react-redux';
import {itemScreenMode} from './notebook/actions';
import 'whatwg-fetch';
import {HashRouter as Router, Route, Switch} from 'react-router-dom';
require('react-hot-loader/patch');

class NotebooksApp extends React.Component {

    constructor() {
        super();
    }

    render() {
        return (
            <Router >
                <div>

                    <Head fluid={this.props.screenMode.fullScreen}/>
                    <StudioHead display={this.props.screenMode.fullScreen ? 'none' : 'block'}/>
                    <Switch>
                        <Route exact path="/" component={NoteCardBoard}/>
                        <Route path="/index" component={NoteCardBoard}/>
                        <Route path="/connections" component={ConnectionsBoard}/>
                        <Route path="/notebook/:id" component={NoteBookBoard}/>
                        <Route component={NoteCardBoard}/>
                    </Switch>
                </div>
            </Router>
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
)(NotebooksApp);



