/**
 * @file Desciption:
 * @author huanghaiping(huanghaiping02@baidu.com)
 * Created on 17/7/6
 */

import React from 'react';
import {markdown} from 'markdown';

export default class MarkdownBrowser extends React.Component {
    constructor() {
        super();
    }

    render() {
        let mdContent = this.props.mdContent.replace(/\n+/g, function (ns) {
            if (ns.length == 1)
                return '  ' + ns
            return ns
        });
        let htmlContent = markdown.toHTML(mdContent);


        return (
            <div className="html-content" id={this.props.id}
                 dangerouslySetInnerHTML={{__html: htmlContent}}>
            </div>
        );
    }
}