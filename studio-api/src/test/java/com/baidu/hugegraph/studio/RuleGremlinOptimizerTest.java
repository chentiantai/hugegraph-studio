package com.baidu.hugegraph.studio;

import org.junit.Assert;
import org.junit.Test;

import com.baidu.hugegraph.studio.config.StudioConfiguration;
import com.baidu.hugegraph.studio.gremlin.GremlinOptimizer;
import com.baidu.hugegraph.studio.gremlin.RuleGremlinOptimizer;

public class RuleGremlinOptimizerTest {
    StudioConfiguration conf = new StudioConfiguration();
    String limit = ".limit(" + conf.getDataLimit() + ")";

    @Test
    public void testLimitOptimize() {

        GremlinOptimizer gremlinOptimizer = new RuleGremlinOptimizer();
        String g = gremlinOptimizer.limitOptimize("g.V()");
        System.out.println(g);
        Assert.assertEquals(g, "g.V()" + limit);

        g = gremlinOptimizer.limitOptimize("g.V().count()");
        System.out.println(g);

        Assert.assertEquals(g, "g.V().count()");

        g = gremlinOptimizer.limitOptimize("g.V('count()')");
        System.out.println(g);
        Assert.assertEquals(g, "g.V('count()')" + limit);

    }
}
