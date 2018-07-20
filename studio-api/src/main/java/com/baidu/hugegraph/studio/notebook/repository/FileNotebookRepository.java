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

package com.baidu.hugegraph.studio.notebook.repository;

import java.io.BufferedWriter;
import java.io.DataInputStream;
import java.io.DataOutput;
import java.io.DataOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.FileReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.io.Reader;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import java.util.concurrent.locks.Lock;
import java.util.concurrent.locks.ReadWriteLock;
import java.util.concurrent.locks.ReentrantReadWriteLock;

import org.apache.commons.io.FileUtils;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.springframework.stereotype.Repository;

import com.baidu.hugegraph.studio.config.StudioConfiguration;
import com.baidu.hugegraph.studio.notebook.model.Notebook;
import com.baidu.hugegraph.studio.notebook.model.NotebookCell;
import com.baidu.hugegraph.studio.notebook.model.ViewSettings;
import com.baidu.hugegraph.util.Log;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.common.base.Charsets;
import com.google.common.base.Preconditions;

/**
 * The type File notebook repository.
 *
 * Save notebook entity to disk as json.
 * Read notebook entity from disk.
 */
@Repository("notebookRepository")
public class FileNotebookRepository implements NotebookRepository {

    private static final Logger LOG = Log.logger(FileNotebookRepository.class);

    private final ObjectMapper mapper = new ObjectMapper();
    private StudioConfiguration configuration;
    private String notebooksDataDirectory;

    private final ReadWriteLock lock = new ReentrantReadWriteLock();
    private final Lock readLock = lock.readLock();
    private final Lock writeLock = lock.writeLock();

    /**
     * Instantiates a new File notebook repository.
     */
    public FileNotebookRepository() {
        initNotebookRepository();
    }

    private void initNotebookRepository() {
        configuration = StudioConfiguration.getInstance();
        notebooksDataDirectory = configuration.getNotebooksDirectory();
        Preconditions.checkNotNull(notebooksDataDirectory);

        LOG.info("notebooksDataDirectory is: {}",  notebooksDataDirectory);
        File dir = new File(notebooksDataDirectory);
        if (!dir.exists()) {
            dir.mkdirs();
        }
        Preconditions.checkArgument(dir.exists() && dir.isDirectory());
    }

    private void writeNotebook(Notebook notebook) {
        Preconditions.checkNotNull(notebook);
        Preconditions.checkArgument(StringUtils.isNotEmpty(notebook.getId()));

        /*
         * Should we flush and close for each buffered writing? Also, why
         * not throw runtime exception if write failed in this case?
         */
        String filePath = notebooksDataDirectory + "/" + notebook.getId();
        writeLock.lock();
        try (OutputStream os = new FileOutputStream(filePath);
             DataOutputStream out = new DataOutputStream(os)) {
            String summary = mapper.writeValueAsString(notebook.summary());
            out.writeUTF(summary);
            byte[] all = mapper.writeValueAsString(notebook)
                               .getBytes(Charsets.UTF_8);
            out.writeInt(all.length);
            out.write(all);
            LOG.debug("Write Notebook file: {}", filePath);
        } catch (IOException e) {
            LOG.error("Failed to write Notebook file: {}", filePath, e);
            throw new RuntimeException(String.format(
                      "Failed to write Notebook file: {}", filePath));
        } finally {
            writeLock.unlock();
        }
    }

    @Override
    public Notebook createNotebook(Notebook notebook) {
        Preconditions.checkNotNull(notebook);
        Preconditions.checkArgument(
                StringUtils.isNotEmpty(notebook.getName()) &&
                StringUtils.isNotEmpty(notebook.getConnectionId()));

        // Create new uuid if notebookId is empty.
        if (StringUtils.isEmpty(notebook.getId())) {
            notebook.setId(UUID.randomUUID().toString());
            notebook.setCreated(Instant.now().getEpochSecond());
            notebook.setLastUsed(Instant.now().getEpochSecond());
            notebook.setFavorite(false);

            NotebookCell notebookCell = new NotebookCell();
            notebookCell.setId(UUID.randomUUID().toString());
            notebookCell.setLanguage("gremlin");
            ViewSettings viewSettings = new ViewSettings();
            viewSettings.setFullScreen(false);
            viewSettings.setView(true);
            notebookCell.setViewSettings(viewSettings);
            notebook.addCell(notebookCell);
        }
        writeNotebook(notebook);
        return notebook;
    }

