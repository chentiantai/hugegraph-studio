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
        let containerCss = this.props.containerCss === undefined ? 'container' : this.props.containerCss;

        return (
            <div>
                <nav className="navbar navbar-inverse">
                    <div className={containerCss}>
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
                            <ul className="nav navbar-nav navbar-right">
                                <li className="dropdown">
                                    <a href="./index.html" className="dropdown-toggle" data-toggle="dropdown"
                                       role="button"
                                       aria-haspopup="true"
                                       aria-expanded="false">setting <span className="caret"></span></a>
                                    <ul className="dropdown-menu">
                                        <li><a href="./index.html">notebooks</a></li>
                                        <li role="separator" className="divider"></li>
                                        <li><a href="./connections.html">connections</a></li>
                                    </ul>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>
        );
    }
}






