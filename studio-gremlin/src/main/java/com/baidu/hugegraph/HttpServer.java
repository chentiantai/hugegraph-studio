package com.baidu.hugegraph;

import org.apache.catalina.core.StandardContext;
import org.apache.catalina.startup.Tomcat;

import java.io.File;

/**
 * This class for development only.
 */
public class HttpServer {
    private static final int PORT = 8083;

    public static void main(String[] args) throws Exception {

        String basedir = System.getProperty("user.dir");
        String docBase = basedir + "/studio-gremlin/src/main/webapp";

        Tomcat tomcat = new Tomcat();
        tomcat.setPort(PORT);

        StandardContext ctx = (StandardContext) tomcat.addWebapp("", new File(docBase).getAbsolutePath());
        tomcat.start();
        System.out.println("HugeGraph studio-gremlin is now running at: http://127.0.0.1:" + PORT);
        tomcat.getServer().await();
    }
}
