package com.baidu.hugegraph.studio.execution.markdown;


import com.baidu.hugegraph.studio.notebook.model.Result;
import org.markdown4j.Markdown4jProcessor;
import org.springframework.stereotype.Component;

@Component
public class MarkdownExecutor {
    public Result execute(String code)
            throws Exception {
        String html = new Markdown4jProcessor().process(code);
        return new Result(html, Result.Type.HTML, false);
    }
}

