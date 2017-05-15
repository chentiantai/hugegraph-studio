package com.baidu.hugegraph;

import org.apache.catalina.core.StandardContext;
import org.apache.catalina.startup.Tomcat;

import java.io.File;

/**
 * Hello world!
 */
public class HttpServer {
    private static final int PORT = 8081;

    public static void main(String[] args) throws Exception {
        String basedir = System.getProperty("user.dir");
        String docBase = basedir + "/studio-ui/html";
        System.out.println("tomcat docBase: " + docBase);

        Tomcat tomcat = new Tomcat();
        tomcat.setPort(PORT);

        StandardContext ctx = (StandardContext) tomcat.addWebapp("", new File(docBase).getAbsolutePath());
        tomcat.start();
        System.out.println("HugeGraph studio-ui is now running at: http://127.0.0.1:" + PORT);
        tomcat.getServer().await();
    }
}
