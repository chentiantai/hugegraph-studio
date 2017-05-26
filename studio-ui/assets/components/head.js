/**
 * @file Desciption:
 * @author huanghaiping(huanghaiping02@baidu.com)
 * Created on 17/5/31
 */

import '../vendors/bootstrap/css/bootstrap.min.css';
import '../css/main.css';
import React from 'react';

export default class Head extends React.Component {

    render() {
        return (
            <div>
                <nav className="navbar navbar-inverse">
                    <div className="container">
                        <div className="navbar-header">
                            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse"
                                    data-target="#studio-navbar-collapse" aria-expanded="false">
                                <span className="sr-only">Toggle navigation</span>
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                            </button>
                            <a className="navbar-brand" href="#"><img src='../images/logo.png'/></a>
                        </div>

                        <div className="collapse navbar-collapse" id="studio-navbar-collapse">
                            <ul className="nav navbar-nav">
                                <li className="dropdown">
                                    <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button"
                                       aria-haspopup="true"
                                       aria-expanded="false">Notebook <span className="caret active"></span></a>
                                    <ul className="dropdown-menu">
                                        <li><a href="#"> <i className="fa fa-plus" aria-hidden="true"></i>&nbsp;
                                            Notebook</a></li>
                                        <li role="separator" className="divider"></li>
                                        <li><a href="#">logout</a></li>
                                    </ul>
                                </li>
                            </ul>
                            <ul className="nav navbar-nav navbar-right">
                                <li className="dropdown">
                                    <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button"
                                       aria-haspopup="true"
                                       aria-expanded="false">anonymous <span className="caret"></span></a>
                                    <ul className="dropdown-menu">
                                        <li><a href="#">connections</a></li>
                                        <li role="separator" className="divider"></li>
                                        <li><a href="#">logout</a></li>
                                    </ul>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>

                <div className="studio-header">
                    <div className="container">
                        <div className="row">
                            <div className="header-title">
                                <h1><i className="fa fa-book" aria-hidden="true"></i>HugeGraph Notebook Quick Start</h1>
                            </div>
                            <div className="header-control-middle">
                                <div className="btn-group btn-group-sm" role="group">
                                    <button type="button" className="btn btn-default"><i className="fa fa-play"
                                                                                         aria-hidden="true"></i>
                                    </button>
                                    <button type="button" className="btn btn-default"><i className="fa fa-floppy-o"
                                                                                         aria-hidden="true"></i>
                                    </button>
                                    <button type="button" className="btn btn-default"><i className="fa fa-arrows-alt"
                                                                                         aria-hidden="true"></i>
                                    </button>
                                </div>
                            </div>
                            <div className="header-control-right">
                                <div className="btn-group btn-group-sm pull-right" role="group">
                                    <button type="button" className="btn btn-default"><i className="fa fa-cog"
                                                                                         aria-hidden="true"></i>
                                    </button>
                                    <button type="button" className="btn btn-default"><i className="fa fa-keyboard-o"
                                                                                         aria-hidden="true"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}






