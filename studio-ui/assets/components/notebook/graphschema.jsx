/**
 * @file Desciption:
 * @author huanghaiping(huanghaiping02@baidu.com)
 * Created on 17/6/30
 */

import React from 'react';


export default class GraphSchema extends React.Component {
    constructor() {
        super();
    }

    render() {

        return (
            <div id={this.props.id}>

            </div>
        );
    }

    componentDidMount() {
        this.drawGraph(data.data);
    }


    drawGraph = schema => {
        var nodes = new vis.DataSet();

        nodes.on('*', function () {
            //  do something
        });

        schema.vertexLabels.map(function (item) {
            nodes.add([
                {id: item.name, label: item.name, title: item.name}
            ]);
        });

        var edges = new vis.DataSet();
        edges.on('*', function () {
            // do something
        });

        var i = 0;
        schema.edgeLabels.map((item) => {
            item.connections.map(function (conn) {
                ++i;
                edges.add([
                    {
                        id: i,
                        from: conn.srcVertex,
                        to: conn.tgtVertex,
                        label: item.name
                    },
                ]);
            });

        });

        var container = document.getElementById(this.props.id);
        var data = {
            nodes: nodes,
            edges: edges,
        };
        var options = {
            /*
             *autoResize: true,
             * height:250,
             * width: '100%'
             */
            interaction: {hover: true},
            physics: true,
            nodes: {
                shape: 'circle',
                size: 20,
                font: {
                    size: 8
                },
                widthConstraint: {
                    maximum: 80
                },
                heightConstraint: {valign: 'middle'},
                shadow: true,
                color: {
                    background: '#b9baba', border: '#b9baba',
                    highlight: {background: '#0fa2f6', border: '#0fa2f6'},
                    hover: {background: '#06e4f8', border: '#06e4f8'}
                },
            },
            edges: {
                physics: true,

                shadow: true,
                smooth: {
                    type: 'dynamic'
                },
                font: {
                    size: 8
                },
                arrows: 'to',
                color: {highlight: '#0fa2f6', hover: '#06e4f8'},
                // length: 150
            },
        };
        var network = new vis.Network(container, data, options);
        network.on('showPopup', function (params) {
            //document.getElementById('eventSpan').innerHTML = '<h2>showPopup event: </h2>' + JSON.stringify(params, null, 4);
            document.getElementById('eventSpan').firstChild.nodeValue = '<h2>showPopup event: </h2>' + JSON.stringify(params, null, 4);
        });
    }
}


// interaction: {hover: true},

// configure: function (option, path) {
//     if (path.indexOf('dynamic') !== -1 || option === 'dynamic') {
//         return true;
//     }
//     return false;
// },

const data = {
    "status": 200,
    "data": {
        "propertyKeys": [
            {
                "name": "age",
                "type": "INT",
                "cardinality": "SINGLE"
            },
            {
                "name": "lang",
                "type": "TEXT",
                "cardinality": "SINGLE"
            },
            {
                "name": "weight",
                "type": "INT",
                "cardinality": "SINGLE"
            },
            {
                "name": "name",
                "type": "TEXT",
                "cardinality": "SINGLE"
            }
        ],
        "vertexLabels": [
            {
                "name": "person",
                "primaryKeys": [
                    {
                        "name": "name",
                        "type": "TEXT",
                        "cardinality": "SINGLE"
                    }
                ],
                "properties": [
                    {
                        "name": "name",
                        "type": "TEXT",
                        "cardinality": "SINGLE"
                    },
                    {
                        "name": "age",
                        "type": "INT",
                        "cardinality": "SINGLE"
                    }
                ]
            },
            {
                "name": "software",
                "primaryKeys": [
                    {
                        "name": "name",
                        "type": "TEXT",
                        "cardinality": "SINGLE"
                    }
                ],
                "properties": [
                    {
                        "name": "name",
                        "type": "TEXT",
                        "cardinality": "SINGLE"
                    },
                    {
                        "name": "lang",
                        "type": "TEXT",
                        "cardinality": "SINGLE"
                    }
                ]
            }
        ],
        "edgeLabels": [
            {
                "name": "created",
                "multiplicity": "SINGLE",
                "connections": [
                    {
                        "srcVertex": "person",
                        "tgtVertex": "software"
                    }
                ],
                "sortKeys": [],
                "properties": [
                    {
                        "name": "weight",
                        "type": "INT",
                        "cardinality": "SINGLE"
                    }
                ]
            },
            {
                "name": "knows",
                "multiplicity": "SINGLE",
                "connections": [
                    {
                        "srcVertex": "person",
                        "tgtVertex": "person"
                    }
                ],
                "sortKeys": [],
                "properties": [
                    {
                        "name": "weight",
                        "type": "INT",
                        "cardinality": "SINGLE"
                    }
                ]
            }
        ]
    }

}