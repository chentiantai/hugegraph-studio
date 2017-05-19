package com.baidu.hugegraph.studio.conf;


import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.yaml.snakeyaml.Yaml;

import java.io.File;
import java.io.FileInputStream;
import java.io.InputStream;
import java.util.Map;


public class StudioConfiguration {
    private static final Logger logger = LoggerFactory.getLogger(StudioConfiguration.class);

    private String userDataBaseDir;
    private String connectionsDirectory;
    private String notebooksDirectory;

    public StudioConfiguration() {
        loadStudioConfiguration();
    }

    public void loadStudioConfiguration() {
        String confDir = System.getProperty("studio.conf.dir");
        if ((confDir == null) || (confDir.isEmpty())) {
            confDir = "conf";
        }
        String configurationFile = String.format("%s/configuration.yaml", confDir);

        try {
            InputStream is = new FileInputStream(new File(configurationFile));
            Throwable throwable = null;
            try {
                Yaml yaml = new Yaml();
                Map<String, Object> map = (Map<String, Object>) yaml.load(is);
                Map<String, Object> dataConfig = (Map) map.get("userData");

                if (dataConfig != null) {
                    this.userDataBaseDir = ((String) dataConfig.get("baseDirectory"));
                    this.connectionsDirectory = ((String) dataConfig.get("connectionsDirectory"));
                    this.notebooksDirectory = ((String) dataConfig.get("notebooksDirectory"));
                }
            } catch (Throwable ex) {
                throwable = ex;
                throw ex;
            } finally {
                if (is != null) {
                    if (throwable != null) {
                        try {
                            is.close();
                        } catch (Throwable ex) {
                            throwable.addSuppressed(ex);
                        }
                    } else {
                        is.close();
                    }
                }
            }
        } catch (Exception e) {
            throw new RuntimeException(
                    String.format("Caught exception loading properties from %s: ",
                            new Object[]{configurationFile}), e);
        }
    }


    public String getBaseUserDataDirectoryOriginal() {
        return this.userDataBaseDir;
    }

    public String getConnectionsDirectory() {
        return getBaseUserDataDirectory() + "/" + this.connectionsDirectory;
    }

    public String getNotebooksDirectory() {
        return getBaseUserDataDirectory() + "/" + this.notebooksDirectory;

    }

    public String getBaseUserDataDirectory() {
        String userDataDir = this.userDataBaseDir;
        if (StringUtils.isEmpty(this.userDataBaseDir) || this.userDataBaseDir.equals("null")) {
            userDataDir = "~/.hugestudio";
        }
        return replaceHomeDirReferences(userDataDir);
    }

    private String replaceHomeDirReferences(String confDir) {
        if (confDir != null) {
            if (System.getProperty("user.home") != null) {
                return confDir.replaceFirst("^~", System.getProperty("user.home"));
            }
            return confDir;
        }
        return null;
    }
}
