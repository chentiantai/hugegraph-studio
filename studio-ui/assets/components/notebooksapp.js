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
import {NotebooksCardAddApp} from './notebooksApp/notecardadd';
// import NoteCard from './notebooksApp/notecard';
// import NoteCardAdd from './notebooksApp/notecardadd';
require('react-hot-loader/patch');

export default class NotebooksApp extends React.Component {

    render() {
        return (
            <div>
                <Head/>
                <StudioHead/>
                <Finally/>
            </div>
        );
    }
}

class Finally extends React.Component {
    render() {
        alert('dfd');
        return (
            <div className="container">
                <div className="row">

                    <NotebookCards/>
                </div>
            </div>
        );
    }
}


class NotebookCards extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div className="notebook-cards">
                <NotebooksCardAddApp />
            </div>
        );
    }
}





