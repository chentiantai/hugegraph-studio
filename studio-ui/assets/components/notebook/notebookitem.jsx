/**
 * @file Desciption:
 * @author huanghaiping(huanghaiping02@baidu.com)
 * Created on 17/6/12
 */
import React from 'react';
import {connect} from 'react-redux';
import {itemScreenMode} from './actions';
import ChangeButton from '../commoncomponents/changebutton';
import DropDownMenu from '../commoncomponents/dropdownmenu';


class NotebookItem extends React.Component {

    constructor() {
        super();
        this.intialPanelHeight = 250;
        this.state = {
            fullScreen: false,
            itemPanelHeight: this.intialPanelHeight,
            view: false
        }
    }

    componentDidMount() {
        var editor = ace.edit(this.geditor);
        ace.require('ace/ext/old_ie');
        ace.require('ace/ext/language_tools');
        editor.setTheme('ace/theme/chrome');
        editor.session.setMode('ace/mode/gremlin');
        editor.setShowPrintMargin(false);
        editor.setAutoScrollEditorIntoView(true);
        editor.setOption('maxLines', 10);
        editor.setOption('minLines', 3);
        this.geditor.style.fontSize = '12px';
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


    computeHeight = () => {
        let screenHeight = window.innerHeight || document.documentElement.clientHeight;
        let height = 32;
        let itemPanelHeight = screenHeight - height;
        return itemPanelHeight;
    }

    screenMode = cssFlag => {
        let itemPanelHeight = cssFlag ? this.computeHeight() : this.intialPanelHeight;
        this.setState({
            fullScreen: cssFlag,
            itemPanelHeight: itemPanelHeight
        });
        this.props.itemScreenMode(cssFlag, this.props.itemKey);
    }

    viewMode = cssFlag => {
        this.setState({
            view: cssFlag
        })
    }

    runMode = ()=> {
        this.setState({})
    }


    render() {
        let screenMode = this.state.fullScreen ? 'container-fluid full-screen' : 'container';
        let screenCol = this.state.fullScreen ? 'col-md-12 full-screen-col-md-12' : 'col-md-12';
        let items = ['Gremlin', 'Markdown'];
        let display = this.state.view ? 'none' : 'block';


        return (
            <div className={screenMode} style={{display: this.props.display}}>
                <div className="row card">
                    <div className={screenCol}>
                        <div className="panel panel-default"
                             style={{minHeight: this.state.itemPanelHeight}}>
                            <div className="panel-body">
                                <div className="card-header">
                                    <div className="pull-left"
                                         style={{display: display}}>
                                        <DropDownMenu menuItems={items}
                                                      onChange={this.changeMenu}/>
                                    </div>
                                    <div
                                        className="btn-group btn-group-sm pull-right"
                                        role="group">
                                        <button type="button"
                                                className="btn btn-link ">
                                            <i className="fa fa-play"
                                               aria-hidden="true"></i>
                                        </button>
                                        <ChangeButton defaultCss="fa fa-expand"
                                                      changeCss="fa fa-compress"
                                                      onClick={this.screenMode}/>
                                        <ChangeButton defaultCss="fa fa-eye"
                                                      changeCss="fa fa-eye-slash"
                                                      onClick={this.viewMode}/>
                                        <button type="button"
                                                className="btn btn-link ">
                                            <i className="fa fa-cog"
                                               aria-hidden="true"></i>
                                        </button>
                                    </div>
                                </div>

                                <div style={{clear: 'both'}}></div>

                                <div className="card-editor"
                                     style={{display: display}}>
                                    <pre id="editor"
                                         ref={el => this.geditor = el}></pre>
                                    <pre id="editorM"
                                         style={{display: 'none'}}></pre>
                                </div>

                                <div className="card-para">
                                    <form>
                                        <div className="form-group">
                                            <label>maxAge</label>
                                            <input type="text" id="maxAge1"
                                                   placeholder="maxAge"/>
                                        </div>
                                    </form>
                                </div>


                                <div
                                    className="card-content-toolbox btn-toolbar">
                                    <div className="btn-group btn-group-sm"
                                         role="group">
                                        <button type="button"
                                                className="btn btn-default">
                                            <i className="fa fa-table"
                                               aria-hidden="true"></i>
                                        </button>
                                        <button type="button"
                                                className="btn btn-default">
                                            <i className="fa fa fa-code"
                                               aria-hidden="true"></i>
                                        </button>
                                        <button type="button"
                                                className="btn btn-default">
                                            <i className="fa fa-joomla"
                                               aria-hidden="true"></i>
                                        </button>
                                        {/*<button type="button"*/}
                                        {/*className="btn btn-default">*/}
                                        {/*<i className="fa fa-line-chart"*/}
                                        {/*aria-hidden="true"></i>*/}
                                        {/*</button>*/}
                                        {/*<button type="button"*/}
                                        {/*className="btn btn-default">*/}
                                        {/*<i className="fa fa-pie-chart"*/}
                                        {/*aria-hidden="true"></i>*/}
                                        {/*</button>*/}
                                        {/*<button type="button"*/}
                                        {/*className="btn btn-default">*/}
                                        {/*<i className="fa fa-area-chart"*/}
                                        {/*aria-hidden="true"></i>*/}
                                        {/*</button>*/}
                                        {/*<button type="button"*/}
                                        {/*className="btn btn-default">*/}
                                        {/*<i className="fa fa-bar-chart"*/}
                                        {/*aria-hidden="true"></i>*/}
                                        {/*</button>*/}
                                        {/*<button type="button"*/}
                                        {/*className="btn btn-default">*/}
                                        {/*<i className="fa fa-picture-o"*/}
                                        {/*aria-hidden="true"></i>*/}
                                        {/*</button>*/}
                                    </div>
                                    <div className="card-content">
                                        <div id="graph" className="graph"></div>
                                    </div>
                                    <div className="card-footer">
                                        Real-time Success. 1 element returned.
                                        Duration: 0.186 s.
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}


// Map Redux state to component props
function mapStateToProps(state) {
    return {
        fullScreen: state.fullScreen
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
)(NotebookItem);