package com.baidu.hugegraph.studio.conf;


import com.fasterxml.jackson.databind.ObjectMapper;
import javax.ws.rs.ext.ContextResolver;
import javax.ws.rs.ext.Provider;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.beans.factory.config.YamlPropertiesFactoryBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.support.PropertySourcesPlaceholderConfigurer;
import org.springframework.core.env.StandardEnvironment;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;

@Configuration
@Provider
public class StudioConfiguration implements ContextResolver<ObjectMapper>
{
    private static final Logger logger = LoggerFactory.getLogger(StudioConfiguration.class);
    @Value("${userData.baseDirectory}")
    private String baseUserDataDirectory;

    //TODO : should be fixed
    public ObjectMapper getContext(Class<?> aClass)
    {
        return new ObjectMapper();
    }

    public static String getConfigFileLocation()
    {
        String confDir = System.getProperty("studio.conf.dir");
        if ((confDir == null) || (confDir.isEmpty())) {
            confDir = "conf";
        }
        return String.format("%s/configuration.yaml", new Object[] { confDir });
    }

    public static String getConfigDirLocation()
    {
        String confDir = System.getProperty("studio.conf.dir");
        if ((confDir == null) || (confDir.isEmpty())) {
            confDir = "conf";
        }
        return confDir;
    }

    @Bean
    public static PropertySourcesPlaceholderConfigurer properties()
    {
        FileSystemResource fileSystemResource = new FileSystemResource(getConfigFileLocation());

        PropertySourcesPlaceholderConfigurer propertySourcesPlaceholderConfigurer = new PropertySourcesPlaceholderConfigurer();
        YamlPropertiesFactoryBean yaml = new YamlPropertiesFactoryBean();
        yaml.setResources(new Resource[] { fileSystemResource });

        propertySourcesPlaceholderConfigurer.setLocalOverride(false);
        propertySourcesPlaceholderConfigurer.setProperties(yaml.getObject());

        StandardEnvironment env = new StandardEnvironment();
        propertySourcesPlaceholderConfigurer.setEnvironment(env);

        return propertySourcesPlaceholderConfigurer;
    }

    public String getBaseUserDataDirectory()
    {
        return this.baseUserDataDirectory;
    }
}
