package com.baidu.hugegraph.studio.notebook.model.vis;

import java.util.Map;

import org.apache.commons.lang3.StringUtils;

/**
 * The style of vertexLabel.
 */
public class VisNode {
    // shape
    protected static final String VIS_SHAPE = "vis.shape";

    // size
    protected static final String VIS_SIZE = "vis.size";

    // scaling
    protected static final String SCALING_MIN = "vis.scaling.min";
    protected static final String SCALING_MAX = "vis.scaling.max";

    // color
    protected static final String COLOR_BORDER = "vis.border";
    protected static final String COLOR_BACKGROUND = "vis.background";
    protected static final String COLOR_HIGHLIGHT_BORDER =
            "vis.highlight.border";
    protected static final String COLOR_HIGHLIGHT_BACKGROUND =
            "vis.highlight.background";
    protected static final String COLOR_HOVER_BORDER = "vis.hover.border";
    protected static final String COLOR_HOVER_BACKGROUND =
            "vis.hover.background";

    // font
    protected static final String FONT_COLOR = "vis.font.color";
    protected static final String FONT_SIZE = "vis.font.size";
    protected static final String FONT_FACE = "vis.font.face";
    protected static final String FONT_MULTI = "vis.font.multi";

    // icon
    protected static final String ICON_CODE = "vis.icon.code";
    protected static final String ICON_COLOR = "vis.icon.color";
    protected static final String ICON_SIZE = "vis.icon.size";

    private String shape;
    private Integer size;
    private Font font;
    private Color color;
    private Icon icon;
    private Scaling scaling;

    public VisNode() {
        this("dot", 20, new Font(), new Color(), new Icon(), new Scaling());
    }

    public VisNode(String shape) {
        this(shape, 20, new Font(), new Color(), new Icon(), new Scaling());

    }

    public VisNode(String shape, Icon icon) {
        this(shape, 20, new Font(), new Color(), icon, new Scaling());

    }

    public VisNode(String shape, Integer size, Font font, Color color,
                   Icon icon, Scaling scaling) {
        this.shape = shape;
        this.size = size;
        this.font = font;
        this.color = color;
        this.icon = icon;
        this.scaling = scaling;
    }

    public VisNode(Map<String, Object> userData) {
        this();
        transformUserDataToVisNode(userData);
    }

    private VisNode transformUserDataToVisNode(Map<String, Object> userData) {

        // size
        Integer size = (Integer) userData.get(VIS_SIZE);
        if (size != null) {
            this.size = size;
        }

        // color
        this.color = new Color(userData);

        // font
        this.font = new Font(userData);

        // icon
        String shape = (String) userData.get(VIS_SHAPE);
        if (!StringUtils.isBlank(shape)) {
            this.shape = shape;
        }
        if (shape != null && shape.equals("icon")) {
            this.icon = new Icon(userData);
        }

        // scaling
        this.scaling = new Scaling(userData);

        return this;
    }

    public String getShape() {
        return shape;
    }

    public void setShape(String shape) {
        this.shape = shape;
    }

    public Font getFont() {
        return font;
    }

    public void setFont(Font font) {
        this.font = font;
    }

    public Color getColor() {
        return color;
    }

    public void setColor(Color color) {
        this.color = color;
    }

    public Icon getIcon() {
        return icon;
    }

    public void setIcon(Icon icon) {
        this.icon = icon;
    }

    public Integer getSize() {
        return size;
    }

    public void setSize(Integer size) {
        this.size = size;
    }

    public Scaling getScaling() {
        return scaling;
    }

    public void setScaling(Scaling scaling) {
        this.scaling = scaling;
    }
}









