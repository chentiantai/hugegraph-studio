package com.baidu.hugegraph.studio;

import com.baidu.hugegraph.studio.config.StudioConfiguration;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;

public class StudioConfigurationTest {

    private StudioConfiguration configuration;
    @Before
    public void setUp() throws Exception {
        String basedir = System.getProperty("user.dir");
        System.setProperty("studio.conf.dir", basedir + "/conf");
        configuration = new StudioConfiguration();
    }

    @Test
    public void testConfiguration() {

        Assert.assertEquals(System.getProperty("user.home") + "/.hugestudio",
                configuration.getBaseUserDataDirectory());
        Assert.assertEquals(System.getProperty("user.home") + "/.hugestudio/connections",
                configuration.getConnectionsDirectory());
        Assert.assertEquals(System.getProperty("user.home") + "/.hugestudio/notebooks",
                configuration.getNotebooksDirectory());


    }
}
