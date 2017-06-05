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
import NoteCard from './notebooksApp/notecard';
import NoteCardAdd from './notebooksApp/notecardadd';
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
        this.state = {
            list: [],
            count: 0,
        };
    }

    changeList = e => {
        // console.log(e)
        let count = this.state.count;
        const list = this.state.list.concat();
        if (e.type === 'add') {
            list.push(`Card: ${count}`);
            count++;
        } else if (e.type === 'remove') {
            list.splice(e.eventKey, 1);
            count--;
        }

        this.setState({list, count});
    }

    render() {
        const {list} = this.state;
        return (
            <div className="notebook-cards">
                <NoteCardAdd changeList={this.changeList}/>
                {list.map((count, i) => <NoteCard key={i} eventKey={i}
                                                  count={count}
                                                  changeList={this.changeList}/>)}
            </div>
        );
    }
}





