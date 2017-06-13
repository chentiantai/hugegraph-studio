/**
 * @file Desciption:
 * @author huanghaiping(huanghaiping02@baidu.com)
 * Created on 17/6/12
 */
import React from 'react';
import NotebookItem from './notebookitem';
export default class NotebookBoard extends React.Component {
    render() {
        return (
            <div className="container ">
                <NotebookItem/>
                <NoteBookItemAdd></NoteBookItemAdd>
            </div>
        );
    }
}


function NoteBookItemAdd() {
    return (
        <div className="row card">
            <div className="col-md-12 col-box card-add">
                <div className="card-add-line"></div>
                <div className="card-add-btn">
                    <div className="btn-group btn-group-sm" role="group">
                        <button type="button" className="btn btn-default">
                            <i className="fa fa-plus" aria-hidden="true"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}