    @Override
    public Notebook editNotebook(Notebook notebook) {
        Preconditions.checkNotNull(notebook);
        // Ensure notebookId is not empty.
        Preconditions.checkArgument(
                StringUtils.isNotEmpty(notebook.getName()) &&
                StringUtils.isNotEmpty(notebook.getId()));

        notebook.setLastUsed(Instant.now().getEpochSecond());
        writeNotebook(notebook);
        return notebook;
    }

    @Override
    public List<Notebook> getNotebooks() {
        List<Notebook> notebooks = new ArrayList<>();
        try {
            Files.list(Paths.get(notebooksDataDirectory)).forEach(path -> {
                if (Files.isRegularFile(path)) {
                    Notebook notebook = getNotebookByPath(path, false);
                    if (notebook != null) {
                        notebooks.add(notebook);
                    }
                }
            });
        } catch (Exception e) {
            LOG.error("Failed to read file: {}", notebooksDataDirectory, e);
        }
        return notebooks;
    }

    @Override
    public void deleteNotebook(String notebookId) {
        String path = notebooksDataDirectory + "/" + notebookId;
        writeLock.lock();
        try {
            FileUtils.forceDelete(FileUtils.getFile(notebooksDataDirectory,
                                                    notebookId));
        } catch (IOException e) {
            LOG.error("Failed to remove File: {}", path, e);
        } finally {
            writeLock.unlock();
        }
    }

    @Override
    public Notebook getNotebook(String notebookId) {
        String path = notebooksDataDirectory + "/" + notebookId;
        return this.getNotebookByPath(Paths.get(path), true);
    }

    public Notebook getNotebookByPath(Path path, boolean all) {
        readLock.lock();
        try (InputStream is = new FileInputStream(path.toFile());
             DataInputStream input = new DataInputStream(is)) {
            String summary = input.readUTF();
            if (!all) {
                return mapper.readValue(summary, Notebook.class);
            } else {
                int len = input.readInt();
                byte[] bytes = new byte[len];
                LOG.info("Read total data: {} bytes", len);
                input.readFully(bytes);
                return mapper.readValue(bytes, Notebook.class);
            }
        } catch (IOException e) {
            LOG.error("Failed to read File: {}", path, e);
        } finally {
            readLock.unlock();
        }

        return null;
    }

    @Override
    public NotebookCell addCellToNotebook(String notebookId, NotebookCell cell,
                                          Integer index) {
        Preconditions.checkNotNull(cell);
        if (StringUtils.isEmpty(cell.getId())) {
            cell.setId(UUID.randomUUID().toString());
        }
        Notebook notebook = getNotebook(notebookId);
        Preconditions.checkNotNull(notebook);

        notebook.setLastUsed(Instant.now().getEpochSecond());
        notebook.addCell(cell, index);
        writeNotebook(notebook);

        return cell;
    }

    @Override
    public NotebookCell editNotebookCell(String notebookId, NotebookCell cell) {
        Preconditions.checkNotNull(cell);

        Notebook notebook = getNotebook(notebookId);
        Preconditions.checkNotNull(notebook);

        notebook.setLastUsed(Instant.now().getEpochSecond());
        notebook.addCell(cell);
        writeNotebook(notebook);

        return cell;
    }

    @Override
    public NotebookCell editNotebookCell(String notebookId, String cellId,
                                         NotebookCell cell) {
        Notebook notebook = getNotebook(notebookId);
        Preconditions.checkNotNull(notebook);

        NotebookCell cellLocal = this.getNotebookCell(notebookId, cellId);

        if (cell.getCode() != null) {
            cellLocal.setCode(cell.getCode());
        }
        if (cell.getLanguage() != null) {
            cellLocal.setLanguage(cell.getLanguage());
        }
        if (cell.getViewSettings() != null) {
            cellLocal.setViewSettings(cell.getViewSettings());
        }
        if (cell.getDataViewType() != null) {
            cellLocal.setDataViewType(cell.getDataViewType());
        }

        notebook.setLastUsed(Instant.now().getEpochSecond());
        notebook.addCell(cellLocal);
        writeNotebook(notebook);

        return cellLocal;
    }

    @Override
    public void deleteNotebookCell(String notebookId, String cellId) {
        Notebook notebook = getNotebook(notebookId);
        Preconditions.checkNotNull(notebook);
        notebook.removeCell(cellId);
        writeNotebook(notebook);
    }

    @Override
    public NotebookCell getNotebookCell(String notebookId, String cellId) {
        Notebook notebook = getNotebook(notebookId);
        Preconditions.checkNotNull(notebook);
        return notebook.getCells().stream().filter(c -> c.getId().equals(cellId))
               .findFirst().get();
    }
}
