/**
 * @file Desciption:
 * @author huanghaiping(huanghaiping02@baidu.com)
 * Created on 17/7/11
 */
import React from 'react';
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

export default class NotebookResult extends React.Component {
    constructor() {
        super();
    }


    render() {
        let result = <div/>;
        if (this.props.result !== null) {
            switch (this.props.language) {
                case 'Markdown':
                    let mdContent = "";
                    mdContent = this.props.result.data[0];
                    result = <MarkdownBrowser
                        id={this.props.itemId + '_markdown_browser'}
                        mdContent={mdContent}/>;
                    break;
                case 'Gremlin':
                    result = <div>Gremlin</div>;
                    break;
                default :
                    result = <div>default</div>;
            }
        } else {
            if (this.props.status !== null) {
                result =
                    <div>{this.props.status + ' : ' + this.props.msg}</div>;
            }
        }

        return (
            <div>
                {result}
            </div>
        );
    }

    componentDidUpdate() {
        console.log("NotebookResult componentDidUpdate");
    }

    // showResult = () => {
    //     switch (this.props.language) {
    //         case 'Markdown': {
    //             let mdContent = "";
    //             if (this.props.result !== null) {
    //                 mdContent = this.props.result.data[0];
    //             }
    //             return (
    //                 <MarkdownBrowser
    //                     id={this.props.itemId + '_markdown_browser'}
    //                     mdContent={mdContent}/>
    //             );
    //         }
    //         case 'Gremlin':
    //             return (<div>fefefe</div>);
    //         {/*<TabsPage defaultTabkey={1}>*/
    //         }
    //         {/*<Tabs>*/
    //         }
    //         {/*<Tab btClassName="btn btn-default"*/
    //         }
    //         {/*iClassName="fa fa-table"*/
    //         }
    //         {/*tabKey={1}*/
    //         }
    //         {/*onLoad={this.loadTab}/>*/
    //         }
    //         {/*<Tab btClassName="btn btn-default"*/
    //         }
    //         {/*iClassName="fa fa-code"*/
    //         }
    //         {/*tabKey={2}*/
    //         }
    //         {/*onLoad={this.loadTab}/>*/
    //         }
    //         {/*<Tab btClassName="btn btn-default"*/
    //         }
    //         {/*iClassName="fa fa-joomla"*/
    //         }
    //         {/*tabKey={3}*/
    //         }
    //         {/*onLoad={this.loadTab}/>*/
    //         }
    //         {/*</Tabs>*/
    //         }
    //         {/*<TabContents>*/
    //         }
    //         {/*<TabContent tabKey={1}*/
    //         }
    //         {/*onLoadDone={this.loadTabDone}>*/
    //         }
    //         {/*<TableResult*/
    //         }
    //         {/*content={this.props.result}/>*/
    //         }
    //         {/*</TabContent>*/
    //         }
    //         {/*<TabContent tabKey={2}*/
    //         }
    //         {/*onLoadDone={this.loadTabDone}>*/
    //         }
    //         {/*<Code*/
    //         }
    //         {/*id={this.props.itemId}*/
    //         }
    //         {/*content={this.props.result}*/
    //         }
    //         {/*height={this.props.cardContentHeight}/>*/
    //         }
    //         {/*</TabContent>*/
    //         }
    //         {/*<TabContent tabKey={3}*/
    //         }
    //         {/*onLoadDone={this.loadTabDone}>*/
    //         }
    //         {/*<Graph*/
    //         }
    //         {/*id={this.props.itemId}*/
    //         }
    //         {/*height={this.props.cardContentHeight}*/
    //         }
    //         {/*content={this.props.result}/>*/
    //         }
    //         {/*</TabContent>*/
    //         }
    //         {/*</TabContents>*/
    //         }
    //         {/*</TabsPage>);*/
    //         }
    //         default :
    //             return (
    //                 <div>
    //                     default:null
    //                 </div>);
    //     }
    // }


    // loadTab = () => {
    //
    // }
    //
    // loadTabDone = () => {
    //
    // }


}