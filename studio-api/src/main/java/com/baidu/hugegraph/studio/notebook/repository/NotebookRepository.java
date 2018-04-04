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

import com.baidu.hugegraph.studio.notebook.model.Notebook;
import com.baidu.hugegraph.studio.notebook.model.NotebookCell;

import java.util.List;

/**
 * The interface Notebook repository.
 */
public interface NotebookRepository {

    /**
     * Create notebook notebook.
     *
     * @param notebook the notebook
     * @return the notebook
     */
    Notebook createNotebook(Notebook notebook);

    /**
     * Edit notebook notebook.
     *
     * @param notebook the notebook
     * @return the notebook
     */
    Notebook editNotebook(Notebook notebook);

    /**
     * Gets notebooks.
     *
     * @return the notebooks
     */
    List<Notebook> getNotebooks();

    /**
     * Delete notebook.
     *
     * @param notebookId the notebook id
     */
    void deleteNotebook(String notebookId);

    /**
     * Gets notebook.
     *
     * @param notebookId the notebook id
     * @return the notebook
     */
    Notebook getNotebook(String notebookId);

    /**
     * Add cell to notebook notebook cell.
     *
     * @param notebookId the notebook id
     * @param cell       the cell
     * @param index      the index
     * @return the notebook cell
     */
    NotebookCell addCellToNotebook(String notebookId, NotebookCell cell,
                                   Integer index);

    /**
     * Edit notebook cell notebook cell.
     *
     * @param notebookId the notebook id
     * @param cell       the cell
     * @return the notebook cell
     */
    NotebookCell editNotebookCell(String notebookId, NotebookCell cell);

    /**
     * Edit notebook cell notebook cell.
     *
     * @param notebookId the notebook id
     * @param cellId     the cell id
     * @param cell       the cell
     * @return the notebook cell
     */
    NotebookCell editNotebookCell(String notebookId, String cellId, NotebookCell cell);

    /**
     * Delete notebook cell.
     *
     * @param notebookId the notebook id
     * @param cellId     the cell id
     */
    void deleteNotebookCell(String notebookId, String cellId);

    /**
     * Gets notebook cell.
     *
     * @param notebookId the notebook id
     * @param cellId     the cell id
     * @return the notebook cell
     */
    NotebookCell getNotebookCell(String notebookId, String cellId);
}
