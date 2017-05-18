package com.baidu.hugegraph.studio;

import com.baidu.hugegraph.studio.conf.StudioConfiguration;
import org.apache.commons.lang3.StringUtils;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

/**
 * Created by jishilei on 2017/5/18.
 */
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = {"classpath:applicationContext.xml"})
public class StudioConfigurationTest {


    @Autowired
    private StudioConfiguration configuration;

    @Before
    public void setUp() throws Exception {
        String basedir = System.getProperty("user.dir");
        System.setProperty("studio.conf.dir", basedir + "/studio-api/conf");
    }

    @Test
    public void testConfiguration() {

        Assert.assertTrue(StringUtils.isEmpty(configuration.getBaseUserDataDirectoryOrignal()));
        Assert.assertEquals(System.getProperty("user.home") + "/.hugestudio",
                configuration.getBaseUserDataDirectory());
        Assert.assertEquals(System.getProperty("user.home") + "/.hugestudio/connections",
                configuration.getConnectionsDirectory());
        Assert.assertEquals(System.getProperty("user.home") + "/.hugestudio/notebooks",
                configuration.getNotebooksDirectory());


    }
}
