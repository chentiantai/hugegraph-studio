/**
 * @file Desciption:
 * @author huanghaiping(huanghaiping02@baidu.com)
 * Created on 17/6/12
 */
import React from 'react';
import {connect} from 'react-redux';
import {changeHeadMode} from '../actions';
import {updateItem} from './actions';
import ChangeButton from '../commoncomponents/changebutton';
import DropDownMenu from '../commoncomponents/dropdownmenu';
import {
    TabsPage,
    Tabs,
    Tab,
    TabContents,
    TabContent
} from "../commoncomponents/tabspage";
import Graph from './graph';
import Code from './code';
import TableResult from './table';


class NotebookItem extends React.Component {

    constructor() {
        super();
        this.intialPanelHeight = 1;
        this.state = {
            fullScreen: false,
            itemPanelHeight: this.intialPanelHeight,
            view: false,
            isDelete: false
        }
        this.language = 'Gremlin';
    }

    componentDidMount() {
        var editor = ace.edit(this.geditor);
        ace.require('ace/ext/old_ie');
        ace.require('ace/ext/language_tools');
        editor.setTheme('ace/theme/chrome');
        editor.session.setMode('ace/mode/' + this.props.language);
        editor.setShowPrintMargin(false);
        editor.renderer.setShowGutter(false);
        editor.$blockScrolling = Infinity;
        editor.setAutoScrollEditorIntoView(true);
        editor.setOption('maxLines', 10);
        editor.setOption('minLines', 3);
        this.geditor.style.fontSize = '12px';
        editor.setValue(this.props.aceContent);
        editor.resize();
        editor.setOptions({
            enableBasicAutocompletion: true,
            enableSnippets: true,
            enableLiveAutocompletion: true
        });
        this.language = this.props.language;
    }

    componentWillUnmount() {
        if (!this.state.isDelete) {
            this.updateItem();
        }
    }

    updateItem = () => {
        let editorContent = ace.edit(this.geditor).getValue();
        let notebookId = this.props.notebookId;
        let cellId = this.props.itemId;
        let itemContent = {
            'id': cellId,
            'code': editorContent,
            'language': this.language
        }
        this.props.updateItem(itemContent, notebookId, cellId);
    }


    changeMenu = item => {
        let mode = item === 'Gremlin' ? 'ace/mode/gremlin' : 'ace/mode/markdown';
        // this.setState({'language':item});
        this.language = item;
        var editor = ace.edit(this.geditor);
        editor.session.setMode(mode);
        this.updateItem();
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
        this.props.changeHeadMode({
            fullScreen: cssFlag,
            cellId: this.props.itemId
        });
    }

    viewMode = cssFlag => {
        this.setState({
            view: cssFlag
        })
    }

    runMode = () => {
        this.setState({})
    }

    deleteItem = () => {
        this.setState({isDelete: true});
        this.props.onDelete(this.props.itemId);

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
                                        <DropDownMenu
                                            initLanguage={this.props.language}
                                            menuItems={items}
                                            onChange={this.changeMenu}
                                            id={this.props.itemId}/>
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
                                                className={this.props.deleteCss}
                                                onClick={this.deleteItem}>
                                            <i className="fa fa-times"
                                               aria-hidden="true"></i>
                                        </button>
                                    </div>
                                </div>

                                <div style={{
                                    clear: 'both',
                                    display: display
                                }}></div>

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
                                <div className="card-content">
                                    <TabsPage defaultTabkey={1}>
                                        <Tabs>
                                            <Tab btClassName="btn btn-default"
                                                 iClassName="fa fa-table"
                                                 tabKey={1}/>
                                            <Tab btClassName="btn btn-default"
                                                 iClassName="fa fa-code"
                                                 tabKey={2}/>
                                            <Tab btClassName="btn btn-default"
                                                 iClassName="fa fa-joomla"
                                                 tabKey={3}/>
                                        </Tabs>
                                        <TabContents>
                                            <TabContent tabKey={1}>
                                                <TableResult/>
                                            </TabContent>
                                            <TabContent tabKey={2}>
                                                <Code/>
                                            </TabContent>
                                            <TabContent tabKey={3}>
                                                <Graph
                                                    id={this.props.itemId + '_graph'}/>
                                            </TabContent>
                                        </TabContents>
                                    </TabsPage>
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
        );
    }
}


// Map Redux state to component props
function mapStateToProps(state) {
    return {
        fullScreen: state.headMode.fullScreen
    };
}

// Map Redux actions to component props
function mapDispatchToProps(dispatch) {
    return {
        changeHeadMode: mode => dispatch(changeHeadMode(mode)),
        updateItem: (editorContent, notebookId, itemId) => dispatch(updateItem(editorContent, notebookId, itemId))
    };
}

// Connected Component
export default  connect(
    mapStateToProps,
    mapDispatchToProps
)(NotebookItem);