package com.baidu.hugegraph.studio.gremlin;

import org.junit.Assert;
import org.junit.Test;

import com.baidu.hugegraph.studio.config.StudioConfiguration;

public class RuleGremlinOptimizerTest {
    StudioConfiguration conf = StudioConfiguration.getInstance();
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
        Assert.assertEquals("g.V('count()')", g);
    }

    @Test
    public void testMatchGremlin() {
        long limit = 100L;
        GremlinOptimizer gremlinOptimizer = new RuleGremlinOptimizer();

        String gOld = "g.V().hasLabel('123agb').p()";
        System.out.println();
        System.out.println(gOld);
        String gNew = gremlinOptimizer.limitOptimize(gOld, limit);
        System.out.println(gNew);
        Assert.assertEquals("g.V().hasLabel('123agb').p()", gNew);

        gOld = "g.V()";
        System.out.println();
        System.out.println(gOld);
        gNew = gremlinOptimizer.limitOptimize(gOld, limit);
        System.out.println(gNew);
        Assert.assertEquals("g.V().limit(100)", gNew);

        gOld = "g.V().hasLabel('123agb')";
        System.out.println();
        System.out.println(gOld);
        gNew = gremlinOptimizer.limitOptimize(gOld, limit);
        System.out.println(gNew);
        Assert.assertEquals("g.V().hasLabel('123agb').limit(100)", gNew);

        gOld = "g.V().hasLabel('123a)gb')";
        System.out.println();
        System.out.println(gOld);
        gNew = gremlinOptimizer.limitOptimize(gOld, limit);
        System.out.println(gNew);
        Assert.assertEquals("g.V().hasLabel('123a)gb').limit(100)", gNew);

        gOld = "g.V().hasLabel('123\n\r'a)gb')";
        System.out.println();
        System.out.println(gOld);
        gNew = gremlinOptimizer.limitOptimize(gOld, limit);
        System.out.println(gNew);
        Assert.assertEquals("g.V().hasLabel('123\n\r'a)gb').limit(100)", gNew);

        gOld = "g.V().hasLabel(\"123\n\r'a)gb\")";
        System.out.println();
        System.out.println(gOld);
        gNew = gremlinOptimizer.limitOptimize(gOld, limit);
        System.out.println(gNew);
        Assert.assertEquals("g.V().hasLabel(\"123\n\r'a)gb\").limit(100)",
                            gNew);

        gOld = "g.V().hasLabel(123)";
        System.out.println();
        System.out.println(gOld);
        gNew = gremlinOptimizer.limitOptimize(gOld, limit);
        System.out.println(gNew);
        Assert.assertEquals("g.V().hasLabel(123).limit(100)", gNew);

        gOld = "g.V().bothE()";
        System.out.println();
        System.out.println(gOld);
        gNew = gremlinOptimizer.limitOptimize(gOld, limit);
        System.out.println(gNew);
        Assert.assertEquals("g.V().bothE()", gNew);

        gOld = "g.V().bothE() \\n";
        System.out.println();
        System.out.println(gOld);
        gNew = gremlinOptimizer.limitOptimize(gOld, limit);
        System.out.println(gNew);
        Assert.assertEquals("g.V().bothE() \\n", gNew);
    }
}
