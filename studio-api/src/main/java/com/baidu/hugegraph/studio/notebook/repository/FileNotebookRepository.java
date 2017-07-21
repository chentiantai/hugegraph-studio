package com.baidu.hugegraph.studio.notebook.repository;

import com.baidu.hugegraph.studio.config.StudioConfiguration;
import com.baidu.hugegraph.studio.notebook.model.Notebook;
import com.baidu.hugegraph.studio.notebook.model.NotebookCell;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.common.base.Preconditions;
import org.apache.commons.io.FileUtils;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Repository;

import java.io.BufferedWriter;
import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

/**
 * Created by jishilei on 2017/5/14.
 */
@Repository("notebookRepository")
public class FileNotebookRepository implements NotebookRepository {
    private static final Logger logger = LoggerFactory.getLogger(FileNotebookRepository.class);

    private ObjectMapper mapper = new ObjectMapper();

    private StudioConfiguration configuration;

    private String notebooksDataDirectory;

    public FileNotebookRepository() {
        initNotebookRepository();
    }

    private void initNotebookRepository() {
        configuration = new StudioConfiguration();
        notebooksDataDirectory = configuration.getNotebooksDirectory();
        Preconditions.checkNotNull(notebooksDataDirectory);

        logger.info("notebooksDataDirectory=" + notebooksDataDirectory);
        File dir = new File(notebooksDataDirectory);
        if (!dir.exists()) {
            dir.mkdirs();
        }
        Preconditions.checkArgument(dir.exists() && dir.isDirectory());
    }

    private void writeNotebook(Notebook notebook) {
        Preconditions.checkNotNull(notebook);
        Preconditions.checkArgument(StringUtils.isNotEmpty(notebook.getId()));

        String filePath = notebooksDataDirectory + "/" + notebook.getId();
        Path path = Paths.get(filePath);
        try {
            try (BufferedWriter writer = Files.newBufferedWriter(path)) {
                writer.write(mapper.writeValueAsString(notebook));
            }
            logger.debug("Write Notebook File :" + filePath);
        } catch (IOException e) {
            logger.error("Could Not Write File : " + filePath, e);
        }
    }

    @Override
    public Notebook createNotebook(Notebook notebook) {
        Preconditions.checkNotNull(notebook);
        Preconditions.checkArgument(StringUtils.isNotEmpty(notebook.getName())
                && StringUtils.isNotEmpty(notebook.getConnectionId()));
        // create new uuid when notebookId is empty
        if (StringUtils.isEmpty(notebook.getId())) {
            notebook.setId(UUID.randomUUID().toString());
            notebook.setCreated(Instant.now().getEpochSecond());
            notebook.setLastUsed(Instant.now().getEpochSecond());
            notebook.setFavorite(false);

            NotebookCell notebookCell = new NotebookCell();
            notebookCell.setId(UUID.randomUUID().toString());
            notebookCell.setLanguage("gremlin");
            notebook.addCell(notebookCell);
        }
        writeNotebook(notebook);
        return notebook;
    }

    @Override
    public Notebook editNotebook(Notebook notebook) {
        Preconditions.checkNotNull(notebook);
        // ensure notebookId is not empty.
        Preconditions.checkArgument(StringUtils.isNotEmpty(notebook.getName())
                && StringUtils.isNotEmpty(notebook.getId()));

        notebook.setLastUsed(Instant.now().getEpochSecond());
        writeNotebook(notebook);
        return notebook;
    }

    @Override
    public List<Notebook> getNotebooks() {
        List<Notebook> notebooks = new ArrayList<>();
        try {
            Files.list(Paths.get(notebooksDataDirectory))
                    .filter(Files::isRegularFile)
                    .forEach(path -> {
                        try {
                            notebooks.add(mapper.readValue(Files.readAllBytes(path), Notebook.class));
                        } catch (IOException e) {
                            logger.error("Could Not Read File : " + notebooksDataDirectory + "/" + path.getFileName(), e);
                            // only skips this iteration.
                            return;
                        }
                    });
        } catch (IOException e) {
            logger.error("Could Not Read File : " + notebooksDataDirectory, e);
        }
        return notebooks;
    }

    @Override
    public void deleteNotebook(String notebookId) {
        try {
            FileUtils.forceDelete(FileUtils.getFile(notebooksDataDirectory, notebookId));
        } catch (IOException e) {
            logger.error("Could Not Delete File : " + notebooksDataDirectory + "/" + notebookId, e);
        }
    }

    @Override
    public Notebook getNotebook(String notebookId) {
        try {
            return mapper.readValue(
                    Files.readAllBytes(Paths.get(notebooksDataDirectory + "/" + notebookId)),
                    Notebook.class);
        } catch (IOException e) {
            logger.error("Could Not Read File : " + notebooksDataDirectory + "/" + notebookId, e);
        }
        return null;
    }

    @Override
    public NotebookCell addCellToNotebook(String notebookId, NotebookCell cell, Integer index) {
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
    public NotebookCell editNotebookCell(String notebookId, String cellId, NotebookCell cell) {
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
        return notebook.getCells()
                .stream().filter(c -> c.getId().equals(cellId))
                .findFirst()
                .get();
    }
}
