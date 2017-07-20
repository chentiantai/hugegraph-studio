/**
 * @file Desciption:
 * @author huanghaiping(huanghaiping02@baidu.com)
 * Created on 17/6/30
 */

import React from 'react';


export default class Graph extends React.Component {
    constructor() {
        super();
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (this.props.content === nextProps.content) {
            return false;
        } else {
            return true;
        }
    }

    render() {
        console.log("graph render");
        return (
            <div style={{height: this.props.height}}
                 id={this.props.id}
                 ref={el => this.graph = el}>
            </div>
        );
    }

    componentDidUpdate() {
        console.log("graph componentDidUpdate");
        let graph = this.props.content.graph;
        if (graph !== null && graph.vertices !== undefined && graph.edges !== undefined) {
            let vertexdata = graph.vertices;
            let edgedata = graph.edges;
            this.drawGraph(vertexdata, edgedata);
        }
    }

    componentDidMount() {
        console.log("graph componentDidMount");
        let graph = this.props.content.graph;
        if (graph !== null && graph.vertices !== undefined && graph.edges !== undefined) {
            let vertexdata = graph.vertices;
            let edgedata = graph.edges;
            this.drawGraph(vertexdata, edgedata);
        }
    }


    drawGraph = (vertexs, edges) => {
        let graphNodes = new vis.DataSet();

        graphNodes.on('*', function () {
            //  do something
        });


        vertexs.forEach(vertex => {
            let title = '<div class="tooltips-label"> <a class="round-red">●</a>&nbsp;' + 'label : ' + vertex.label + '</div>';
            for (let key in vertex.properties) {
                title = title + '<div> <a class="round-gray">●</a>&nbsp;' + key + ' :' +
                    ' ' + vertex.properties[key][0].value + '</div>';
            }

            let label = vertex.id.split('\u0002')[1];
            graphNodes.add([
                {id: vertex.id, label: label, title: title}
            ]);
        });

        let graphEdges = new vis.DataSet();


        graphEdges.on('*', function () {
            // do something
        });


        edges.forEach(edge => {

            graphEdges.add([
                {
                    id: edge.id,
                    from: edge.outV,
                    to: edge.inV,
                    label: edge.label
                }
            ]);
        });


        var container = document.getElementById(this.props.id);
        var data = {
            nodes: graphNodes,
            edges: graphEdges,
        };


        var options = {
            autoResize: true,
            width: '100%',
            interaction: {hover: true},
            nodes: {
                font: {size: 12},
                size: 20,
                shape: 'dot',
                widthConstraint: {
                    maximum: 80
                },
                heightConstraint: {valign: 'middle'},
                shadow: false,
                color: {
                    background: '#00ccff', border: '#00ccff',
                    highlight: {background: '#0fa2f6', border: '#0fa2f6'},
                    hover: {background: '#06e4f8', border: '#06e4f8'}
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
                color: {highlight: '#0fa2f6', hover: '#06e4f8'},
            },
            layout: {
                randomSeed: 34
            },
            physics: {
                forceAtlas2Based: {
                    gravitationalConstant: -26,
                    centralGravity: 0.005,
                    springLength: 230,
                    springConstant: 0.18
                },
                maxVelocity: 146,
                solver: 'forceAtlas2Based',
                timestep: 0.35,
                stabilization: {
                    enabled: true,
                    iterations: 2000,
                    updateInterval: 25
                }
            }
        };
        var network = new vis.Network(container, data, options);


        network.once("stabilizationIterationsDone", this.loadDone);

        // network.on('showPopup', function (params) {
        //     //document.getElementById('eventSpan').innerHTML = '<h2>showPopup event: </h2>' + JSON.stringify(params, null, 4);
        //     // document.getElementById('eventSpan').firstChild.nodeValue = '<h2>showPopup event: </h2>' + JSON.stringify(params, null, 4);
        // });
    }

    loadDone = () => {
        let loadingId = this.props.cellId + '_loading';
        document.getElementById(loadingId).style.display = 'none';
    }
}



