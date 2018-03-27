/*
 * Copyright 2017 HugeGraph Authors
 *
 * Licensed to the Apache Software Foundation (ASF) under one or more
 * contributor license agreements. See the NOTICE file distributed with this
 * work for additional information regarding copyright ownership. The ASF
 * licenses this file to You under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations
 * under the License.
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
                case Markdown: {
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
                }
                case Gremlin: {
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
                }
                default:
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