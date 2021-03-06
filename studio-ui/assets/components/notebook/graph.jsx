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
 * License for the specific language governing permissions and limitations
 * under the License.
 */

import React from 'react';
import {connect} from 'react-redux';
import {updateGraph} from './actions';

class Graph extends React.Component {

    constructor() {
        super();
        this.state = {
            graphNodes: {},
            graphEdges: {},
            groups:{}
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (document.getElementById(this.props.id) !== null) {
            document.getElementById(this.props.id).style.height =
                nextProps.height + 'px';
        }
        if (this.props.content === nextProps.content) {
            return false;
        } else {
            return true;
        }
    }

    render() {
        return (
            <div style={{height: this.props.height}}
                 id={this.props.id}
                 ref={el => this.graph = el}>
            </div>
        );
    }

    componentDidUpdate() {
        let graph = this.props.content.graph;
        if (graph !== null && graph.vertices !== undefined &&
            graph.edges !== undefined) {
            if(graph.groups == null){
                graph.groups = {};
            }
            this.drawGraph(graph.vertices, graph.edges, graph.styles);
        }
        this.loadDone();
    }

    componentDidMount() {
        let graph = this.props.content.graph;
        if (graph !== null && graph.vertices !== undefined &&
            graph.edges !== undefined) {
            if(graph.groups == null){
                graph.groups = {};
            }
            this.drawGraph(graph.vertices, graph.edges, graph.styles);
        }
        this.loadDone();
    }

    drawGraph = (vertices, edges, styles) => {
        this.state.graphNodes = new vis.DataSet();
        this.state.graphEdges = new vis.DataSet();

        if (vertices !== null) {
            vertices.forEach(vertex => {
                let title =
                    '<div class="tooltips-label">' +
                    '<a class="round-red">●</a>&nbsp;' +
                    'label : ' + vertex.label + '</div>';
                for (let key in vertex.properties) {
                    title = title +
                            '<div>' +
                            '<a class="round-gray">●</a>&nbsp;' +
                            key + ' : ' + vertex.properties[key] + '</div>';
                }

                this.state.graphNodes.add([{
                    id: vertex.id,
                    label: vertex.id,
                    title: title,
                    propertiesLabel: vertex.label,
                    group: vertex.label
                }]);
            });
        }

        if (edges !== null) {
            edges.forEach(edge => {
                let title =
                    '<div class="tooltips-label">' +
                    '<a class="round-red">●</a>&nbsp;' +
                    'label : ' + edge.label + '</div>';
                for (let key in edge.properties) {
                    title = title +
                            '<div>' +
                            '<a class="round-gray">●</a>&nbsp;' +
                            key + ' : ' + edge.properties[key] + '</div>';
                }
                this.state.graphEdges.add([
                    {
                        id: edge.id,
                        from: edge.outV,
                        to: edge.inV,
                        label: edge.label,
                        title: title
                    }
                ]);
            });
        }

        var container = document.getElementById(this.props.id);
        var data = {
            nodes: this.state.graphNodes,
            edges: this.state.graphEdges,
        };

        var options = {
            groups: styles.groups,
            autoResize: true,
            width: '100%',
            interaction: {
                hover: true,
                navigationButtons: true,
                zoomView: true
            },
            nodes: {
                font: styles.font,
                scaling: {
                    min: 10,
                    max: 30
                },
                shape: 'dot',
                color: {
                    background: '#00ccff',
                    border: '#00ccff',
                    highlight: {background: '#fb6a02', border: '#fb6a02'},
                    hover: {background: '#ec3112', border: '#ec3112'}
                },
            },
            edges: {
                physics: true,
                shadow: false,
                smooth: {
                    type: 'dynamic'
                },
                font: styles.edgeFont,
                arrows: 'to',
                color: styles.edgeColor,
            },
            physics: {
                maxVelocity: 50,
                solver: 'barnesHut',
                timestep: 0.5,
                stabilization: {iterations: 150}
            }
        };
        var network = new vis.Network(container, data, options);

        network.once("stabilizationIterationsDone", this.loadDone);
        network.on("doubleClick", (params) => this.doubleClick(params));
    }

    loadDone = () => {
        let loadingId = this.props.cellId + '_loading';
        document.getElementById(loadingId).style.display = 'none';
    }

    doubleClick = (params) => {
        params.event = "[original event]";

        if (params.nodes.length > 0) {
            let nodeId = params.nodes[0];
            let label = this.state.graphNodes._data[nodeId].propertiesLabel;
            let myHeaders = new Headers();
            myHeaders.append('Content-Type', 'application/json');
            let url = '/api/v1/notebooks/' + this.props.notebookId + '/cells/' +
                      this.props.cellId + '/gremlin?vertexId=' + nodeId +
                      '&label='+label;
            fetch(url, {method: 'GET', headers: myHeaders})
                .then(response => this.checkStatus(response))
                .then(response => this.parseJSON(response))
                .then(data => {
                    this.addNode(data.graph.vertices);
                    this.addEdge(data.graph.edges);
                    this.updateGroups(data.graph.groups);
                })
                .catch(err => {
                    console.log(err);
                });
        }
    }

    updateGroups = (groups) => {
        this.state.groups = groups;
    }

    addNode = (vertices) => {
        try {
            if (vertices !== null) {
                vertices.forEach(vertex => {
                    let title =
                        '<div class="tooltips-label">' +
                        '<a class="round-red">●</a>&nbsp;' +
                        'label : ' + vertex.label + '</div>';
                    for (let key in vertex.properties) {
                        title = title +
                                '<div> ' +
                                '<a class="round-gray">●</a>&nbsp;' +
                                key + ' : ' + vertex.properties[key] +
                                '</div>';
                    }

                    this.state.graphNodes.add({
                        id: vertex.id,
                        label: vertex.id,
                        title: title,
                        propertiesLabel: vertex.label,
                        group: vertex.label
                    });
                });
            }
        } catch (err) {
            console.log(err);
        }
    }

    addEdge = (edges) => {
        try {
            edges.forEach(edge => {
                let title =
                    '<div class="tooltips-label"> ' +
                    '<a class="round-red">●</a>&nbsp;' +
                    'label : ' + edge.label + '</div>';
                for (let key in edge.properties) {
                    title = title +
                            '<div>' +
                            '<a class="round-gray">●</a>&nbsp;' +
                            key + ' : ' + edge.properties[key] +
                            '</div>';
                }
                this.state.graphEdges.add([
                    {
                        id: edge.id,
                        from: edge.outV,
                        to: edge.inV,
                        label: edge.label,
                        title: title
                    }
                ]);
            });
        } catch (err) {
            console.log(err);
        }
    }

    checkStatus(response) {
        if (response.status >= 200 && response.status < 300) {
            return response
        } else {
            let error = new Error(response.statusText);
            error.status = response.status;
            throw error
        }
    }

    parseJSON(response) {
        return response.json()
    }
}

// Map Redux state to component props
function mapStateToProps(state) {
    return {
        cells: state.notebook.cells
    };
}

// Map Redux actions to component props
function mapDispatchToProps(dispatch) {
    return {
        updateGraph: (cellId, graph) => dispatch(updateGraph(cellId, graph))
    };
}

// Connected Component
export default  connect(
    mapStateToProps,
    mapDispatchToProps
)(Graph);
