/**
 * @file Desciption
 * @author liunanke(liunanke@baidu.com)
 * Created on 2017/6/1.
 */
import '../vendors/bootstrap/css/bootstrap.min.css';
import '../css/main.css';
import React from 'react';
import Schema from './schema';


export default class StudioHead extends React.Component {

    constructor() {
        super();
        this.state = {
            showSchema: false
        };
    }

    render() {
        let display = this.props.display === undefined ? 'block' : this.props.display;
        let name = this.props.name === undefined ? 'HugeGraph Notebook Quick Start' : this.props.name;
        let headRight = this.props.notebook === undefined || this.props.notebook.cells.length === 0 ? null
            : <div className="header-control-right">
                <div className="graphName">
                    {this.props.notebook.connection.graphName}
                </div>
                <div className="schema-bt">
                    <ul className="nav nav-pills">
                        <li role="presentation"><a
                            onClick={this.showSchemaView}>Schema</a>
                        </li>
                    </ul>
                </div>
            </div>;
        let schemaView = null;
        if (this.props.notebook !== undefined && this.props.notebook.cells.length >= 0 && this.state.showSchema) {
            schemaView = <div className="schema-view"
                              style={{display: this.state.showSchema ? 'block' : 'none'}}>
                <Schema notebook={this.props.notebook}/>
            </div>;
        };


        return (
            <div style={{display: display}}>
                <div className="studio-header">
                    <div className="container">
                        <div className="row">
                            <div className="header-title">
                                <h1><i className="fa fa-book"
                                       aria-hidden="true"></i>{name}</h1>
                            </div>
                            {headRight}

                        </div>
                    </div>
                </div>
                {schemaView}
            </div>
        );
    }

    showSchemaView = () => {
        this.setState({showSchema: !this.state.showSchema});
    }
}
