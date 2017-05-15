package com.baidu.hugegraph;

import com.baidu.hugegraph.studio.conf.StudioConfiguration;

/**
 * Created by jishilei on 2017/5/13.
 */
public class Example {

    public static void main(String[] args) throws Exception {


        String basedir = System.getProperty("user.dir");
        String docBase = basedir + "/studio-api/src/main/webapp";

        System.setProperty("studio.conf.dir", basedir + "/studio-api/conf");

        StudioConfiguration configuration =new StudioConfiguration();

        System.out.println(configuration.getConfigDirLocation());


    }
}
