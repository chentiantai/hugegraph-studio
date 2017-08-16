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
            return ns;
        });
        let htmlContent = markdown.toHTML(mdContent);

        return (
            <div id={this.props.id}
                 className="html-content"
                 style={{minHeight: this.props.height + 'px'}}
                 dangerouslySetInnerHTML={{__html: htmlContent}}>
            </div>
        );
    }

    componentDidUpdate() {
        this.loadDone();
    }

    componentDidMount() {
        this.loadDone()
    }

    loadDone = () => {
        let loadingId = this.props.cellId + '_loading';
        document.getElementById(loadingId).style.display = 'none';
    }
}