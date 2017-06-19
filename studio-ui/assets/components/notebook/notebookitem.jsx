/**
 * @file Desciption:
 * @author huanghaiping(huanghaiping02@baidu.com)
 * Created on 17/6/12
 */
import React from 'react';
import DropDownMenu from '../commoncomponents/dropdownmenu';

export default class NotebookItem extends React.Component {
    constructor() {
        super();
    }

    componentDidMount() {
        var editor = ace.edit(this.geditor);
        ace.require('ace/ext/old_ie');
        ace.require('ace/ext/language_tools');
        editor.setTheme('ace/theme/chrome');
        editor.session.setMode('ace/mode/gremlin');
        editor.setShowPrintMargin(false);
        editor.setAutoScrollEditorIntoView(true);
        editor.setOption('maxLines', 30);
        editor.setOption('minLines', 10);
        this.geditor.style.fontSize = '16px';
        editor.resize();
        editor.setOptions({
            enableBasicAutocompletion: true,
            enableSnippets: true,
            enableLiveAutocompletion: true
        });
        console.log('componentDidMount');
    }


    changeMenu = item => {
        console.log(item);
    }


    render() {
        let items = ['Gremlin', 'Markdown'];
        return (
            <div className="row card">
                <div className="col-md-12">
                    <div className="panel panel-default">
                        <div className="panel-body">
                            <div className="panel-body">
                                <div className="card-header">
                                    <div className="pull-left">
                                        <DropDownMenu menuItems={items} onChange={this.changeMenu}/>
                                    </div>
                                    <div className="btn-group btn-group-sm pull-right" role="group">
                                        <button type="button" className="btn btn-link ">
                                            <i className="fa fa-play" aria-hidden="true"></i>
                                        </button>
                                        <button type="button" className="btn btn-link ">
                                            <i className="fa fa-expand" aria-hidden="true"></i>
                                            {/*<!--<i className="fa fa-compress" aria-hidden="true"></i>-->*/}
                                        </button>
                                        <button type="button" className="btn btn-link ">
                                            <i className="fa fa-eye" aria-hidden="true"></i>
                                            {/*<!--<i className="fa fa-eye-slash" aria-hidden="true"></i>-->*/}
                                        </button>
                                        <button type="button" className="btn btn-link ">
                                            <i className="fa fa-cog" aria-hidden="true"></i>
                                        </button>
                                    </div>
                                </div>

                                <div style={{clear: 'both'}}></div>


                                <div className="card-editor">
                                    <pre id="editor" ref={el => this.geditor = el}></pre>
                                    <pre id="editorM" style={{display: 'none'}}></pre>
                                </div>


                                <div className="card-para">
                                    <form>
                                        <div className="form-group">
                                            <label>maxAge</label>
                                            <input type="text" id="maxAge1" placeholder="maxAge"/>
                                        </div>
                                    </form>
                                </div>


                                <div className="card-content-toolbox btn-toolbar">
                                    <div className="btn-group btn-group-sm" role="group">
                                        <button type="button" className="btn btn-default">
                                            <i className="fa fa-table" aria-hidden="true"></i>
                                        </button>
                                        <button type="button" className="btn btn-default">
                                            <i className="fa fa-line-chart" aria-hidden="true"></i>
                                        </button>
                                        <button type="button" className="btn btn-default">
                                            <i className="fa fa-pie-chart" aria-hidden="true"></i>
                                        </button>
                                        <button type="button" className="btn btn-default">
                                            <i className="fa fa-area-chart" aria-hidden="true"></i>
                                        </button>
                                        <button type="button" className="btn btn-default">
                                            <i className="fa fa-bar-chart" aria-hidden="true"></i>
                                        </button>
                                        <button type="button" className="btn btn-default">
                                            <i className="fa fa-picture-o" aria-hidden="true"></i>
                                        </button>
                                    </div>
                                    <div className="btn-group btn-group-sm" role="group">
                                        <button type="button" className="btn btn-default">
                                            <i className="fa fa-floppy-o" aria-hidden="true"></i>
                                        </button>
                                    </div>
                                </div>
                                <div className="card-content">
                                    <div id="graph" className="graph"></div>
                                </div>
                                <div className="card-footer">
                                    Real-time Success. 1 element returned. Duration: 0.186 s.
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}