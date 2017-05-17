package com.baidu.hugegraph.studio.common.repository;


import java.io.File;
import java.util.UUID;

import org.apache.commons.io.filefilter.IOFileFilter;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class UUIDFileFilter
        implements IOFileFilter {
    private static final Logger logger = LoggerFactory.getLogger(UUIDFileFilter.class);

    public boolean accept(File file) {
        if (!file.isDirectory()) {
            try {
                validateFileName(file.getName());
                return true;
            } catch (Exception e) {
                logger.trace(String.format("Error loading file: %s", new Object[]{file.getName()}), e);
            }
        }
        return false;
    }

    public boolean accept(File directoryName, String fileName) {
        try {
            validateFileName(fileName);
            return true;
        } catch (Exception e) {
            logger.trace(String.format("Error loading file: %s", new Object[]{fileName}), e);
        }
        return false;
    }

    private void validateFileName(String name) {
        UUID.fromString(name);
    }
}
