/**
 * Created by liunanke on 2017/5/22.
 */
var editor = ace.edit("editor");
editor.setTheme("ace/theme/chrome");
editor.session.setMode("ace/mode/gremlin");
ace.require("ace/ext/language_tools");
editor.getSession().setTabSize(4);

editor.setOptions({
    enableBasicAutocompletion: true,
    enableSnippets: true,
    enableLiveAutocompletion: true
})
