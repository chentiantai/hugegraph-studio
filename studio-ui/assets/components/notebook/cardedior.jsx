/**
 * @file Desciption:
 * @author huanghaiping(huanghaiping02@baidu.com)
 * Created on 17/7/29
 */

import React from 'react';
import {Gremlin, GremlinMode, MarkdownMode} from  './notebookcell';

export default class CardEditor extends React.Component {

    shouldComponentUpdate(nextProps, nextState) {
        if (this.props.code === nextProps.code && this.props.language == nextProps.language) {
            return false;
        } else {
            return true;
        }
    }

    render() {
        return (
            <div>
                <pre id={this.props.id} ref={el => this.editor = el}></pre>
            </div>
        );
    }

    componentDidUpdate() {
        let language = this.props.language.toLowerCase().replace(/[a-z]/, (L) => L.toUpperCase());
        let mode = language === Gremlin ? GremlinMode : MarkdownMode;
        let editor = ace.edit(this.editor);
        editor.session.setMode(mode);
        if (this.props.code !== null) {
            editor.setValue(this.props.code);
        } else {
            editor.setValue('');
        }
    }

    componentDidMount() {
        let language = this.props.language.toLowerCase().replace(/[a-z]/, (L) => L.toUpperCase());
        let mode = language === Gremlin ? GremlinMode : MarkdownMode;
        let editor = ace.edit(this.editor);
        ace.require('ace/ext/old_ie');
        ace.require('ace/ext/language_tools');
        editor.setTheme('ace/theme/chrome');
        editor.session.setMode(mode);
        editor.setShowPrintMargin(false);
        editor.renderer.setShowGutter(false);
        editor.$blockScrolling = Infinity;
        editor.setAutoScrollEditorIntoView(true);
        editor.setOption('maxLines', 10);
        editor.setOption('minLines', 3);
        this.editor.style.fontSize = '12px';
        if (this.props.code !== null) {
            editor.setValue(this.props.code);
        } else {
            editor.setValue('');
        }

        editor.resize();
        editor.setOptions({
            enableBasicAutocompletion: true,
            enableSnippets: true,
            enableLiveAutocompletion: true
        });
    }

}