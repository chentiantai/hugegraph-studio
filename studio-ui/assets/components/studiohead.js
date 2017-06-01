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
