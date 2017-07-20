/*
 * Copyright 2017 HugeGraph Authors
 *
 * Licensed to the Apache Software Foundation (ASF) under one or more
 * contributor license agreements. See the NOTICE file distributed with this
 * work for additional information regarding copyright ownership. The ASF
 * licenses this file to You under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations under
 * the License.
 */
package com.baidu.hugegraph.studio;

import org.apache.commons.io.IOUtils;
import org.apache.http.client.config.RequestConfig;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClientBuilder;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.inject.Inject;
import java.io.IOException;
import java.nio.charset.Charset;
import java.util.concurrent.TimeUnit;

public abstract class HttpResourceLoader<T> {

    private static final Logger logger =
            LoggerFactory.getLogger(HttpResourceLoader.class);

    private String serviceBaseUrl = "http://localhost";
    private int servicePort = 9091;
    private ResourceMapper<T> resourceMapper;
    private final CloseableHttpClient httpClient = HttpClientBuilder.create()
                  .setConnectionTimeToLive(10L, TimeUnit.MINUTES).build();

    public T getResource(String resourcePath) {
        String resourceJson = getResourceJson(resourcePath);
        if (resourceJson != null) {
            return this.resourceMapper.mapJsonToObject(resourceJson);
        }
        return null;
    }

    @Inject
    public HttpResourceLoader(String connectionServiceURL,
                              Integer connectionServicePort,
                              ResourceMapper<T> resourceMapper) {
        this.serviceBaseUrl = connectionServiceURL;
        this.servicePort = connectionServicePort.intValue();
        this.resourceMapper = resourceMapper;
    }

    private String getResourceJson(String resourcePath) {

        logger.debug(String.format("Loading resource from %s",
                                    new Object[]{resourcePath}));

        HttpGet request = new HttpGet(String.format("%s/%s",
                              new Object[]{buildServiceUrl(), resourcePath}));
        request.addHeader("content-type", "application/json");

        RequestConfig requestConfig = RequestConfig.custom()
                      .setConnectionRequestTimeout(10000).build();
        request.setConfig(requestConfig);

        CloseableHttpResponse httpResponse = null;
        String response = null;
        try {
            httpResponse = this.httpClient.execute(request);
            if (httpResponse.getStatusLine().getStatusCode() == 200) {
                response = IOUtils.toString(
                                   httpResponse.getEntity().getContent(),
                                   Charset.defaultCharset());
            } else {
                logger.error(String.format("Failed to load resource: %s",
                             new Object[]{httpResponse.toString()}));
            }
            return response;
        } catch (Exception e) {
            logger.debug(String.format("Exception when executing request %s: ",
                         new Object[]{request}), e);
            throw new RuntimeException(e);
        } finally {
            if (httpResponse != null) {
                try {
                    httpResponse.close();
                } catch (IOException ignored) {
                    logger.debug("Exception when closing http response: ", e);
                }
            }
        }
    }

    public String buildServiceUrl() {
        return String.format("%s:%d", new Object[]{this.serviceBaseUrl,
                                                   this.servicePort});
    }

    public int getServicePort() {
        return this.servicePort;
    }

    public void setServicePort(int connectionServicePort) {
        this.servicePort = connectionServicePort;
    }

    public void setServiceurl(String connectionServiceURL) {
        this.serviceBaseUrl = connectionServiceURL;
    }

    public String getServiceBaseURL() {
        return this.serviceBaseUrl;
    }

    public void setServiceBaseURL(String connectionServiceBaseURL) {
        this.serviceBaseUrl = connectionServiceBaseURL;
    }

    public ResourceMapper<T> getResourceMapper() {
        return this.resourceMapper;
    }
}
