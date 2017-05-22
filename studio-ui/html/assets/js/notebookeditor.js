/**
 * Created by liunanke on 2017/5/22.
 */
var editor = ace.edit('editor');
ace.require('ace/ext/old_ie');
ace.require('ace/ext/language_tools');
editor.setTheme('ace/theme/chrome');
editor.session.setMode('ace/mode/gremlin');
editor.setShowPrintMargin(false);
document.getElementById('editor').style.fontSize = '16px';
editor.resize();
editor.setOptions({
    enableBasicAutocompletion: true,
    enableSnippets: true,
    enableLiveAutocompletion: true
})
