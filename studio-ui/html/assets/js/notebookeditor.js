/**
 * Created by liunanke on 2017/5/22.
 */
var editor = ace.edit('editor');
ace.require('ace/ext/old_ie');
ace.require('ace/ext/language_tools');
editor.setTheme('ace/theme/chrome');
editor.session.setMode('ace/mode/gremlin');
editor.setShowPrintMargin(false);
editor.setAutoScrollEditorIntoView(true);
editor.setOption('maxLines', 30);
editor.setOption('minLines', 2);
document.getElementById('editor').style.fontSize = '16px';
editor.resize();
editor.setOptions({
    enableBasicAutocompletion: true,
    enableSnippets: true,
    enableLiveAutocompletion: true
})

var editorM = ace.edit('editorM');
ace.require('ace/ext/old_ie');
ace.require('ace/ext/language_tools');
editorM.setTheme('ace/theme/chrome');
editorM.session.setMode('ace/mode/markdown');
editorM.setShowPrintMargin(false);
editorM.setAutoScrollEditorIntoView(true);
editorM.setOption('maxLines', 30);
editorM.setOption('minLines', 2);
document.getElementById('editorM').style.fontSize = '16px';
editorM.resize();
editorM.setOptions({
    enableBasicAutocompletion: true,
    enableSnippets: true,
    enableLiveAutocompletion: true
});
