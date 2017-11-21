/**
 * @file Desciption:
 * @author huanghaiping(huanghaiping02@baidu.com)
 * Created on 17/6/30
 */

import React from 'react';
import {connect} from 'react-redux';
import {updateGraph} from './actions';


class Graph extends React.Component {
    constructor() {
        super();
        this.state = {
            graphNodes: {},
            graphEdges: {}
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (document.getElementById(this.props.id) !== null) {
            document.getElementById(this.props.id).style.height = nextProps.height + 'px';
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
        if (graph !== null && graph.vertices !== undefined && graph.edges !== undefined) {
            let vertexData = graph.vertices;
            let edgeData = graph.edges;
            this.drawGraph(vertexData, edgeData);
        }
        this.loadDone();
    }

    componentDidMount() {
        let graph = this.props.content.graph;
        if (graph !== null && graph.vertices !== undefined && graph.edges !== undefined) {
            let vertexData = graph.vertices;
            let edgeData = graph.edges;
            this.drawGraph(vertexData, edgeData);

        }
        this.loadDone();

    }

    drawGraph = (vertexs, edges) => {
        this.state.graphNodes = new vis.DataSet();
        this.state.graphEdges = new vis.DataSet();

        if (vertexs !== null) {
            vertexs.forEach(vertex => {
                let title = '<div class="tooltips-label">' +
                    '<a class="round-red">●</a>&nbsp;' +
                    'label : ' + vertex.label + '</div>';
                for (let key in vertex.properties) {
                    title = title +
                        '<div>' +
                        '<a class="round-gray">●</a>&nbsp;' +
                        key + ' : ' + vertex.properties[key] + '</div>';
                }

                let label = vertex.id;
                this.state.graphNodes.add([
                    {id: vertex.id, label: label, title: title}
                ]);
            });
        }

        if (edges !== null) {
            edges.forEach(edge => {
                let title = '<div class="tooltips-label">' +
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
            autoResize: true,
            width: '100%',
            interaction: {
                hover: true,
                navigationButtons: true,
                zoomView: true
            },
            nodes: {
                font: {size: 12},
                scaling: {
                    min: 10,
                    max: 30
                },
                shape: 'dot',
                color: {
                    background: '#00ccff', border: '#00ccff',
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
                font: {
                    size: 8
                },
                arrows: 'to',
                color: {highlight: '#fb6a02', hover: '#ec3112'},
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
            let myHeaders = new Headers();
            myHeaders.append('Content-Type', 'application/json');
            let url = '/api/v1/notebooks/' + this.props.notebookId + '/cells/' +
                this.props.cellId + '/gremlin?vertexId=' + nodeId;
            fetch(url, {method: 'GET', headers: myHeaders})
                .then(response => this.checkStatus(response))
                .then(response => this.parseJSON(response))
                .then(data => {
                    this.addNode(data.graph.vertices);
                    this.addEdge(data.graph.edges);
                })
                .catch(err => {
                    console.log(err);
                });
        }
    }

    addNode = (vertices) => {
        try {
            if (vertices !== null) {
                vertices.forEach(vertex => {
                    let title = '<div class="tooltips-label">' +
                        '<a class="round-red">●</a>&nbsp;' +
                        'label : ' + vertex.label + '</div>';
                    for (let key in vertex.properties) {
                        title = title +
                            '<div> ' +
                            '<a class="round-gray">●</a>&nbsp;' +
                            key + ' : ' + vertex.properties[key][0].value +
                            '</div>';
                    }

                    let label = vertex.id;
                    this.state.graphNodes.add(
                        {id: vertex.id, label: label, title: title}
                    );
                });
            }
        }
        catch (err) {
            console.log(err);
        }
    }

    addEdge = (edges) => {
        try {
            edges.forEach(edge => {
                let title = '<div class="tooltips-label"> ' +
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
        }
        catch (err) {
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
