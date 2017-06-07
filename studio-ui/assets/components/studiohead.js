/**
 * @file Desciption
 * @author liunanke(liunanke@baidu.com)
 * Created on 2017/6/1.
 */
import '../vendors/bootstrap/css/bootstrap.min.css';
import '../css/main.css';
import React from 'react';

export default class StudioHead extends React.Component {

    render() {
        return (
            <div>
                <div className="studio-header">
                    <div className="container">
                        <div className="row">
                            <div className="header-title">
                                <h1><i className="fa fa-book" aria-hidden="true"></i>HugeGraph Notebook Quick Start</h1>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
