/**
 * @file Desciption:
 * @author huanghaiping(huanghaiping02@baidu.com)
 * Created on 17/7/30
 */


import React from 'react';
import MarkdownBrowser from './markdownbrowser';
import GremlinResult from './gremlinresult';
import ErrorResult from './errorresult';
import DefaultResult from './defaultresult';
import {Gremlin, Markdown} from  './notebookcell';

export default class CellResult extends React.Component {
    constructor() {
        super();
    }

    render() {
        let result = this.showResult();

        return (
            <div>
                {result}
            </div>
        );
    }


    showResult = () => {
        let resultPanel = null;
        let result = this.props.result;
        let language = this.props.language.toLowerCase().replace(/[a-z]/, (L) => L.toUpperCase());
        let status = this.props.status;

        if ((status >= 200 || status <= 300) && result !== null) {
            switch (language) {
                case Markdown:
                    let mdContent = "";
                    if (result.type === 'MARKDOWN') {
                        mdContent = result.data[0];
                    } else {
                        mdContent = "";
                    }
                    resultPanel =
                        <MarkdownBrowser
                            id={this.props.cellId + '_markdown_browser'}
                            mdContent={mdContent}
                            cellId={this.props.cellId}
                            height={this.props.className.markdownHeight}/>
                    break;
                case Gremlin:
                    let defaultTabKey = 1;
                    if (this.props.viewSettings !== null) {
                        if (this.props.viewSettings.viewType !== null) {
                            defaultTabKey = this.props.viewSettings.viewType;
                        }
                    }
                    resultPanel = <GremlinResult defaultTabKey={defaultTabKey}
                                                 cellId={this.props.cellId}
                                                 notebookId={this.props.notebookId}
                                                 content={result}
                                                 height={this.props.className.height}
                                                 viewSettings={this.props.viewSettings}/>
                    break;
                default :
                    resultPanel = <div/>;
            }
        } else {
            if (status !== null && (status < 200 || status > 300)) {
                resultPanel =
                    <ErrorResult status={status}
                                 msg={this.props.msg}
                                 cellId={this.props.cellId}/>;
            } else {
                resultPanel = <DefaultResult
                    cellId={this.props.cellId}/>;
            }
        }
        return resultPanel;
    }


}