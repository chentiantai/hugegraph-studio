/**
 * @file Desciption:
 * @author huanghaiping(huanghaiping02@baidu.com)
 * Created on 17/7/20
 */
import React from 'react';
import {Tabs, TabPane} from '../commoncomponents/tabs';
import Graph from './graph';
import Code from './code';
import TableResult from './table';

export const TABLE = 'TABLE';
export const RAW = 'RAW';
export const GRAPH = 'GRAPH';


export default class GremlinResult extends React.Component {
    constructor() {
        super();
        this.state = {
            tabs: []
        }
    }

    componentWillReceiveProps(nextProps) {
        let tabs = this.getTabs(nextProps.content, nextProps.defaultTabkey);
        this.setState({tabs: tabs});
    }

    render() {
        let tabPanes = this.state.tabs.map((tab, index) => {
            if (tab.type === GRAPH) {
                return <TabPane key={index}>
                    <Graph id={this.props.cellId + '_graph'}
                           content={this.props.content}
                           height={this.props.height}
                           cellId={this.props.cellId}
                           notebookId={this.props.notebookId}/>
                </TabPane>
            } else if (tab.type === TABLE) {
                return <TabPane key={index}>
                    <TableResult content={this.props.content}
                                 height={this.props.height}
                                 cellId={this.props.cellId}/>
                </TabPane>
            } else {
                return <TabPane key={index}>
                    <Code id={this.props.cellId + '_code'}
                          content={this.props.content}
                          height={this.props.height}
                          cellId={this.props.cellId}/>
                </TabPane>
            }
        });

        return (
            <Tabs tabs={this.state.tabs}>
                {tabPanes}
            </Tabs>
        );
    }

    componentDidUpdate() {
        if (this.state.tabs.length === 0) {
            this.loadDone();
        }
    }


    componentDidMount() {
        let tabs = this.getTabs(this.props.content, this.props.defaultTabkey);
        if (tabs.length === 0) {
            this.loadDone();
        }
        this.setState({tabs: tabs});
    }


    loadDone = () => {
        let loadingId = this.props.cellId + '_loading';
        document.getElementById(loadingId).style.display = 'none';
    }

    getTabs = (content, defaultTabkey) => {
        let tabs = [];
        switch (content.type) {
            case 'NUMBER':
                tabs = [{
                    type: TABLE,
                    isActive: false,
                    exist: false,
                    label: 'fa fa-table'
                }, {
                    type: RAW,
                    isActive: false,
                    exist: false,
                    label: 'fa fa-code'
                }];
                break;
            case 'EMPTY':
                tabs = [{
                    type: RAW,
                    isActive: false,
                    exist: false,
                    label: 'fa fa-code'
                }];
                break;
            case 'EDGE':
            case 'VERTEX':
            case 'PATH':
                tabs = [{
                    type: GRAPH,
                    isActive: false,
                    exist: false,
                    label: 'fa fa-joomla'
                }, {
                    type: TABLE,
                    isActive: false,
                    exist: false,
                    label: 'fa fa-table'
                }, {
                    type: RAW,
                    isActive: false,
                    exist: false,
                    label: 'fa fa-code'
                }];
                break;
            default:
                tabs = [];
        }

        if (tabs.length > 0) {
            if (defaultTabkey === 1) {
                tabs[0].isActive = true;
                tabs[0].exist = true;
            } else {
                tabs = tabs.map(tab => {
                    if (tab.type === defaultTabkey) {
                        tab.isActive = true;
                        tab.exist = true;
                    }
                    return tab;
                })
            }
        }

        return tabs;
    }


}