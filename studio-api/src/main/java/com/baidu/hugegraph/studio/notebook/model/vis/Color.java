package com.baidu.hugegraph.studio.notebook.model.vis;

import static com.baidu.hugegraph.studio.notebook.model.vis.VisNode.COLOR_BACKGROUND;
import static com.baidu.hugegraph.studio.notebook.model.vis.VisNode.COLOR_BORDER;
import static com.baidu.hugegraph.studio.notebook.model.vis.VisNode.COLOR_HIGHLIGHT_BACKGROUND;
import static com.baidu.hugegraph.studio.notebook.model.vis.VisNode.COLOR_HIGHLIGHT_BORDER;
import static com.baidu.hugegraph.studio.notebook.model.vis.VisNode.COLOR_HOVER_BACKGROUND;
import static com.baidu.hugegraph.studio.notebook.model.vis.VisNode.COLOR_HOVER_BORDER;

import java.util.HashMap;
import java.util.Map;

import org.apache.commons.lang3.StringUtils;

public class Color {
    private String background = "#00ccff";
    private String border = "#00ccff";
    private Map<String, String> highlight;
    private Map<String, String> hover;

    public Color() {
        this("#00ccff", "#00ccff", new HashMap<>(), new HashMap<>());
    }

    public Color(String background, String border,
                 Map<String, String> highlight,
                 Map<String, String> hover) {
        this.background = background;
        this.border = border;
        this.highlight = highlight;
        this.hover = hover;
    }

    public Color(Map<String, Object> userData) {
        this.highlight = new HashMap<>();
        this.highlight.put("background", "#fb6a02");
        this.highlight.put("border", "#fb6a02");
        this.hover = new HashMap<>();
        this.hover.put("background", "#ec3112");
        this.hover.put("border", "#ec3112");

        String border = (String) userData.get(COLOR_BORDER);
        if (!StringUtils.isBlank(border)) {
            this.border = border;
        }

        String background = (String) userData.get(COLOR_BACKGROUND);
        if (!StringUtils.isBlank(background)) {
            this.background = background;
        }

        String highlightBorder = (String) userData.get(COLOR_HIGHLIGHT_BORDER);
        if (!StringUtils.isBlank(highlightBorder)) {
            this.highlight.replace("border", highlightBorder);
        }

        String highlightBackground =
                (String) userData.get(COLOR_HIGHLIGHT_BACKGROUND);
        if (!StringUtils.isBlank(highlightBackground)) {
            this.highlight.replace("background", highlightBackground);
        }

        String hoverBorder = (String) userData.get(COLOR_HOVER_BORDER);
        if (!StringUtils.isBlank(hoverBorder)) {
            this.hover.replace("border", hoverBorder);

        }

        String hoverBackground = (String) userData.get(COLOR_HOVER_BACKGROUND);
        if (!StringUtils.isBlank(hoverBackground)) {
            this.hover.replace("background", hoverBackground);
        }
    }

    public String getBorder() {
        return border;
    }

    public void setBorder(String border) {
        this.border = border;
    }

    public String getBackground() {
        return background;
    }

    public void setBackground(String background) {
        this.background = background;
    }

    public Map<String, String> getHighlight() {
        return highlight;
    }

    public void setHighlight(Map<String, String> highlight) {
        this.highlight = highlight;
    }

    public Map<String, String> getHover() {
        return hover;
    }

    public void setHover(Map<String, String> hover) {
        this.hover = hover;
    }
}
