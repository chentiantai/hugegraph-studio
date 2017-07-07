/**
 * @file Desciption:
 * @author huanghaiping(huanghaiping02@baidu.com)
 * Created on 17/6/12
 */
import React from 'react';
import {connect} from 'react-redux';
import {changeHeadMode} from '../actions';
import {updateItem, updateItemSuccess, runMode} from './actions';
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
import MarkdownBrowser from './markdownbrowser';

const headHeight = 32;
const pannelbodyPadding = 10;
const pannelbodyBottomMargin = 10;
const footer = 17;
const cardContentToolbox = 30;
const cardContentPadding = 10;
const cardContentBottomMargin = 8;
const cardHeadHeight = 40;

class NotebookItem extends React.Component {

    constructor() {
        super();
        this.initPanelHeight = 1;
        this.initCardContentHeight = 250;
        this.state = {
            fullScreen: false,
            itemPanelHeight: this.initPanelHeight,
            view: false,
            isDelete: false,
            cardContentHeight: this.initCardContentHeight,
            cardEditHeight: 1
        }


        this.language = '';//the variable of NotebookItem
    }

    componentDidMount() {
        let editor = ace.edit(this.geditor);
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
        editor.getSession().on('change', this.sycnItemState);
        this.language = this.props.language;
    }


    componentWillUnmount() {
        if (!this.state.isDelete) {
            this.updateItem(false);
        }
    }

    render() {
        let screenMode = this.state.fullScreen ? 'container-fluid full-screen' : 'container';
        let screenCol = this.state.fullScreen ? 'col-md-12 full-screen-col-md-12' : 'col-md-12';
        let items = ['Gremlin', 'Markdown'];
        let display = this.state.view ? 'none' : 'block';
        let language = this.props.language.toLowerCase().replace(/[a-z]/, (L) => L.toUpperCase());
        let cardContentResult = this.showResult(language);
        let cardFooterResult = this.showFooter(language);

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
                                            initLanguage={language}
                                            menuItems={items}
                                            onChange={this.changeMenu}
                                            id={this.props.itemId}/>
                                    </div>
                                    <div
                                        className="btn-group btn-group-sm pull-right"
                                        role="group">
                                        <button type="button"
                                                className="btn btn-link "
                                                onClick={this.runMode}>
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
                                     ref={el => this.cardEditor = el}
                                     style={{display: display}}>
                                    <pre id="editor"
                                         ref={el => this.geditor = el}></pre>
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
                                    {cardContentResult}
                                </div>


                                <div className="card-footer">
                                    {cardFooterResult}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    sycnItemState = () => {
        let editorContent = ace.edit(this.geditor).getValue();
        let cellId = this.props.itemId;
        let itemContent = {
            'id': cellId,
            'code': editorContent,
            'language': this.language
        }
        this.props.sycnItemState(itemContent);
    }

    runMode = () => {
        this.updateItem(true);
    }

    updateItem = (runFlag) => {
        let editorContent = ace.edit(this.geditor).getValue();
        let notebookId = this.props.notebookId;
        let cellId = this.props.itemId;
        let itemContent = {
            'id': cellId,
            'code': editorContent,
            'language': this.language
        }
        this.props.updateItem(itemContent, notebookId, cellId, runFlag);
    }


    changeMenu = language => {
        let mode = language === 'Gremlin' ? 'ace/mode/gremlin' : 'ace/mode/markdown';
        this.language = language;

        let editor = ace.edit(this.geditor);
        editor.session.setMode(mode);
        this.updateItem(false);
    }


    computeHeight = () => {
        let screenHeight = window.innerHeight || document.documentElement.clientHeight;
        let itemPanelHeight = screenHeight - headHeight;
        return itemPanelHeight;
    }

    screenMode = cssFlag => {
        let itemPanelHeight = cssFlag ? this.computeHeight() : this.initPanelHeight;
        let cardContentHeight = this.cardContentHeight(cssFlag, this.state.view);
        this.setState({
            fullScreen: cssFlag,
            itemPanelHeight: itemPanelHeight,
            cardContentHeight: cardContentHeight
        });
        this.props.changeHeadMode({
            fullScreen: cssFlag,
            cellId: this.props.itemId
        });
    }

    cardContentHeight = (fullScreenMode, viewMode) => {
        let itemPanelHeight = fullScreenMode ? this.computeHeight() : this.initPanelHeight;
        if (fullScreenMode) {
            if (viewMode) {
                let placeHeight = pannelbodyPadding + pannelbodyBottomMargin + footer + cardContentPadding + cardContentBottomMargin + cardContentToolbox;
                return itemPanelHeight - placeHeight;
            } else {
                let placeHeight = pannelbodyPadding + pannelbodyBottomMargin + footer + cardContentPadding + cardContentBottomMargin + cardContentToolbox;
                return itemPanelHeight - cardHeadHeight - this.state.cardEditHeight - placeHeight;
            }
        } else {
            return this.initCardContentHeight;
        }

    }


    viewMode = cssFlag => {
        let cardContentHeight = this.cardContentHeight(this.state.fullScreen, cssFlag);
        if (cssFlag) {
            this.setState({
                cardEditHeight: this.cardEditor.clientHeight
            });
        }
        this.setState({
            view: cssFlag,
            cardContentHeight: cardContentHeight
        })
    }

    deleteItem = () => {
        this.setState({isDelete: true});
        this.props.onDelete(this.props.itemId);

    }

    showResult = (language) => {
        switch (language) {
            case 'Markdown': {
                let mdContent = "";
                if (this.props.result !== null) {
                    mdContent = this.props.aceContent;
                }
                return (
                    <MarkdownBrowser
                        id={this.props.itemId + '_markdown_browser'}
                        mdContent={mdContent}/>
                );
            }
            case 'Gremlin':
                return (
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
                                <TableResult
                                    content={this.props.result}/>
                            </TabContent>
                            <TabContent tabKey={2}>
                                <Code
                                    id={this.props.itemId + '_code'}
                                    content={this.props.result}
                                    height={this.state.cardContentHeight}/>
                            </TabContent>
                            <TabContent tabKey={3}>
                                <Graph
                                    id={this.props.itemId + '_graph'}
                                    height={this.state.cardContentHeight}
                                    content={this.props.result}/>
                            </TabContent>
                        </TabContents>
                    </TabsPage>);
            default :
                return (
                    <div>
                    </div>);
        }
    }

    showFooter = language => {
        switch (language) {
            case 'Markdown': {
                if(this.props.result==null){
                    return <div/>;
                }else{
                    return (

                        <div>
                            Real-time Success. 1 element returned. Duration {this.props.result.duration%1000} s
                        </div>
                    );
                }

            }
            case 'Gremlin':
                return (
                    <div>
                        Real-time Success. 1 element returned.
                        Duration: 0.186 s.
                    </div>);
            default :
                return <div/>
        }
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
        updateItem: (editorContent, notebookId, itemId, runFlag) => dispatch(updateItem(editorContent, notebookId, itemId, runFlag)),
        sycnItemState: (itemContent) => dispatch(updateItemSuccess(itemContent)),
        runMode: (notebookId, cellId) => dispatch(runMode(notebookId, cellId))
    };
}

// Connected Component
export default  connect(
    mapStateToProps,
    mapDispatchToProps
)(NotebookItem);