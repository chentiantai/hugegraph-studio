package com.baidu.hugegraph.studio.notebook.model.vis;

import static com.baidu.hugegraph.studio.notebook.model.vis.VisNode.SCALING_MAX;
import static com.baidu.hugegraph.studio.notebook.model.vis.VisNode.SCALING_MIN;

import java.util.Map;

public class Scaling {
    private Integer min = 10;
    private Integer max = 30;

    public Scaling(Map<String, Object> userData) {
        Number min = (Number) userData.get(SCALING_MIN);
        if (min != null) {
            this.min = min.intValue();
        }

        Number max = (Number) userData.get(SCALING_MAX);
        if (max != null) {
            this.max = max.intValue();
        }
    }

    public Scaling(Integer min, Integer max) {
        this.min = min;
        this.max = max;
    }

    public Scaling() {
        this(10, 30);
    }

    public Integer getMin() {
        return min;
    }

    public void setMin(Integer min) {
        this.min = min;
    }

    public Integer getMax() {
        return max;
    }

    public void setMax(Integer max) {
        this.max = max;
    }
}
