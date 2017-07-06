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

    render() {
        return (
            <div style={{height: this.props.height}} id={this.props.id}
                 ref={el => this.graph = el}>
            </div>
        );
    }

    componentDidMount() {
        this.drawGraph(vertexdata, edgedata);
    }


    drawGraph = (vertexs, edges) => {
        let graphNodes = new vis.DataSet();

        graphNodes.on('*', function () {
            //  do something
        });

        vertexs.data.forEach(vertex => {
            graphNodes.add([
                {id: vertex.id, label: vertex.id, title: vertex.id}
            ]);
        });

        let graphEdges = new vis.DataSet();
        graphEdges.on('*', function () {
            // do something
        });


        edges.data.forEach(edge => {

            graphEdges.add([
                {
                    id: edge.id,
                    from: edge.inV,
                    to: edge.outV,
                    label: edge.label

                }
            ]);


            // edge.map(function (conn) {
            //     ++i;
            //     edges.add([
            //         {
            //             id: i,
            //             from: conn.srcVertex,
            //             to: conn.tgtVertex,
            //             label: item.name
            //         },
            //     ]);
            // });

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
            }
        };
        var network = new vis.Network(container, data, options);
        network.on('showPopup', function (params) {
            //document.getElementById('eventSpan').innerHTML = '<h2>showPopup event: </h2>' + JSON.stringify(params, null, 4);
            // document.getElementById('eventSpan').firstChild.nodeValue = '<h2>showPopup event: </h2>' + JSON.stringify(params, null, 4);
        });
    }
}


const vertexdata = {
    "data": [
        {
            "id": "person\u0002annabella Sciorra",
            "label": "person",
            "type": "vertex",
            "properties": {
                "born": [
                    {
                        "id": "born",
                        "value": 1960
                    }
                ],
                "name": [
                    {
                        "id": "name",
                        "value": "annabella Sciorra"
                    }
                ]
            }
        },
        {
            "id": "person\u0002Rick Yune",
            "label": "person",
            "type": "vertex",
            "properties": {
                "born": [
                    {
                        "id": "born",
                        "value": 1971
                    }
                ],
                "name": [
                    {
                        "id": "name",
                        "value": "Rick Yune"
                    }
                ]
            }
        },
        {
            "id": "person\u0002madonna",
            "label": "person",
            "type": "vertex",
            "properties": {
                "born": [
                    {
                        "id": "born",
                        "value": 1954
                    }
                ],
                "name": [
                    {
                        "id": "name",
                        "value": "madonna"
                    }
                ]
            }
        },
        {
            "id": "movie\u0002One Flew Over the Cuckoo's Nest",
            "label": "movie",
            "type": "vertex",
            "properties": {
                "title": [
                    {
                        "id": "title",
                        "value": "One Flew Over the Cuckoo's Nest"
                    }
                ],
                "released": [
                    {
                        "id": "released",
                        "value": 1975
                    }
                ]
            }
        },
        {
            "id": "person\u0002John Hurt",
            "label": "person",
            "type": "vertex",
            "properties": {
                "born": [
                    {
                        "id": "born",
                        "value": 1940
                    }
                ],
                "name": [
                    {
                        "id": "name",
                        "value": "John Hurt"
                    }
                ]
            }
        },
        {
            "id": "person\u0002Christian Bale",
            "label": "person",
            "type": "vertex",
            "properties": {
                "born": [
                    {
                        "id": "born",
                        "value": 1974
                    }
                ],
                "name": [
                    {
                        "id": "name",
                        "value": "Christian Bale"
                    }
                ]
            }
        },
        {
            "id": "person\u0002Natalie Portman",
            "label": "person",
            "type": "vertex",
            "properties": {
                "born": [
                    {
                        "id": "born",
                        "value": 1981
                    }
                ],
                "name": [
                    {
                        "id": "name",
                        "value": "Natalie Portman"
                    }
                ]
            }
        },
        {
            "id": "person\u0002Nancy Meyers",
            "label": "person",
            "type": "vertex",
            "properties": {
                "born": [
                    {
                        "id": "born",
                        "value": 1949
                    }
                ],
                "name": [
                    {
                        "id": "name",
                        "value": "Nancy Meyers"
                    }
                ]
            }
        },
        {
            "id": "person\u0002Penny Marshall",
            "label": "person",
            "type": "vertex",
            "properties": {
                "born": [
                    {
                        "id": "born",
                        "value": 1943
                    }
                ],
                "name": [
                    {
                        "id": "name",
                        "value": "Penny Marshall"
                    }
                ]
            }
        },
        {
            "id": "person\u0002Max von Sydow",
            "label": "person",
            "type": "vertex",
            "properties": {
                "born": [
                    {
                        "id": "born",
                        "value": 1929
                    }
                ],
                "name": [
                    {
                        "id": "name",
                        "value": "Max von Sydow"
                    }
                ]
            }
        },
        {
            "id": "movie\u0002You've Got Mail",
            "label": "movie",
            "type": "vertex",
            "properties": {
                "title": [
                    {
                        "id": "title",
                        "value": "You've Got Mail"
                    }
                ],
                "released": [
                    {
                        "id": "released",
                        "value": 1998
                    }
                ]
            }
        },
        {
            "id": "movie\u0002hoffa",
            "label": "movie",
            "type": "vertex",
            "properties": {
                "title": [
                    {
                        "id": "title",
                        "value": "hoffa"
                    }
                ],
                "released": [
                    {
                        "id": "released",
                        "value": 1992
                    }
                ]
            }
        },
        {
            "id": "person\u0002James Cromwell",
            "label": "person",
            "type": "vertex",
            "properties": {
                "born": [
                    {
                        "id": "born",
                        "value": 1940
                    }
                ],
                "name": [
                    {
                        "id": "name",
                        "value": "James Cromwell"
                    }
                ]
            }
        },
        {
            "id": "person\u0002David Mitchell",
            "label": "person",
            "type": "vertex",
            "properties": {
                "born": [
                    {
                        "id": "born",
                        "value": 1969
                    }
                ],
                "name": [
                    {
                        "id": "name",
                        "value": "David Mitchell"
                    }
                ]
            }
        },
        {
            "id": "person\u0002howard Deutch",
            "label": "person",
            "type": "vertex",
            "properties": {
                "born": [
                    {
                        "id": "born",
                        "value": 1950
                    }
                ],
                "name": [
                    {
                        "id": "name",
                        "value": "howard Deutch"
                    }
                ]
            }
        },
        {
            "id": "movie\u0002Frost/Nixon",
            "label": "movie",
            "type": "vertex",
            "properties": {
                "title": [
                    {
                        "id": "title",
                        "value": "Frost/Nixon"
                    }
                ],
                "released": [
                    {
                        "id": "released",
                        "value": 2008
                    }
                ]
            }
        },
        {
            "id": "person\u0002Kevin Pollak",
            "label": "person",
            "type": "vertex",
            "properties": {
                "born": [
                    {
                        "id": "born",
                        "value": 1957
                    }
                ],
                "name": [
                    {
                        "id": "name",
                        "value": "Kevin Pollak"
                    }
                ]
            }
        },
        {
            "id": "person\u0002Julia Roberts",
            "label": "person",
            "type": "vertex",
            "properties": {
                "born": [
                    {
                        "id": "born",
                        "value": 1967
                    }
                ],
                "name": [
                    {
                        "id": "name",
                        "value": "Julia Roberts"
                    }
                ]
            }
        },
        {
            "id": "person\u0002Oliver Platt",
            "label": "person",
            "type": "vertex",
            "properties": {
                "born": [
                    {
                        "id": "born",
                        "value": 1960
                    }
                ],
                "name": [
                    {
                        "id": "name",
                        "value": "Oliver Platt"
                    }
                ]
            }
        },
        {
            "id": "person\u0002Robert Longo",
            "label": "person",
            "type": "vertex",
            "properties": {
                "born": [
                    {
                        "id": "born",
                        "value": 1953
                    }
                ],
                "name": [
                    {
                        "id": "name",
                        "value": "Robert Longo"
                    }
                ]
            }
        },
        {
            "id": "person\u0002Bruno Kirby",
            "label": "person",
            "type": "vertex",
            "properties": {
                "born": [
                    {
                        "id": "born",
                        "value": 1949
                    }
                ],
                "name": [
                    {
                        "id": "name",
                        "value": "Bruno Kirby"
                    }
                ]
            }
        },
        {
            "id": "person\u0002Rob Reiner",
            "label": "person",
            "type": "vertex",
            "properties": {
                "born": [
                    {
                        "id": "born",
                        "value": 1947
                    }
                ],
                "name": [
                    {
                        "id": "name",
                        "value": "Rob Reiner"
                    }
                ]
            }
        },
        {
            "id": "person\u0002Kelly McGillis",
            "label": "person",
            "type": "vertex",
            "properties": {
                "born": [
                    {
                        "id": "born",
                        "value": 1957
                    }
                ],
                "name": [
                    {
                        "id": "name",
                        "value": "Kelly McGillis"
                    }
                ]
            }
        },
        {
            "id": "person\u0002taylor Hackford",
            "label": "person",
            "type": "vertex",
            "properties": {
                "born": [
                    {
                        "id": "born",
                        "value": 1944
                    }
                ],
                "name": [
                    {
                        "id": "name",
                        "value": "taylor Hackford"
                    }
                ]
            }
        },
        {
            "id": "person\u0002Noah Wyle",
            "label": "person",
            "type": "vertex",
            "properties": {
                "born": [
                    {
                        "id": "born",
                        "value": 1971
                    }
                ],
                "name": [
                    {
                        "id": "name",
                        "value": "Noah Wyle"
                    }
                ]
            }
        },
        {
            "id": "person\u0002dina Meyer",
            "label": "person",
            "type": "vertex",
            "properties": {
                "born": [
                    {
                        "id": "born",
                        "value": 1968
                    }
                ],
                "name": [
                    {
                        "id": "name",
                        "value": "dina Meyer"
                    }
                ]
            }
        },
        {
            "id": "person\u0002brooke Langton",
            "label": "person",
            "type": "vertex",
            "properties": {
                "born": [
                    {
                        "id": "born",
                        "value": 1970
                    }
                ],
                "name": [
                    {
                        "id": "name",
                        "value": "brooke Langton"
                    }
                ]
            }
        },
        {
            "id": "movie\u0002Snow Falling on Cedars",
            "label": "movie",
            "type": "vertex",
            "properties": {
                "title": [
                    {
                        "id": "title",
                        "value": "Snow Falling on Cedars"
                    }
                ],
                "released": [
                    {
                        "id": "released",
                        "value": 1999
                    }
                ]
            }
        },
        {
            "id": "person\u0002Christina Ricci",
            "label": "person",
            "type": "vertex",
            "properties": {
                "born": [
                    {
                        "id": "born",
                        "value": 1980
                    }
                ],
                "name": [
                    {
                        "id": "name",
                        "value": "Christina Ricci"
                    }
                ]
            }
        },
        {
            "id": "person\u0002Bill Pullman",
            "label": "person",
            "type": "vertex",
            "properties": {
                "born": [
                    {
                        "id": "born",
                        "value": 1953
                    }
                ],
                "name": [
                    {
                        "id": "name",
                        "value": "Bill Pullman"
                    }
                ]
            }
        },
        {
            "id": "person\u0002takeshi Kitano",
            "label": "person",
            "type": "vertex",
            "properties": {
                "born": [
                    {
                        "id": "born",
                        "value": 1947
                    }
                ],
                "name": [
                    {
                        "id": "name",
                        "value": "takeshi Kitano"
                    }
                ]
            }
        },
        {
            "id": "person\u0002James L. Brooks",
            "label": "person",
            "type": "vertex",
            "properties": {
                "born": [
                    {
                        "id": "born",
                        "value": 1940
                    }
                ],
                "name": [
                    {
                        "id": "name",
                        "value": "James L. Brooks"
                    }
                ]
            }
        },
        {
            "id": "person\u0002Jack Nicholson",
            "label": "person",
            "type": "vertex",
            "properties": {
                "born": [
                    {
                        "id": "born",
                        "value": 1937
                    }
                ],
                "name": [
                    {
                        "id": "name",
                        "value": "Jack Nicholson"
                    }
                ]
            }
        },
        {
            "id": "movie\u0002The Birdcage",
            "label": "movie",
            "type": "vertex",
            "properties": {
                "title": [
                    {
                        "id": "title",
                        "value": "The Birdcage"
                    }
                ],
                "released": [
                    {
                        "id": "released",
                        "value": 1996
                    }
                ]
            }
        },
        {
            "id": "person\u0002Regina King",
            "label": "person",
            "type": "vertex",
            "properties": {
                "born": [
                    {
                        "id": "born",
                        "value": 1961
                    }
                ],
                "name": [
                    {
                        "id": "name",
                        "value": "Regina King"
                    }
                ]
            }
        },
        {
            "id": "movie\u0002apollo 13",
            "label": "movie",
            "type": "vertex",
            "properties": {
                "title": [
                    {
                        "id": "title",
                        "value": "apollo 13"
                    }
                ],
                "released": [
                    {
                        "id": "released",
                        "value": 1995
                    }
                ]
            }
        },
        {
            "id": "movie\u0002The Da Vinci Code",
            "label": "movie",
            "type": "vertex",
            "properties": {
                "title": [
                    {
                        "id": "title",
                        "value": "The Da Vinci Code"
                    }
                ],
                "released": [
                    {
                        "id": "released",
                        "value": 2006
                    }
                ]
            }
        },
        {
            "id": "movie\u0002The Matrix",
            "label": "movie",
            "type": "vertex",
            "properties": {
                "title": [
                    {
                        "id": "title",
                        "value": "The Matrix"
                    }
                ],
                "released": [
                    {
                        "id": "released",
                        "value": 1999
                    }
                ]
            }
        },
        {
            "id": "person\u0002Liv Tyler",
            "label": "person",
            "type": "vertex",
            "properties": {
                "born": [
                    {
                        "id": "born",
                        "value": 1977
                    }
                ],
                "name": [
                    {
                        "id": "name",
                        "value": "Liv Tyler"
                    }
                ]
            }
        },
        {
            "id": "person\u0002gene Hackman",
            "label": "person",
            "type": "vertex",
            "properties": {
                "born": [
                    {
                        "id": "born",
                        "value": 1930
                    }
                ],
                "name": [
                    {
                        "id": "name",
                        "value": "gene Hackman"
                    }
                ]
            }
        },
        {
            "id": "movie\u0002The Polar Express",
            "label": "movie",
            "type": "vertex",
            "properties": {
                "title": [
                    {
                        "id": "title",
                        "value": "The Polar Express"
                    }
                ],
                "released": [
                    {
                        "id": "released",
                        "value": 2004
                    }
                ]
            }
        },
        {
            "id": "person\u0002River Phoenix",
            "label": "person",
            "type": "vertex",
            "properties": {
                "born": [
                    {
                        "id": "born",
                        "value": 1970
                    }
                ],
                "name": [
                    {
                        "id": "name",
                        "value": "River Phoenix"
                    }
                ]
            }
        },
        {
            "id": "person\u0002Ben Miles",
            "label": "person",
            "type": "vertex",
            "properties": {
                "born": [
                    {
                        "id": "born",
                        "value": 1967
                    }
                ],
                "name": [
                    {
                        "id": "name",
                        "value": "Ben Miles"
                    }
                ]
            }
        },
        {
            "id": "person\u0002addVertex",
            "label": "person",
            "type": "vertex",
            "properties": {
                "born": [
                    {
                        "id": "born",
                        "value": 1982
                    }
                ],
                "name": [
                    {
                        "id": "name",
                        "value": "addVertex"
                    }
                ]
            }
        },
        {
            "id": "person\u0002Lilly Wachowski",
            "label": "person",
            "type": "vertex",
            "properties": {
                "born": [
                    {
                        "id": "born",
                        "value": 1967
                    }
                ],
                "name": [
                    {
                        "id": "name",
                        "value": "Lilly Wachowski"
                    }
                ]
            }
        },
        {
            "id": "person\u0002Victor Garber",
            "label": "person",
            "type": "vertex",
            "properties": {
                "born": [
                    {
                        "id": "born",
                        "value": 1949
                    }
                ],
                "name": [
                    {
                        "id": "name",
                        "value": "Victor Garber"
                    }
                ]
            }
        },
        {
            "id": "person\u0002Rita Wilson",
            "label": "person",
            "type": "vertex",
            "properties": {
                "born": [
                    {
                        "id": "born",
                        "value": 1956
                    }
                ],
                "name": [
                    {
                        "id": "name",
                        "value": "Rita Wilson"
                    }
                ]
            }
        },
        {
            "id": "person\u0002Ron howard",
            "label": "person",
            "type": "vertex",
            "properties": {
                "born": [
                    {
                        "id": "born",
                        "value": 1954
                    }
                ],
                "name": [
                    {
                        "id": "name",
                        "value": "Ron howard"
                    }
                ]
            }
        },
        {
            "id": "person\u0002Jonathan Lipnicki",
            "label": "person",
            "type": "vertex",
            "properties": {
                "born": [
                    {
                        "id": "born",
                        "value": 1996
                    }
                ],
                "name": [
                    {
                        "id": "name",
                        "value": "Jonathan Lipnicki"
                    }
                ]
            }
        },
        {
            "id": "person\u0002audrey Tautou",
            "label": "person",
            "type": "vertex",
            "properties": {
                "born": [
                    {
                        "id": "born",
                        "value": 1976
                    }
                ],
                "name": [
                    {
                        "id": "name",
                        "value": "audrey Tautou"
                    }
                ]
            }
        },
        {
            "id": "person\u0002Joel Silver",
            "label": "person",
            "type": "vertex",
            "properties": {
                "born": [
                    {
                        "id": "born",
                        "value": 1952
                    }
                ],
                "name": [
                    {
                        "id": "name",
                        "value": "Joel Silver"
                    }
                ]
            }
        },
        {
            "id": "movie\u0002a League of Their Own",
            "label": "movie",
            "type": "vertex",
            "properties": {
                "title": [
                    {
                        "id": "title",
                        "value": "a League of Their Own"
                    }
                ],
                "released": [
                    {
                        "id": "released",
                        "value": 1992
                    }
                ]
            }
        },
        {
            "id": "person\u0002Zach Grenier",
            "label": "person",
            "type": "vertex",
            "properties": {
                "born": [
                    {
                        "id": "born",
                        "value": 1954
                    }
                ],
                "name": [
                    {
                        "id": "name",
                        "value": "Zach Grenier"
                    }
                ]
            }
        },
        {
            "id": "person\u0002Parker Posey",
            "label": "person",
            "type": "vertex",
            "properties": {
                "born": [
                    {
                        "id": "born",
                        "value": 1968
                    }
                ],
                "name": [
                    {
                        "id": "name",
                        "value": "Parker Posey"
                    }
                ]
            }
        },
        {
            "id": "person\u0002Marshall Bell",
            "label": "person",
            "type": "vertex",
            "properties": {
                "born": [
                    {
                        "id": "born",
                        "value": 1942
                    }
                ],
                "name": [
                    {
                        "id": "name",
                        "value": "Marshall Bell"
                    }
                ]
            }
        },
        {
            "id": "person\u0002Val Kilmer",
            "label": "person",
            "type": "vertex",
            "properties": {
                "born": [
                    {
                        "id": "born",
                        "value": 1959
                    }
                ],
                "name": [
                    {
                        "id": "name",
                        "value": "Val Kilmer"
                    }
                ]
            }
        },
        {
            "id": "person\u0002keanu Reeves",
            "label": "person",
            "type": "vertex",
            "properties": {
                "born": [
                    {
                        "id": "born",
                        "value": 1964
                    }
                ],
                "name": [
                    {
                        "id": "name",
                        "value": "keanu Reeves"
                    }
                ]
            }
        },
        {
            "id": "person\u0002Jim Broadbent",
            "label": "person",
            "type": "vertex",
            "properties": {
                "born": [
                    {
                        "id": "born",
                        "value": 1949
                    }
                ],
                "name": [
                    {
                        "id": "name",
                        "value": "Jim Broadbent"
                    }
                ]
            }
        },
        {
            "id": "person\u0002Halle Berry",
            "label": "person",
            "type": "vertex",
            "properties": {
                "born": [
                    {
                        "id": "born",
                        "value": 1966
                    }
                ],
                "name": [
                    {
                        "id": "name",
                        "value": "Halle Berry"
                    }
                ]
            }
        },
        {
            "id": "person\u0002J.T. Walsh",
            "label": "person",
            "type": "vertex",
            "properties": {
                "born": [
                    {
                        "id": "born",
                        "value": 1943
                    }
                ],
                "name": [
                    {
                        "id": "name",
                        "value": "J.T. Walsh"
                    }
                ]
            }
        },
        {
            "id": "person\u0002Michael Clarke Duncan",
            "label": "person",
            "type": "vertex",
            "properties": {
                "born": [
                    {
                        "id": "born",
                        "value": 1957
                    }
                ],
                "name": [
                    {
                        "id": "name",
                        "value": "Michael Clarke Duncan"
                    }
                ]
            }
        },
        {
            "id": "person\u0002Tom Hanks",
            "label": "person",
            "type": "vertex",
            "properties": {
                "born": [
                    {
                        "id": "born",
                        "value": 1956
                    }
                ],
                "name": [
                    {
                        "id": "name",
                        "value": "Tom Hanks"
                    }
                ]
            }
        },
        {
            "id": "person\u0002Nora Ephron",
            "label": "person",
            "type": "vertex",
            "properties": {
                "born": [
                    {
                        "id": "born",
                        "value": 1941
                    }
                ],
                "name": [
                    {
                        "id": "name",
                        "value": "Nora Ephron"
                    }
                ]
            }
        },
        {
            "id": "person\u0002Milos Forman",
            "label": "person",
            "type": "vertex",
            "properties": {
                "born": [
                    {
                        "id": "born",
                        "value": 1932
                    }
                ],
                "name": [
                    {
                        "id": "name",
                        "value": "Milos Forman"
                    }
                ]
            }
        },
        {
            "id": "person\u0002John Cusack",
            "label": "person",
            "type": "vertex",
            "properties": {
                "born": [
                    {
                        "id": "born",
                        "value": 1966
                    }
                ],
                "name": [
                    {
                        "id": "name",
                        "value": "John Cusack"
                    }
                ]
            }
        },
        {
            "id": "person\u0002Werner Herzog",
            "label": "person",
            "type": "vertex",
            "properties": {
                "born": [
                    {
                        "id": "born",
                        "value": 1942
                    }
                ],
                "name": [
                    {
                        "id": "name",
                        "value": "Werner Herzog"
                    }
                ]
            }
        },
        {
            "id": "movie\u0002The Replacements",
            "label": "movie",
            "type": "vertex",
            "properties": {
                "title": [
                    {
                        "id": "title",
                        "value": "The Replacements"
                    }
                ],
                "released": [
                    {
                        "id": "released",
                        "value": 2000
                    }
                ]
            }
        },
        {
            "id": "person\u0002James Marshall",
            "label": "person",
            "type": "vertex",
            "properties": {
                "born": [
                    {
                        "id": "born",
                        "value": 1967
                    }
                ],
                "name": [
                    {
                        "id": "name",
                        "value": "James Marshall"
                    }
                ]
            }
        },
        {
            "id": "person\u0002Diane Keaton",
            "label": "person",
            "type": "vertex",
            "properties": {
                "born": [
                    {
                        "id": "born",
                        "value": 1946
                    }
                ],
                "name": [
                    {
                        "id": "name",
                        "value": "Diane Keaton"
                    }
                ]
            }
        },
        {
            "id": "person\u0002Kevin Bacon",
            "label": "person",
            "type": "vertex",
            "properties": {
                "born": [
                    {
                        "id": "born",
                        "value": 1958
                    }
                ],
                "name": [
                    {
                        "id": "name",
                        "value": "Kevin Bacon"
                    }
                ]
            }
        },
        {
            "id": "person\u0002Ian McKellen",
            "label": "person",
            "type": "vertex",
            "properties": {
                "born": [
                    {
                        "id": "born",
                        "value": 1939
                    }
                ],
                "name": [
                    {
                        "id": "name",
                        "value": "Ian McKellen"
                    }
                ]
            }
        },
        {
            "id": "movie\u0002Cast away",
            "label": "movie",
            "type": "vertex",
            "properties": {
                "title": [
                    {
                        "id": "title",
                        "value": "Cast away"
                    }
                ],
                "released": [
                    {
                        "id": "released",
                        "value": 2000
                    }
                ]
            }
        },
        {
            "id": "person\u0002Lana Wachowski",
            "label": "person",
            "type": "vertex",
            "properties": {
                "born": [
                    {
                        "id": "born",
                        "value": 1965
                    }
                ],
                "name": [
                    {
                        "id": "name",
                        "value": "Lana Wachowski"
                    }
                ]
            }
        },
        {
            "id": "person\u0002Jim Cash",
            "label": "person",
            "type": "vertex",
            "properties": {
                "born": [
                    {
                        "id": "born",
                        "value": 1941
                    }
                ],
                "name": [
                    {
                        "id": "name",
                        "value": "Jim Cash"
                    }
                ]
            }
        },
        {
            "id": "person\u0002Tom Tykwer",
            "label": "person",
            "type": "vertex",
            "properties": {
                "born": [
                    {
                        "id": "born",
                        "value": 1965
                    }
                ],
                "name": [
                    {
                        "id": "name",
                        "value": "Tom Tykwer"
                    }
                ]
            }
        },
        {
            "id": "person\u0002Ice-T",
            "label": "person",
            "type": "vertex",
            "properties": {
                "born": [
                    {
                        "id": "born",
                        "value": 1958
                    }
                ],
                "name": [
                    {
                        "id": "name",
                        "value": "Ice-T"
                    }
                ]
            }
        },
        {
            "id": "person\u0002Lori Petty",
            "label": "person",
            "type": "vertex",
            "properties": {
                "born": [
                    {
                        "id": "born",
                        "value": 1963
                    }
                ],
                "name": [
                    {
                        "id": "name",
                        "value": "Lori Petty"
                    }
                ]
            }
        },
        {
            "id": "person\u0002John Goodman",
            "label": "person",
            "type": "vertex",
            "properties": {
                "born": [
                    {
                        "id": "born",
                        "value": 1940
                    }
                ],
                "name": [
                    {
                        "id": "name",
                        "value": "John Goodman"
                    }
                ]
            }
        },
        {
            "id": "person\u0002Matthew Fox",
            "label": "person",
            "type": "vertex",
            "properties": {
                "born": [
                    {
                        "id": "born",
                        "value": 1966
                    }
                ],
                "name": [
                    {
                        "id": "name",
                        "value": "Matthew Fox"
                    }
                ]
            }
        },
        {
            "id": "person\u0002Jan de Bont",
            "label": "person",
            "type": "vertex",
            "properties": {
                "born": [
                    {
                        "id": "born",
                        "value": 1943
                    }
                ],
                "name": [
                    {
                        "id": "name",
                        "value": "Jan de Bont"
                    }
                ]
            }
        },
        {
            "id": "person\u0002Jay Mohr",
            "label": "person",
            "type": "vertex",
            "properties": {
                "born": [
                    {
                        "id": "born",
                        "value": 1970
                    }
                ],
                "name": [
                    {
                        "id": "name",
                        "value": "Jay Mohr"
                    }
                ]
            }
        },
        {
            "id": "person\u0002Stefan arndt",
            "label": "person",
            "type": "vertex",
            "properties": {
                "born": [
                    {
                        "id": "born",
                        "value": 1961
                    }
                ],
                "name": [
                    {
                        "id": "name",
                        "value": "Stefan arndt"
                    }
                ]
            }
        },
        {
            "id": "person\u0002Meg Ryan",
            "label": "person",
            "type": "vertex",
            "properties": {
                "born": [
                    {
                        "id": "born",
                        "value": 1961
                    }
                ],
                "name": [
                    {
                        "id": "name",
                        "value": "Meg Ryan"
                    }
                ]
            }
        },
        {
            "id": "person\u0002Frank Langella",
            "label": "person",
            "type": "vertex",
            "properties": {
                "born": [
                    {
                        "id": "born",
                        "value": 1938
                    }
                ],
                "name": [
                    {
                        "id": "name",
                        "value": "Frank Langella"
                    }
                ]
            }
        },
        {
            "id": "person\u0002anthony Edwards",
            "label": "person",
            "type": "vertex",
            "properties": {
                "born": [
                    {
                        "id": "born",
                        "value": 1962
                    }
                ],
                "name": [
                    {
                        "id": "name",
                        "value": "anthony Edwards"
                    }
                ]
            }
        },
        {
            "id": "movie\u0002Stand By Me",
            "label": "movie",
            "type": "vertex",
            "properties": {
                "title": [
                    {
                        "id": "title",
                        "value": "Stand By Me"
                    }
                ],
                "released": [
                    {
                        "id": "released",
                        "value": 1986
                    }
                ]
            }
        },
        {
            "id": "person\u0002Bill Paxton",
            "label": "person",
            "type": "vertex",
            "properties": {
                "born": [
                    {
                        "id": "born",
                        "value": 1955
                    }
                ],
                "name": [
                    {
                        "id": "name",
                        "value": "Bill Paxton"
                    }
                ]
            }
        },
        {
            "id": "person\u0002Bonnie Hunt",
            "label": "person",
            "type": "vertex",
            "properties": {
                "born": [
                    {
                        "id": "born",
                        "value": 1970
                    }
                ],
                "name": [
                    {
                        "id": "name",
                        "value": "Bonnie Hunt"
                    }
                ]
            }
        },
        {
            "id": "person\u0002Susan Sarandon",
            "label": "person",
            "type": "vertex",
            "properties": {
                "born": [
                    {
                        "id": "born",
                        "value": 1966
                    }
                ],
                "name": [
                    {
                        "id": "name",
                        "value": "Susan Sarandon"
                    }
                ]
            }
        },
        {
            "id": "movie\u0002unforgiven",
            "label": "movie",
            "type": "vertex",
            "properties": {
                "title": [
                    {
                        "id": "title",
                        "value": "unforgiven"
                    }
                ],
                "released": [
                    {
                        "id": "released",
                        "value": 1992
                    }
                ]
            }
        },
        {
            "id": "person\u0002orlando Jones",
            "label": "person",
            "type": "vertex",
            "properties": {
                "born": [
                    {
                        "id": "born",
                        "value": 1968
                    }
                ],
                "name": [
                    {
                        "id": "name",
                        "value": "orlando Jones"
                    }
                ]
            }
        },
        {
            "id": "person\u0002Demi Moore",
            "label": "person",
            "type": "vertex",
            "properties": {
                "born": [
                    {
                        "id": "born",
                        "value": 1962
                    }
                ],
                "name": [
                    {
                        "id": "name",
                        "value": "Demi Moore"
                    }
                ]
            }
        },
        {
            "id": "movie\u0002Cloud atlas",
            "label": "movie",
            "type": "vertex",
            "properties": {
                "title": [
                    {
                        "id": "title",
                        "value": "Cloud atlas"
                    }
                ],
                "released": [
                    {
                        "id": "released",
                        "value": 2012
                    }
                ]
            }
        },
        {
            "id": "person\u0002hugo Weaving",
            "label": "person",
            "type": "vertex",
            "properties": {
                "born": [
                    {
                        "id": "born",
                        "value": 1960
                    }
                ],
                "name": [
                    {
                        "id": "name",
                        "value": "hugo Weaving"
                    }
                ]
            }
        },
        {
            "id": "person\u0002Cameron Crowe",
            "label": "person",
            "type": "vertex",
            "properties": {
                "born": [
                    {
                        "id": "born",
                        "value": 1957
                    }
                ],
                "name": [
                    {
                        "id": "name",
                        "value": "Cameron Crowe"
                    }
                ]
            }
        },
        {
            "id": "person\u0002Chris Columbus",
            "label": "person",
            "type": "vertex",
            "properties": {
                "born": [
                    {
                        "id": "born",
                        "value": 1958
                    }
                ],
                "name": [
                    {
                        "id": "name",
                        "value": "Chris Columbus"
                    }
                ]
            }
        },
        {
            "id": "movie\u0002Jerry Maguire",
            "label": "movie",
            "type": "vertex",
            "properties": {
                "title": [
                    {
                        "id": "title",
                        "value": "Jerry Maguire"
                    }
                ],
                "released": [
                    {
                        "id": "released",
                        "value": 2000
                    }
                ]
            }
        },
        {
            "id": "person\u0002Scott Hicks",
            "label": "person",
            "type": "vertex",
            "properties": {
                "born": [
                    {
                        "id": "born",
                        "value": 1953
                    }
                ],
                "name": [
                    {
                        "id": "name",
                        "value": "Scott Hicks"
                    }
                ]
            }
        },
        {
            "id": "movie\u0002That Thing You Do",
            "label": "movie",
            "type": "vertex",
            "properties": {
                "title": [
                    {
                        "id": "title",
                        "value": "That Thing You Do"
                    }
                ],
                "released": [
                    {
                        "id": "released",
                        "value": 1996
                    }
                ]
            }
        },
        {
            "id": "person\u0002Wil Wheaton",
            "label": "person",
            "type": "vertex",
            "properties": {
                "born": [
                    {
                        "id": "born",
                        "value": 1972
                    }
                ],
                "name": [
                    {
                        "id": "name",
                        "value": "Wil Wheaton"
                    }
                ]
            }
        },
        {
            "id": "person\u0002Geena Davis",
            "label": "person",
            "type": "vertex",
            "properties": {
                "born": [
                    {
                        "id": "born",
                        "value": 1956
                    }
                ],
                "name": [
                    {
                        "id": "name",
                        "value": "Geena Davis"
                    }
                ]
            }
        },
        {
            "id": "movie\u0002Joe Versus the Volcano",
            "label": "movie",
            "type": "vertex",
            "properties": {
                "title": [
                    {
                        "id": "title",
                        "value": "Joe Versus the Volcano"
                    }
                ],
                "released": [
                    {
                        "id": "released",
                        "value": 1990
                    }
                ]
            }
        },
        {
            "id": "person\u0002Danny DeVito",
            "label": "person",
            "type": "vertex",
            "properties": {
                "born": [
                    {
                        "id": "born",
                        "value": 1944
                    }
                ],
                "name": [
                    {
                        "id": "name",
                        "value": "Danny DeVito"
                    }
                ]
            }
        },
        {
            "id": "movie\u0002The Matrix Reloaded",
            "label": "movie",
            "type": "vertex",
            "properties": {
                "title": [
                    {
                        "id": "title",
                        "value": "The Matrix Reloaded"
                    }
                ],
                "released": [
                    {
                        "id": "released",
                        "value": 2003
                    }
                ]
            }
        },
        {
            "id": "person\u0002Stephen Rea",
            "label": "person",
            "type": "vertex",
            "properties": {
                "born": [
                    {
                        "id": "born",
                        "value": 1946
                    }
                ],
                "name": [
                    {
                        "id": "name",
                        "value": "Stephen Rea"
                    }
                ]
            }
        },
        {
            "id": "person\u0002Helen Hunt",
            "label": "person",
            "type": "vertex",
            "properties": {
                "born": [
                    {
                        "id": "born",
                        "value": 1963
                    }
                ],
                "name": [
                    {
                        "id": "name",
                        "value": "Helen Hunt"
                    }
                ]
            }
        },
        {
            "id": "person\u0002David Morse",
            "label": "person",
            "type": "vertex",
            "properties": {
                "born": [
                    {
                        "id": "born",
                        "value": 1953
                    }
                ],
                "name": [
                    {
                        "id": "name",
                        "value": "David Morse"
                    }
                ]
            }
        },
        {
            "id": "person\u0002charlize Theron",
            "label": "person",
            "type": "vertex",
            "properties": {
                "born": [
                    {
                        "id": "born",
                        "value": 1975
                    }
                ],
                "name": [
                    {
                        "id": "name",
                        "value": "charlize Theron"
                    }
                ]
            }
        },
        {
            "id": "person\u0002Philip Seymour Hoffman",
            "label": "person",
            "type": "vertex",
            "properties": {
                "born": [
                    {
                        "id": "born",
                        "value": 1967
                    }
                ],
                "name": [
                    {
                        "id": "name",
                        "value": "Philip Seymour Hoffman"
                    }
                ]
            }
        },
        {
            "id": "movie\u0002as Good as It Gets",
            "label": "movie",
            "type": "vertex",
            "properties": {
                "title": [
                    {
                        "id": "title",
                        "value": "as Good as It Gets"
                    }
                ],
                "released": [
                    {
                        "id": "released",
                        "value": 1997
                    }
                ]
            }
        },
        {
            "id": "movie\u0002a Few Good Men",
            "label": "movie",
            "type": "vertex",
            "properties": {
                "title": [
                    {
                        "id": "title",
                        "value": "a Few Good Men"
                    }
                ],
                "released": [
                    {
                        "id": "released",
                        "value": 1992
                    }
                ]
            }
        },
        {
            "id": "person\u0002Tom Cruise",
            "label": "person",
            "type": "vertex",
            "properties": {
                "born": [
                    {
                        "id": "born",
                        "value": 1962
                    }
                ],
                "name": [
                    {
                        "id": "name",
                        "value": "Tom Cruise"
                    }
                ]
            }
        },
        {
            "id": "movie\u0002rescueDawn",
            "label": "movie",
            "type": "vertex",
            "properties": {
                "title": [
                    {
                        "id": "title",
                        "value": "rescueDawn"
                    }
                ],
                "released": [
                    {
                        "id": "released",
                        "value": 2006
                    }
                ]
            }
        },
        {
            "id": "movie\u0002The Green Mile",
            "label": "movie",
            "type": "vertex",
            "properties": {
                "title": [
                    {
                        "id": "title",
                        "value": "The Green Mile"
                    }
                ],
                "released": [
                    {
                        "id": "released",
                        "value": 1999
                    }
                ]
            }
        },
        {
            "id": "person\u0002Richard Harris",
            "label": "person",
            "type": "vertex",
            "properties": {
                "born": [
                    {
                        "id": "born",
                        "value": 1930
                    }
                ],
                "name": [
                    {
                        "id": "name",
                        "value": "Richard Harris"
                    }
                ]
            }
        },
        {
            "id": "movie\u0002What Dreams May Come",
            "label": "movie",
            "type": "vertex",
            "properties": {
                "title": [
                    {
                        "id": "title",
                        "value": "What Dreams May Come"
                    }
                ],
                "released": [
                    {
                        "id": "released",
                        "value": 1998
                    }
                ]
            }
        },
        {
            "id": "movie\u0002Johnny Mnemonic",
            "label": "movie",
            "type": "vertex",
            "properties": {
                "title": [
                    {
                        "id": "title",
                        "value": "Johnny Mnemonic"
                    }
                ],
                "released": [
                    {
                        "id": "released",
                        "value": 1995
                    }
                ]
            }
        },
        {
            "id": "person\u0002Corey Feldman",
            "label": "person",
            "type": "vertex",
            "properties": {
                "born": [
                    {
                        "id": "born",
                        "value": 1971
                    }
                ],
                "name": [
                    {
                        "id": "name",
                        "value": "Corey Feldman"
                    }
                ]
            }
        },
        {
            "id": "person\u0002Emile Hirsch",
            "label": "person",
            "type": "vertex",
            "properties": {
                "born": [
                    {
                        "id": "born",
                        "value": 1985
                    }
                ],
                "name": [
                    {
                        "id": "name",
                        "value": "Emile Hirsch"
                    }
                ]
            }
        },
        {
            "id": "person\u0002John Patrick Stanley",
            "label": "person",
            "type": "vertex",
            "properties": {
                "born": [
                    {
                        "id": "born",
                        "value": 1950
                    }
                ],
                "name": [
                    {
                        "id": "name",
                        "value": "John Patrick Stanley"
                    }
                ]
            }
        },
        {
            "id": "person\u0002John C. Reilly",
            "label": "person",
            "type": "vertex",
            "properties": {
                "born": [
                    {
                        "id": "born",
                        "value": 1965
                    }
                ],
                "name": [
                    {
                        "id": "name",
                        "value": "John C. Reilly"
                    }
                ]
            }
        },
        {
            "id": "movie\u0002When Harry Met Sally",
            "label": "movie",
            "type": "vertex",
            "properties": {
                "title": [
                    {
                        "id": "title",
                        "value": "When Harry Met Sally"
                    }
                ],
                "released": [
                    {
                        "id": "released",
                        "value": 1998
                    }
                ]
            }
        },
        {
            "id": "person\u0002Vincent Ward",
            "label": "person",
            "type": "vertex",
            "properties": {
                "born": [
                    {
                        "id": "born",
                        "value": 1956
                    }
                ],
                "name": [
                    {
                        "id": "name",
                        "value": "Vincent Ward"
                    }
                ]
            }
        },
        {
            "id": "person\u0002Kelly Preston",
            "label": "person",
            "type": "vertex",
            "properties": {
                "born": [
                    {
                        "id": "born",
                        "value": 1962
                    }
                ],
                "name": [
                    {
                        "id": "name",
                        "value": "Kelly Preston"
                    }
                ]
            }
        },
        {
            "id": "person\u0002Michael Sheen",
            "label": "person",
            "type": "vertex",
            "properties": {
                "born": [
                    {
                        "id": "born",
                        "value": 1969
                    }
                ],
                "name": [
                    {
                        "id": "name",
                        "value": "Michael Sheen"
                    }
                ]
            }
        },
        {
            "id": "person\u0002Naomie Harris",
            "label": "person",
            "type": "vertex",
            "properties": {
                "born": [
                    {
                        "id": "born",
                        "value": 1982
                    }
                ],
                "name": [
                    {
                        "id": "name",
                        "value": "Naomie Harris"
                    }
                ]
            }
        },
        {
            "id": "person\u0002al Pacino",
            "label": "person",
            "type": "vertex",
            "properties": {
                "born": [
                    {
                        "id": "born",
                        "value": 1940
                    }
                ],
                "name": [
                    {
                        "id": "name",
                        "value": "al Pacino"
                    }
                ]
            }
        },
        {
            "id": "person\u0002Sam Rockwell",
            "label": "person",
            "type": "vertex",
            "properties": {
                "born": [
                    {
                        "id": "born",
                        "value": 1968
                    }
                ],
                "name": [
                    {
                        "id": "name",
                        "value": "Sam Rockwell"
                    }
                ]
            }
        },
        {
            "id": "person\u0002Tony Scott",
            "label": "person",
            "type": "vertex",
            "properties": {
                "born": [
                    {
                        "id": "born",
                        "value": 1944
                    }
                ],
                "name": [
                    {
                        "id": "name",
                        "value": "Tony Scott"
                    }
                ]
            }
        },
        {
            "id": "person\u0002carrie Fisher",
            "label": "person",
            "type": "vertex",
            "properties": {
                "born": [
                    {
                        "id": "born",
                        "value": 1956
                    }
                ],
                "name": [
                    {
                        "id": "name",
                        "value": "carrie Fisher"
                    }
                ]
            }
        },
        {
            "id": "movie\u0002Charlie Wilson's War",
            "label": "movie",
            "type": "vertex",
            "properties": {
                "title": [
                    {
                        "id": "title",
                        "value": "Charlie Wilson's War"
                    }
                ],
                "released": [
                    {
                        "id": "released",
                        "value": 2007
                    }
                ]
            }
        },
        {
            "id": "person\u0002Paul Bettany",
            "label": "person",
            "type": "vertex",
            "properties": {
                "born": [
                    {
                        "id": "born",
                        "value": 1971
                    }
                ],
                "name": [
                    {
                        "id": "name",
                        "value": "Paul Bettany"
                    }
                ]
            }
        },
        {
            "id": "movie\u0002twister",
            "label": "movie",
            "type": "vertex",
            "properties": {
                "title": [
                    {
                        "id": "title",
                        "value": "twister"
                    }
                ],
                "released": [
                    {
                        "id": "released",
                        "value": 1996
                    }
                ]
            }
        },
        {
            "id": "person\u0002nathan Lane",
            "label": "person",
            "type": "vertex",
            "properties": {
                "born": [
                    {
                        "id": "born",
                        "value": 1956
                    }
                ],
                "name": [
                    {
                        "id": "name",
                        "value": "nathan Lane"
                    }
                ]
            }
        },
        {
            "id": "person\u0002Jerry O'Connell",
            "label": "person",
            "type": "vertex",
            "properties": {
                "born": [
                    {
                        "id": "born",
                        "value": 1974
                    }
                ],
                "name": [
                    {
                        "id": "name",
                        "value": "Jerry O'Connell"
                    }
                ]
            }
        },
        {
            "id": "person\u0002Frank Darabont",
            "label": "person",
            "type": "vertex",
            "properties": {
                "born": [
                    {
                        "id": "born",
                        "value": 1959
                    }
                ],
                "name": [
                    {
                        "id": "name",
                        "value": "Frank Darabont"
                    }
                ]
            }
        },
        {
            "id": "person\u0002Tom Skerritt",
            "label": "person",
            "type": "vertex",
            "properties": {
                "born": [
                    {
                        "id": "born",
                        "value": 1933
                    }
                ],
                "name": [
                    {
                        "id": "name",
                        "value": "Tom Skerritt"
                    }
                ]
            }
        },
        {
            "id": "person\u0002Gary Sinise",
            "label": "person",
            "type": "vertex",
            "properties": {
                "born": [
                    {
                        "id": "born",
                        "value": 1955
                    }
                ],
                "name": [
                    {
                        "id": "name",
                        "value": "Gary Sinise"
                    }
                ]
            }
        },
        {
            "id": "person\u0002Steve Zahn",
            "label": "person",
            "type": "vertex",
            "properties": {
                "born": [
                    {
                        "id": "born",
                        "value": 1967
                    }
                ],
                "name": [
                    {
                        "id": "name",
                        "value": "Steve Zahn"
                    }
                ]
            }
        },
        {
            "id": "person\u0002Renee Zellweger",
            "label": "person",
            "type": "vertex",
            "properties": {
                "born": [
                    {
                        "id": "born",
                        "value": 1969
                    }
                ],
                "name": [
                    {
                        "id": "name",
                        "value": "Renee Zellweger"
                    }
                ]
            }
        },
        {
            "id": "person\u0002Robert Zemeckis",
            "label": "person",
            "type": "vertex",
            "properties": {
                "born": [
                    {
                        "id": "born",
                        "value": 1951
                    }
                ],
                "name": [
                    {
                        "id": "name",
                        "value": "Robert Zemeckis"
                    }
                ]
            }
        },
        {
            "id": "person\u0002laurence Fishburne",
            "label": "person",
            "type": "vertex",
            "properties": {
                "born": [
                    {
                        "id": "born",
                        "value": 1961
                    }
                ],
                "name": [
                    {
                        "id": "name",
                        "value": "laurence Fishburne"
                    }
                ]
            }
        },
        {
            "id": "person\u0002Kiefer Sutherland",
            "label": "person",
            "type": "vertex",
            "properties": {
                "born": [
                    {
                        "id": "born",
                        "value": 1966
                    }
                ],
                "name": [
                    {
                        "id": "name",
                        "value": "Kiefer Sutherland"
                    }
                ]
            }
        },
        {
            "id": "person\u0002Greg Kinnear",
            "label": "person",
            "type": "vertex",
            "properties": {
                "born": [
                    {
                        "id": "born",
                        "value": 1963
                    }
                ],
                "name": [
                    {
                        "id": "name",
                        "value": "Greg Kinnear"
                    }
                ]
            }
        },
        {
            "id": "movie\u0002Sleepless in Seattle",
            "label": "movie",
            "type": "vertex",
            "properties": {
                "title": [
                    {
                        "id": "title",
                        "value": "Sleepless in Seattle"
                    }
                ],
                "released": [
                    {
                        "id": "released",
                        "value": 1993
                    }
                ]
            }
        },
        {
            "id": "person\u0002Christopher Guest",
            "label": "person",
            "type": "vertex",
            "properties": {
                "born": [
                    {
                        "id": "born",
                        "value": 1948
                    }
                ],
                "name": [
                    {
                        "id": "name",
                        "value": "Christopher Guest"
                    }
                ]
            }
        },
        {
            "id": "person\u0002Cuba Gooding Jr.",
            "label": "person",
            "type": "vertex",
            "properties": {
                "born": [
                    {
                        "id": "born",
                        "value": 1968
                    }
                ],
                "name": [
                    {
                        "id": "name",
                        "value": "Cuba Gooding Jr."
                    }
                ]
            }
        },
        {
            "id": "person\u0002Dave Chappelle",
            "label": "person",
            "type": "vertex",
            "properties": {
                "born": [
                    {
                        "id": "born",
                        "value": 1973
                    }
                ],
                "name": [
                    {
                        "id": "name",
                        "value": "Dave Chappelle"
                    }
                ]
            }
        },
        {
            "id": "movie\u0002Speed Racer",
            "label": "movie",
            "type": "vertex",
            "properties": {
                "title": [
                    {
                        "id": "title",
                        "value": "Speed Racer"
                    }
                ],
                "released": [
                    {
                        "id": "released",
                        "value": 2008
                    }
                ]
            }
        },
        {
            "id": "person\u0002Mike Nichols",
            "label": "person",
            "type": "vertex",
            "properties": {
                "born": [
                    {
                        "id": "born",
                        "value": 1931
                    }
                ],
                "name": [
                    {
                        "id": "name",
                        "value": "Mike Nichols"
                    }
                ]
            }
        },
        {
            "id": "person\u0002Ed Harris",
            "label": "person",
            "type": "vertex",
            "properties": {
                "born": [
                    {
                        "id": "born",
                        "value": 1950
                    }
                ],
                "name": [
                    {
                        "id": "name",
                        "value": "Ed Harris"
                    }
                ]
            }
        },
        {
            "id": "movie\u0002Bicentennial Man",
            "label": "movie",
            "type": "vertex",
            "properties": {
                "title": [
                    {
                        "id": "title",
                        "value": "Bicentennial Man"
                    }
                ],
                "released": [
                    {
                        "id": "released",
                        "value": 2000
                    }
                ]
            }
        },
        {
            "id": "movie\u0002Something's Gotta Give",
            "label": "movie",
            "type": "vertex",
            "properties": {
                "title": [
                    {
                        "id": "title",
                        "value": "Something's Gotta Give"
                    }
                ],
                "released": [
                    {
                        "id": "released",
                        "value": 2003
                    }
                ]
            }
        },
        {
            "id": "person\u0002aaron Sorkin",
            "label": "person",
            "type": "vertex",
            "properties": {
                "born": [
                    {
                        "id": "born",
                        "value": 1961
                    }
                ],
                "name": [
                    {
                        "id": "name",
                        "value": "aaron Sorkin"
                    }
                ]
            }
        },
        {
            "id": "person\u0002Patricia Clarkson",
            "label": "person",
            "type": "vertex",
            "properties": {
                "born": [
                    {
                        "id": "born",
                        "value": 1959
                    }
                ],
                "name": [
                    {
                        "id": "name",
                        "value": "Patricia Clarkson"
                    }
                ]
            }
        },
        {
            "id": "movie\u0002The Matrix Revolutions",
            "label": "movie",
            "type": "vertex",
            "properties": {
                "title": [
                    {
                        "id": "title",
                        "value": "The Matrix Revolutions"
                    }
                ],
                "released": [
                    {
                        "id": "released",
                        "value": 2003
                    }
                ]
            }
        },
        {
            "id": "person\u0002carrie-anne Moss",
            "label": "person",
            "type": "vertex",
            "properties": {
                "born": [
                    {
                        "id": "born",
                        "value": 1967
                    }
                ],
                "name": [
                    {
                        "id": "name",
                        "value": "carrie-anne Moss"
                    }
                ]
            }
        },
        {
            "id": "person\u0002Ethan Hawke",
            "label": "person",
            "type": "vertex",
            "properties": {
                "born": [
                    {
                        "id": "born",
                        "value": 1970
                    }
                ],
                "name": [
                    {
                        "id": "name",
                        "value": "Ethan Hawke"
                    }
                ]
            }
        },
        {
            "id": "person\u0002Billy Crystal",
            "label": "person",
            "type": "vertex",
            "properties": {
                "born": [
                    {
                        "id": "born",
                        "value": 1948
                    }
                ],
                "name": [
                    {
                        "id": "name",
                        "value": "Billy Crystal"
                    }
                ]
            }
        },
        {
            "id": "person\u0002robin Williams",
            "label": "person",
            "type": "vertex",
            "properties": {
                "born": [
                    {
                        "id": "born",
                        "value": 1951
                    }
                ],
                "name": [
                    {
                        "id": "name",
                        "value": "robin Williams"
                    }
                ]
            }
        },
        {
            "id": "person\u0002emil Eifrem",
            "label": "person",
            "type": "vertex",
            "properties": {
                "born": [
                    {
                        "id": "born",
                        "value": 1978
                    }
                ],
                "name": [
                    {
                        "id": "name",
                        "value": "emil Eifrem"
                    }
                ]
            }
        },
        {
            "id": "movie\u0002The Devil's advocate",
            "label": "movie",
            "type": "vertex",
            "properties": {
                "title": [
                    {
                        "id": "title",
                        "value": "The Devil's advocate"
                    }
                ],
                "released": [
                    {
                        "id": "released",
                        "value": 1997
                    }
                ]
            }
        },
        {
            "id": "movie\u0002Top Gun",
            "label": "movie",
            "type": "vertex",
            "properties": {
                "title": [
                    {
                        "id": "title",
                        "value": "Top Gun"
                    }
                ],
                "released": [
                    {
                        "id": "released",
                        "value": 1986
                    }
                ]
            }
        },
        {
            "id": "person\u0002Rosie O'Donnell",
            "label": "person",
            "type": "vertex",
            "properties": {
                "born": [
                    {
                        "id": "born",
                        "value": 1962
                    }
                ],
                "name": [
                    {
                        "id": "name",
                        "value": "Rosie O'Donnell"
                    }
                ]
            }
        }
    ],
    "type": "VERTEX",
    "duration": 1314,
    "id": "c2e2ded4-e535-485e-b891-2954a209a310"
};

const edgedata = {
    "data": [
        {
            "id": "person\u0002Tom Hanks\u0001ACTED_IN\u0001Sam Baldwin\u0001movie\u0002Sleepless in Seattle",
            "label": "ACTED_IN",
            "type": "edge",
            "inVLabel": "movie",
            "outVLabel": "person",
            "inV": "movie\u0002Sleepless in Seattle",
            "outV": "person\u0002Tom Hanks",
            "properties": {
                "roles": "Sam Baldwin"
            }
        },
        {
            "id": "person\u0002Mike Nichols\u0001DIRECTED\u0001\u0001movie\u0002Charlie Wilson's War",
            "label": "DIRECTED",
            "type": "edge",
            "inVLabel": "movie",
            "outVLabel": "person",
            "inV": "movie\u0002Charlie Wilson's War",
            "outV": "person\u0002Mike Nichols",
            "properties": {
                "score": 10
            }
        },
        {
            "id": "person\u0002Lana Wachowski\u0001DIRECTED\u0001\u0001movie\u0002Cloud atlas",
            "label": "DIRECTED",
            "type": "edge",
            "inVLabel": "movie",
            "outVLabel": "person",
            "inV": "movie\u0002Cloud atlas",
            "outV": "person\u0002Lana Wachowski",
            "properties": {
                "score": 10
            }
        },
        {
            "id": "person\u0002Wil Wheaton\u0001ACTED_IN\u0001Gordie Lachance\u0001movie\u0002Stand By Me",
            "label": "ACTED_IN",
            "type": "edge",
            "inVLabel": "movie",
            "outVLabel": "person",
            "inV": "movie\u0002Stand By Me",
            "outV": "person\u0002Wil Wheaton",
            "properties": {
                "roles": "Gordie Lachance"
            }
        },
        {
            "id": "person\u0002addVertex\u0001ACTED_IN\u0001Raizo\u0001movie\u0002Speed Racer",
            "label": "ACTED_IN",
            "type": "edge",
            "inVLabel": "movie",
            "outVLabel": "person",
            "inV": "movie\u0002Speed Racer",
            "outV": "person\u0002addVertex",
            "properties": {
                "roles": "Raizo"
            }
        },
        {
            "id": "person\u0002Richard Harris\u0001DIRECTED\u0001\u0001movie\u0002unforgiven",
            "label": "DIRECTED",
            "type": "edge",
            "inVLabel": "movie",
            "outVLabel": "person",
            "inV": "movie\u0002unforgiven",
            "outV": "person\u0002Richard Harris",
            "properties": {
                "score": 10
            }
        },
        {
            "id": "person\u0002robin Williams\u0001ACTED_IN\u0001armand Goldman\u0001movie\u0002The Birdcage",
            "label": "ACTED_IN",
            "type": "edge",
            "inVLabel": "movie",
            "outVLabel": "person",
            "inV": "movie\u0002The Birdcage",
            "outV": "person\u0002robin Williams",
            "properties": {
                "roles": "armand Goldman"
            }
        },
        {
            "id": "person\u0002Robert Longo\u0001DIRECTED\u0001\u0001movie\u0002Johnny Mnemonic",
            "label": "DIRECTED",
            "type": "edge",
            "inVLabel": "movie",
            "outVLabel": "person",
            "inV": "movie\u0002Johnny Mnemonic",
            "outV": "person\u0002Robert Longo",
            "properties": {
                "score": 10
            }
        },
        {
            "id": "person\u0002Meg Ryan\u0001ACTED_IN\u0001Carole\u0001movie\u0002Top Gun",
            "label": "ACTED_IN",
            "type": "edge",
            "inVLabel": "movie",
            "outVLabel": "person",
            "inV": "movie\u0002Top Gun",
            "outV": "person\u0002Meg Ryan",
            "properties": {
                "roles": "Carole"
            }
        },
        {
            "id": "person\u0002Robert Zemeckis\u0001DIRECTED\u0001\u0001movie\u0002Cast away",
            "label": "DIRECTED",
            "type": "edge",
            "inVLabel": "movie",
            "outVLabel": "person",
            "inV": "movie\u0002Cast away",
            "outV": "person\u0002Robert Zemeckis",
            "properties": {
                "score": 10
            }
        },
        {
            "id": "person\u0002Scott Hicks\u0001DIRECTED\u0001\u0001movie\u0002Snow Falling on Cedars",
            "label": "DIRECTED",
            "type": "edge",
            "inVLabel": "movie",
            "outVLabel": "person",
            "inV": "movie\u0002Snow Falling on Cedars",
            "outV": "person\u0002Scott Hicks",
            "properties": {
                "score": 10
            }
        },
        {
            "id": "person\u0002aaron Sorkin\u0001ACTED_IN\u0001Man in Bar\u0001movie\u0002a Few Good Men",
            "label": "ACTED_IN",
            "type": "edge",
            "inVLabel": "movie",
            "outVLabel": "person",
            "inV": "movie\u0002a Few Good Men",
            "outV": "person\u0002aaron Sorkin",
            "properties": {
                "roles": "Man in Bar"
            }
        },
        {
            "id": "person\u0002Rob Reiner\u0001DIRECTED\u0001\u0001movie\u0002When Harry Met Sally",
            "label": "DIRECTED",
            "type": "edge",
            "inVLabel": "movie",
            "outVLabel": "person",
            "inV": "movie\u0002When Harry Met Sally",
            "outV": "person\u0002Rob Reiner",
            "properties": {
                "score": 10
            }
        },
        {
            "id": "person\u0002Emile Hirsch\u0001ACTED_IN\u0001Speed Racer\u0001movie\u0002Speed Racer",
            "label": "ACTED_IN",
            "type": "edge",
            "inVLabel": "movie",
            "outVLabel": "person",
            "inV": "movie\u0002Speed Racer",
            "outV": "person\u0002Emile Hirsch",
            "properties": {
                "roles": "Speed Racer"
            }
        },
        {
            "id": "person\u0002Naomie Harris\u0001ACTED_IN\u0001Mika Coretti\u0001movie\u0002Speed Racer",
            "label": "ACTED_IN",
            "type": "edge",
            "inVLabel": "movie",
            "outVLabel": "person",
            "inV": "movie\u0002Speed Racer",
            "outV": "person\u0002Naomie Harris",
            "properties": {
                "roles": "Mika Coretti"
            }
        },
        {
            "id": "person\u0002Kevin Bacon\u0001ACTED_IN\u0001Jack Swigert\u0001movie\u0002apollo 13",
            "label": "ACTED_IN",
            "type": "edge",
            "inVLabel": "movie",
            "outVLabel": "person",
            "inV": "movie\u0002apollo 13",
            "outV": "person\u0002Kevin Bacon",
            "properties": {
                "roles": "Jack Swigert"
            }
        },
        {
            "id": "person\u0002James Marshall\u0001ACTED_IN\u0001Pfc. Louden Downey\u0001movie\u0002a Few Good Men",
            "label": "ACTED_IN",
            "type": "edge",
            "inVLabel": "movie",
            "outVLabel": "person",
            "inV": "movie\u0002a Few Good Men",
            "outV": "person\u0002James Marshall",
            "properties": {
                "roles": "Pfc. Louden Downey"
            }
        },
        {
            "id": "person\u0002Marshall Bell\u0001ACTED_IN\u0001admiral\u0001movie\u0002rescueDawn",
            "label": "ACTED_IN",
            "type": "edge",
            "inVLabel": "movie",
            "outVLabel": "person",
            "inV": "movie\u0002rescueDawn",
            "outV": "person\u0002Marshall Bell",
            "properties": {
                "roles": "admiral"
            }
        },
        {
            "id": "person\u0002anthony Edwards\u0001ACTED_IN\u0001Goose\u0001movie\u0002Top Gun",
            "label": "ACTED_IN",
            "type": "edge",
            "inVLabel": "movie",
            "outVLabel": "person",
            "inV": "movie\u0002Top Gun",
            "outV": "person\u0002anthony Edwards",
            "properties": {
                "roles": "Goose"
            }
        },
        {
            "id": "person\u0002Zach Grenier\u0001ACTED_IN\u0001Eddie\u0001movie\u0002twister",
            "label": "ACTED_IN",
            "type": "edge",
            "inVLabel": "movie",
            "outVLabel": "person",
            "inV": "movie\u0002twister",
            "outV": "person\u0002Zach Grenier",
            "properties": {
                "roles": "Eddie"
            }
        },
        {
            "id": "person\u0002Michael Sheen\u0001ACTED_IN\u0001David Frost\u0001movie\u0002Frost/Nixon",
            "label": "ACTED_IN",
            "type": "edge",
            "inVLabel": "movie",
            "outVLabel": "person",
            "inV": "movie\u0002Frost/Nixon",
            "outV": "person\u0002Michael Sheen",
            "properties": {
                "roles": "David Frost"
            }
        },
        {
            "id": "person\u0002Diane Keaton\u0001ACTED_IN\u0001Erica Barry\u0001movie\u0002Something's Gotta Give",
            "label": "ACTED_IN",
            "type": "edge",
            "inVLabel": "movie",
            "outVLabel": "person",
            "inV": "movie\u0002Something's Gotta Give",
            "outV": "person\u0002Diane Keaton",
            "properties": {
                "roles": "Erica Barry"
            }
        },
        {
            "id": "person\u0002Lana Wachowski\u0001DIRECTED\u0001\u0001movie\u0002The Matrix Revolutions",
            "label": "DIRECTED",
            "type": "edge",
            "inVLabel": "movie",
            "outVLabel": "person",
            "inV": "movie\u0002The Matrix Revolutions",
            "outV": "person\u0002Lana Wachowski",
            "properties": {
                "score": 10
            }
        },
        {
            "id": "person\u0002gene Hackman\u0001ACTED_IN\u0001Jimmy McGinty\u0001movie\u0002The Replacements",
            "label": "ACTED_IN",
            "type": "edge",
            "inVLabel": "movie",
            "outVLabel": "person",
            "inV": "movie\u0002The Replacements",
            "outV": "person\u0002gene Hackman",
            "properties": {
                "roles": "Jimmy McGinty"
            }
        },
        {
            "id": "person\u0002Rob Reiner\u0001PRODUCED\u0001\u0001movie\u0002When Harry Met Sally",
            "label": "PRODUCED",
            "type": "edge",
            "inVLabel": "movie",
            "outVLabel": "person",
            "inV": "movie\u0002When Harry Met Sally",
            "outV": "person\u0002Rob Reiner",
            "properties": {
                "score": 10
            }
        },
        {
            "id": "person\u0002Ben Miles\u0001ACTED_IN\u0001Ryan Maslow\u0001movie\u0002Speed Racer",
            "label": "ACTED_IN",
            "type": "edge",
            "inVLabel": "movie",
            "outVLabel": "person",
            "inV": "movie\u0002Speed Racer",
            "outV": "person\u0002Ben Miles",
            "properties": {
                "roles": "Ryan Maslow"
            }
        },
        {
            "id": "person\u0002nathan Lane\u0001ACTED_IN\u0001Baw\u0001movie\u0002Joe Versus the Volcano",
            "label": "ACTED_IN",
            "type": "edge",
            "inVLabel": "movie",
            "outVLabel": "person",
            "inV": "movie\u0002Joe Versus the Volcano",
            "outV": "person\u0002nathan Lane",
            "properties": {
                "roles": "Baw"
            }
        },
        {
            "id": "person\u0002Lilly Wachowski\u0001WROTE\u0001\u0001movie\u0002Speed Racer",
            "label": "WROTE",
            "type": "edge",
            "inVLabel": "movie",
            "outVLabel": "person",
            "inV": "movie\u0002Speed Racer",
            "outV": "person\u0002Lilly Wachowski",
            "properties": {
                "score": 10
            }
        },
        {
            "id": "person\u0002takeshi Kitano\u0001ACTED_IN\u0001Takahashi\u0001movie\u0002Johnny Mnemonic",
            "label": "ACTED_IN",
            "type": "edge",
            "inVLabel": "movie",
            "outVLabel": "person",
            "inV": "movie\u0002Johnny Mnemonic",
            "outV": "person\u0002takeshi Kitano",
            "properties": {
                "roles": "Takahashi"
            }
        },
        {
            "id": "person\u0002Vincent Ward\u0001DIRECTED\u0001\u0001movie\u0002What Dreams May Come",
            "label": "DIRECTED",
            "type": "edge",
            "inVLabel": "movie",
            "outVLabel": "person",
            "inV": "movie\u0002What Dreams May Come",
            "outV": "person\u0002Vincent Ward",
            "properties": {
                "score": 10
            }
        },
        {
            "id": "person\u0002Werner Herzog\u0001DIRECTED\u0001\u0001movie\u0002rescueDawn",
            "label": "DIRECTED",
            "type": "edge",
            "inVLabel": "movie",
            "outVLabel": "person",
            "inV": "movie\u0002rescueDawn",
            "outV": "person\u0002Werner Herzog",
            "properties": {
                "score": 10
            }
        },
        {
            "id": "person\u0002Nancy Meyers\u0001DIRECTED\u0001\u0001movie\u0002Something's Gotta Give",
            "label": "DIRECTED",
            "type": "edge",
            "inVLabel": "movie",
            "outVLabel": "person",
            "inV": "movie\u0002Something's Gotta Give",
            "outV": "person\u0002Nancy Meyers",
            "properties": {
                "score": 10
            }
        },
        {
            "id": "person\u0002addVertex\u0001ACTED_IN\u0001Taejo Togokahn\u0001movie\u0002Speed Racer",
            "label": "ACTED_IN",
            "type": "edge",
            "inVLabel": "movie",
            "outVLabel": "person",
            "inV": "movie\u0002Speed Racer",
            "outV": "person\u0002addVertex",
            "properties": {
                "roles": "Taejo Togokahn"
            }
        },
        {
            "id": "person\u0002Lilly Wachowski\u0001DIRECTED\u0001\u0001movie\u0002The Matrix Revolutions",
            "label": "DIRECTED",
            "type": "edge",
            "inVLabel": "movie",
            "outVLabel": "person",
            "inV": "movie\u0002The Matrix Revolutions",
            "outV": "person\u0002Lilly Wachowski",
            "properties": {
                "score": 10
            }
        },
        {
            "id": "person\u0002orlando Jones\u0001ACTED_IN\u0001Clifford Franklin\u0001movie\u0002The Replacements",
            "label": "ACTED_IN",
            "type": "edge",
            "inVLabel": "movie",
            "outVLabel": "person",
            "inV": "movie\u0002The Replacements",
            "outV": "person\u0002orlando Jones",
            "properties": {
                "roles": "Clifford Franklin"
            }
        },
        {
            "id": "person\u0002Lilly Wachowski\u0001DIRECTED\u0001\u0001movie\u0002The Matrix",
            "label": "DIRECTED",
            "type": "edge",
            "inVLabel": "movie",
            "outVLabel": "person",
            "inV": "movie\u0002The Matrix",
            "outV": "person\u0002Lilly Wachowski",
            "properties": {
                "score": 10
            }
        },
        {
            "id": "person\u0002Lana Wachowski\u0001PRODUCED\u0001\u0001movie\u0002The Da Vinci Code",
            "label": "PRODUCED",
            "type": "edge",
            "inVLabel": "movie",
            "outVLabel": "person",
            "inV": "movie\u0002The Da Vinci Code",
            "outV": "person\u0002Lana Wachowski",
            "properties": {
                "score": 10
            }
        },
        {
            "id": "person\u0002Renee Zellweger\u0001ACTED_IN\u0001Dorothy Boyd\u0001movie\u0002Jerry Maguire",
            "label": "ACTED_IN",
            "type": "edge",
            "inVLabel": "movie",
            "outVLabel": "person",
            "inV": "movie\u0002Jerry Maguire",
            "outV": "person\u0002Renee Zellweger",
            "properties": {
                "roles": "Dorothy Boyd"
            }
        },
        {
            "id": "person\u0002Lilly Wachowski\u0001WROTE\u0001\u0001movie\u0002The Da Vinci Code",
            "label": "WROTE",
            "type": "edge",
            "inVLabel": "movie",
            "outVLabel": "person",
            "inV": "movie\u0002The Da Vinci Code",
            "outV": "person\u0002Lilly Wachowski",
            "properties": {
                "score": 10
            }
        },
        {
            "id": "person\u0002David Mitchell\u0001WROTE\u0001\u0001movie\u0002Cloud atlas",
            "label": "WROTE",
            "type": "edge",
            "inVLabel": "movie",
            "outVLabel": "person",
            "inV": "movie\u0002Cloud atlas",
            "outV": "person\u0002David Mitchell",
            "properties": {
                "score": 10
            }
        },
        {
            "id": "person\u0002Helen Hunt\u0001ACTED_IN\u0001Dr. Jo Harding\u0001movie\u0002twister",
            "label": "ACTED_IN",
            "type": "edge",
            "inVLabel": "movie",
            "outVLabel": "person",
            "inV": "movie\u0002twister",
            "outV": "person\u0002Helen Hunt",
            "properties": {
                "roles": "Dr. Jo Harding"
            }
        },
        {
            "id": "person\u0002Lana Wachowski\u0001WROTE\u0001\u0001movie\u0002Speed Racer",
            "label": "WROTE",
            "type": "edge",
            "inVLabel": "movie",
            "outVLabel": "person",
            "inV": "movie\u0002Speed Racer",
            "outV": "person\u0002Lana Wachowski",
            "properties": {
                "score": 10
            }
        },
        {
            "id": "person\u0002J.T. Walsh\u0001ACTED_IN\u0001Lt. Col. Matthew andrew Markinson\u0001movie\u0002a Few Good Men",
            "label": "ACTED_IN",
            "type": "edge",
            "inVLabel": "movie",
            "outVLabel": "person",
            "inV": "movie\u0002a Few Good Men",
            "outV": "person\u0002J.T. Walsh",
            "properties": {
                "roles": "Lt. Col. Matthew andrew Markinson"
            }
        },
        {
            "id": "person\u0002Tom Hanks\u0001ACTED_IN\u0001Joe Banks\u0001movie\u0002Joe Versus the Volcano",
            "label": "ACTED_IN",
            "type": "edge",
            "inVLabel": "movie",
            "outVLabel": "person",
            "inV": "movie\u0002Joe Versus the Volcano",
            "outV": "person\u0002Tom Hanks",
            "properties": {
                "roles": "Joe Banks"
            }
        },
        {
            "id": "person\u0002keanu Reeves\u0001ACTED_IN\u0001Neo\u0001movie\u0002The Matrix Revolutions",
            "label": "ACTED_IN",
            "type": "edge",
            "inVLabel": "movie",
            "outVLabel": "person",
            "inV": "movie\u0002The Matrix Revolutions",
            "outV": "person\u0002keanu Reeves",
            "properties": {
                "roles": "Neo"
            }
        },
        {
            "id": "person\u0002carrie-anne Moss\u0001ACTED_IN\u0001Trinity\u0001movie\u0002The Matrix Reloaded",
            "label": "ACTED_IN",
            "type": "edge",
            "inVLabel": "movie",
            "outVLabel": "person",
            "inV": "movie\u0002The Matrix Reloaded",
            "outV": "person\u0002carrie-anne Moss",
            "properties": {
                "roles": "Trinity"
            }
        },
        {
            "id": "person\u0002Nancy Meyers\u0001PRODUCED\u0001\u0001movie\u0002Something's Gotta Give",
            "label": "PRODUCED",
            "type": "edge",
            "inVLabel": "movie",
            "outVLabel": "person",
            "inV": "movie\u0002Something's Gotta Give",
            "outV": "person\u0002Nancy Meyers",
            "properties": {
                "score": 10
            }
        },
        {
            "id": "person\u0002Joel Silver\u0001PRODUCED\u0001\u0001movie\u0002The Matrix Revolutions",
            "label": "PRODUCED",
            "type": "edge",
            "inVLabel": "movie",
            "outVLabel": "person",
            "inV": "movie\u0002The Matrix Revolutions",
            "outV": "person\u0002Joel Silver",
            "properties": {
                "score": 10
            }
        },
        {
            "id": "person\u0002gene Hackman\u0001ACTED_IN\u0001Sen. Kevin Keeley\u0001movie\u0002The Birdcage",
            "label": "ACTED_IN",
            "type": "edge",
            "inVLabel": "movie",
            "outVLabel": "person",
            "inV": "movie\u0002The Birdcage",
            "outV": "person\u0002gene Hackman",
            "properties": {
                "roles": "Sen. Kevin Keeley"
            }
        },
        {
            "id": "person\u0002Rick Yune\u0001ACTED_IN\u0001takeshi\u0001movie\u0002Speed Racer",
            "label": "ACTED_IN",
            "type": "edge",
            "inVLabel": "movie",
            "outVLabel": "person",
            "inV": "movie\u0002Speed Racer",
            "outV": "person\u0002Rick Yune",
            "properties": {
                "roles": "takeshi"
            }
        },
        {
            "id": "person\u0002Ben Miles\u0001ACTED_IN\u0001Dascomb\u0001movie\u0002The Da Vinci Code",
            "label": "ACTED_IN",
            "type": "edge",
            "inVLabel": "movie",
            "outVLabel": "person",
            "inV": "movie\u0002The Da Vinci Code",
            "outV": "person\u0002Ben Miles",
            "properties": {
                "roles": "Dascomb"
            }
        },
        {
            "id": "person\u0002robin Williams\u0001ACTED_IN\u0001Chris Nielsen\u0001movie\u0002What Dreams May Come",
            "label": "ACTED_IN",
            "type": "edge",
            "inVLabel": "movie",
            "outVLabel": "person",
            "inV": "movie\u0002What Dreams May Come",
            "outV": "person\u0002robin Williams",
            "properties": {
                "roles": "Chris Nielsen"
            }
        },
        {
            "id": "person\u0002keanu Reeves\u0001ACTED_IN\u0001Shane Falco\u0001movie\u0002The Replacements",
            "label": "ACTED_IN",
            "type": "edge",
            "inVLabel": "movie",
            "outVLabel": "person",
            "inV": "movie\u0002The Replacements",
            "outV": "person\u0002keanu Reeves",
            "properties": {
                "roles": "Shane Falco"
            }
        },
        {
            "id": "person\u0002Steve Zahn\u0001ACTED_IN\u0001Duane\u0001movie\u0002rescueDawn",
            "label": "ACTED_IN",
            "type": "edge",
            "inVLabel": "movie",
            "outVLabel": "person",
            "inV": "movie\u0002rescueDawn",
            "outV": "person\u0002Steve Zahn",
            "properties": {
                "roles": "Duane"
            }
        },
        {
            "id": "person\u0002Rob Reiner\u0001DIRECTED\u0001\u0001movie\u0002Stand By Me",
            "label": "DIRECTED",
            "type": "edge",
            "inVLabel": "movie",
            "outVLabel": "person",
            "inV": "movie\u0002Stand By Me",
            "outV": "person\u0002Rob Reiner",
            "properties": {
                "score": 10
            }
        },
        {
            "id": "person\u0002Kelly McGillis\u0001ACTED_IN\u0001Charlie\u0001movie\u0002Top Gun",
            "label": "ACTED_IN",
            "type": "edge",
            "inVLabel": "movie",
            "outVLabel": "person",
            "inV": "movie\u0002Top Gun",
            "outV": "person\u0002Kelly McGillis",
            "properties": {
                "roles": "Charlie"
            }
        },
        {
            "id": "person\u0002Tom Hanks\u0001ACTED_IN\u0001Zachry, Dr. Henry Goose, Isaac Sachs, Dermot Hoggins\u0001movie\u0002Cloud atlas",
            "label": "ACTED_IN",
            "type": "edge",
            "inVLabel": "movie",
            "outVLabel": "person",
            "inV": "movie\u0002Cloud atlas",
            "outV": "person\u0002Tom Hanks",
            "properties": {
                "roles": "Zachry, Dr. Henry Goose, Isaac Sachs, Dermot Hoggins"
            }
        },
        {
            "id": "person\u0002Billy Crystal\u0001ACTED_IN\u0001Harry Burns\u0001movie\u0002When Harry Met Sally",
            "label": "ACTED_IN",
            "type": "edge",
            "inVLabel": "movie",
            "outVLabel": "person",
            "inV": "movie\u0002When Harry Met Sally",
            "outV": "person\u0002Billy Crystal",
            "properties": {
                "roles": "Harry Burns"
            }
        },
        {
            "id": "person\u0002Jerry O'Connell\u0001ACTED_IN\u0001Frank Cushman\u0001movie\u0002Jerry Maguire",
            "label": "ACTED_IN",
            "type": "edge",
            "inVLabel": "movie",
            "outVLabel": "person",
            "inV": "movie\u0002Jerry Maguire",
            "outV": "person\u0002Jerry O'Connell",
            "properties": {
                "roles": "Frank Cushman"
            }
        },
        {
            "id": "person\u0002Rick Yune\u0001ACTED_IN\u0001Kazuo Miyamoto\u0001movie\u0002Snow Falling on Cedars",
            "label": "ACTED_IN",
            "type": "edge",
            "inVLabel": "movie",
            "outVLabel": "person",
            "inV": "movie\u0002Snow Falling on Cedars",
            "outV": "person\u0002Rick Yune",
            "properties": {
                "roles": "Kazuo Miyamoto"
            }
        },
        {
            "id": "person\u0002Bonnie Hunt\u0001ACTED_IN\u0001Laurel Boyd\u0001movie\u0002Jerry Maguire",
            "label": "ACTED_IN",
            "type": "edge",
            "inVLabel": "movie",
            "outVLabel": "person",
            "inV": "movie\u0002Jerry Maguire",
            "outV": "person\u0002Bonnie Hunt",
            "properties": {
                "roles": "Laurel Boyd"
            }
        },
        {
            "id": "person\u0002Werner Herzog\u0001ACTED_IN\u0001The Face\u0001movie\u0002What Dreams May Come",
            "label": "ACTED_IN",
            "type": "edge",
            "inVLabel": "movie",
            "outVLabel": "person",
            "inV": "movie\u0002What Dreams May Come",
            "outV": "person\u0002Werner Herzog",
            "properties": {
                "roles": "The Face"
            }
        },
        {
            "id": "person\u0002Jack Nicholson\u0001ACTED_IN\u0001hoffa\u0001movie\u0002hoffa",
            "label": "ACTED_IN",
            "type": "edge",
            "inVLabel": "movie",
            "outVLabel": "person",
            "inV": "movie\u0002hoffa",
            "outV": "person\u0002Jack Nicholson",
            "properties": {
                "roles": "hoffa"
            }
        },
        {
            "id": "person\u0002Joel Silver\u0001PRODUCED\u0001\u0001movie\u0002The Matrix Reloaded",
            "label": "PRODUCED",
            "type": "edge",
            "inVLabel": "movie",
            "outVLabel": "person",
            "inV": "movie\u0002The Matrix Reloaded",
            "outV": "person\u0002Joel Silver",
            "properties": {
                "score": 10
            }
        },
        {
            "id": "person\u0002Tom Hanks\u0001DIRECTED\u0001\u0001movie\u0002That Thing You Do",
            "label": "DIRECTED",
            "type": "edge",
            "inVLabel": "movie",
            "outVLabel": "person",
            "inV": "movie\u0002That Thing You Do",
            "outV": "person\u0002Tom Hanks",
            "properties": {
                "score": 10
            }
        },
        {
            "id": "person\u0002James Cromwell\u0001ACTED_IN\u0001Warden Hal Moores\u0001movie\u0002The Green Mile",
            "label": "ACTED_IN",
            "type": "edge",
            "inVLabel": "movie",
            "outVLabel": "person",
            "inV": "movie\u0002The Green Mile",
            "outV": "person\u0002James Cromwell",
            "properties": {
                "roles": "Warden Hal Moores"
            }
        },
        {
            "id": "person\u0002Oliver Platt\u0001ACTED_IN\u0001Bob Zelnick\u0001movie\u0002Frost/Nixon",
            "label": "ACTED_IN",
            "type": "edge",
            "inVLabel": "movie",
            "outVLabel": "person",
            "inV": "movie\u0002Frost/Nixon",
            "outV": "person\u0002Oliver Platt",
            "properties": {
                "roles": "Bob Zelnick"
            }
        },
        {
            "id": "person\u0002Tom Hanks\u0001ACTED_IN\u0001Chuck Noland\u0001movie\u0002Cast away",
            "label": "ACTED_IN",
            "type": "edge",
            "inVLabel": "movie",
            "outVLabel": "person",
            "inV": "movie\u0002Cast away",
            "outV": "person\u0002Tom Hanks",
            "properties": {
                "roles": "Chuck Noland"
            }
        },
        {
            "id": "person\u0002Joel Silver\u0001PRODUCED\u0001\u0001movie\u0002Speed Racer",
            "label": "PRODUCED",
            "type": "edge",
            "inVLabel": "movie",
            "outVLabel": "person",
            "inV": "movie\u0002Speed Racer",
            "outV": "person\u0002Joel Silver",
            "properties": {
                "score": 10
            }
        },
        {
            "id": "person\u0002Frank Langella\u0001ACTED_IN\u0001Richard Nixon\u0001movie\u0002Frost/Nixon",
            "label": "ACTED_IN",
            "type": "edge",
            "inVLabel": "movie",
            "outVLabel": "person",
            "inV": "movie\u0002Frost/Nixon",
            "outV": "person\u0002Frank Langella",
            "properties": {
                "roles": "Richard Nixon"
            }
        },
        {
            "id": "person\u0002hugo Weaving\u0001ACTED_IN\u0001agent Smith\u0001movie\u0002The Matrix Revolutions",
            "label": "ACTED_IN",
            "type": "edge",
            "inVLabel": "movie",
            "outVLabel": "person",
            "inV": "movie\u0002The Matrix Revolutions",
            "outV": "person\u0002hugo Weaving",
            "properties": {
                "roles": "agent Smith"
            }
        },
        {
            "id": "person\u0002Cuba Gooding Jr.\u0001ACTED_IN\u0001Cpl. Carl Hammaker\u0001movie\u0002a Few Good Men",
            "label": "ACTED_IN",
            "type": "edge",
            "inVLabel": "movie",
            "outVLabel": "person",
            "inV": "movie\u0002a Few Good Men",
            "outV": "person\u0002Cuba Gooding Jr.",
            "properties": {
                "roles": "Cpl. Carl Hammaker"
            }
        },
        {
            "id": "person\u0002Stephen Rea\u0001ACTED_IN\u0001Eric Finch\u0001movie\u0002The Da Vinci Code",
            "label": "ACTED_IN",
            "type": "edge",
            "inVLabel": "movie",
            "outVLabel": "person",
            "inV": "movie\u0002The Da Vinci Code",
            "outV": "person\u0002Stephen Rea",
            "properties": {
                "roles": "Eric Finch"
            }
        },
        {
            "id": "person\u0002howard Deutch\u0001DIRECTED\u0001\u0001movie\u0002The Replacements",
            "label": "DIRECTED",
            "type": "edge",
            "inVLabel": "movie",
            "outVLabel": "person",
            "inV": "movie\u0002The Replacements",
            "outV": "person\u0002howard Deutch",
            "properties": {
                "score": 10
            }
        },
        {
            "id": "person\u0002Greg Kinnear\u0001ACTED_IN\u0001Frank Navasky\u0001movie\u0002You've Got Mail",
            "label": "ACTED_IN",
            "type": "edge",
            "inVLabel": "movie",
            "outVLabel": "person",
            "inV": "movie\u0002You've Got Mail",
            "outV": "person\u0002Greg Kinnear",
            "properties": {
                "roles": "Frank Navasky"
            }
        },
        {
            "id": "person\u0002Sam Rockwell\u0001ACTED_IN\u0001James Reston, Jr.\u0001movie\u0002Frost/Nixon",
            "label": "ACTED_IN",
            "type": "edge",
            "inVLabel": "movie",
            "outVLabel": "person",
            "inV": "movie\u0002Frost/Nixon",
            "outV": "person\u0002Sam Rockwell",
            "properties": {
                "roles": "James Reston, Jr."
            }
        },
        {
            "id": "person\u0002keanu Reeves\u0001ACTED_IN\u0001Kevin Lomax\u0001movie\u0002The Devil's advocate",
            "label": "ACTED_IN",
            "type": "edge",
            "inVLabel": "movie",
            "outVLabel": "person",
            "inV": "movie\u0002The Devil's advocate",
            "outV": "person\u0002keanu Reeves",
            "properties": {
                "roles": "Kevin Lomax"
            }
        },
        {
            "id": "person\u0002Lilly Wachowski\u0001DIRECTED\u0001\u0001movie\u0002Speed Racer",
            "label": "DIRECTED",
            "type": "edge",
            "inVLabel": "movie",
            "outVLabel": "person",
            "inV": "movie\u0002Speed Racer",
            "outV": "person\u0002Lilly Wachowski",
            "properties": {
                "score": 10
            }
        },
        {
            "id": "person\u0002Max von Sydow\u0001ACTED_IN\u0001Nels Gudmundsson\u0001movie\u0002Snow Falling on Cedars",
            "label": "ACTED_IN",
            "type": "edge",
            "inVLabel": "movie",
            "outVLabel": "person",
            "inV": "movie\u0002Snow Falling on Cedars",
            "outV": "person\u0002Max von Sydow",
            "properties": {
                "roles": "Nels Gudmundsson"
            }
        },
        {
            "id": "person\u0002Susan Sarandon\u0001ACTED_IN\u0001Mom\u0001movie\u0002Speed Racer",
            "label": "ACTED_IN",
            "type": "edge",
            "inVLabel": "movie",
            "outVLabel": "person",
            "inV": "movie\u0002Speed Racer",
            "outV": "person\u0002Susan Sarandon",
            "properties": {
                "roles": "Mom"
            }
        },
        {
            "id": "person\u0002James Marshall\u0001DIRECTED\u0001\u0001movie\u0002The Da Vinci Code",
            "label": "DIRECTED",
            "type": "edge",
            "inVLabel": "movie",
            "outVLabel": "person",
            "inV": "movie\u0002The Da Vinci Code",
            "outV": "person\u0002James Marshall",
            "properties": {
                "score": 10
            }
        },
        {
            "id": "person\u0002Jack Nicholson\u0001ACTED_IN\u0001Col. nathan R. Jessup\u0001movie\u0002a Few Good Men",
            "label": "ACTED_IN",
            "type": "edge",
            "inVLabel": "movie",
            "outVLabel": "person",
            "inV": "movie\u0002a Few Good Men",
            "outV": "person\u0002Jack Nicholson",
            "properties": {
                "roles": "Col. nathan R. Jessup"
            }
        },
        {
            "id": "person\u0002Ron howard\u0001DIRECTED\u0001\u0001movie\u0002Frost/Nixon",
            "label": "DIRECTED",
            "type": "edge",
            "inVLabel": "movie",
            "outVLabel": "person",
            "inV": "movie\u0002Frost/Nixon",
            "outV": "person\u0002Ron howard",
            "properties": {
                "score": 10
            }
        },
        {
            "id": "person\u0002keanu Reeves\u0001ACTED_IN\u0001Johnny Mnemonic\u0001movie\u0002Johnny Mnemonic",
            "label": "ACTED_IN",
            "type": "edge",
            "inVLabel": "movie",
            "outVLabel": "person",
            "inV": "movie\u0002Johnny Mnemonic",
            "outV": "person\u0002keanu Reeves",
            "properties": {
                "roles": "Johnny Mnemonic"
            }
        },
        {
            "id": "person\u0002Penny Marshall\u0001DIRECTED\u0001\u0001movie\u0002a League of Their Own",
            "label": "DIRECTED",
            "type": "edge",
            "inVLabel": "movie",
            "outVLabel": "person",
            "inV": "movie\u0002a League of Their Own",
            "outV": "person\u0002Penny Marshall",
            "properties": {
                "score": 10
            }
        },
        {
            "id": "person\u0002madonna\u0001ACTED_IN\u0001all the Way' Mae Mordabito\u0001movie\u0002a League of Their Own",
            "label": "ACTED_IN",
            "type": "edge",
            "inVLabel": "movie",
            "outVLabel": "person",
            "inV": "movie\u0002a League of Their Own",
            "outV": "person\u0002madonna",
            "properties": {
                "roles": "all the Way' Mae Mordabito"
            }
        },
        {
            "id": "person\u0002Lana Wachowski\u0001WROTE\u0001\u0001movie\u0002The Da Vinci Code",
            "label": "WROTE",
            "type": "edge",
            "inVLabel": "movie",
            "outVLabel": "person",
            "inV": "movie\u0002The Da Vinci Code",
            "outV": "person\u0002Lana Wachowski",
            "properties": {
                "score": 10
            }
        },
        {
            "id": "person\u0002Tom Cruise\u0001ACTED_IN\u0001Lt. Daniel Kaffee\u0001movie\u0002a Few Good Men",
            "label": "ACTED_IN",
            "type": "edge",
            "inVLabel": "movie",
            "outVLabel": "person",
            "inV": "movie\u0002a Few Good Men",
            "outV": "person\u0002Tom Cruise",
            "properties": {
                "roles": "Lt. Daniel Kaffee"
            }
        },
        {
            "id": "person\u0002Tom Hanks\u0001ACTED_IN\u0001Rep. Charlie Wilson\u0001movie\u0002Charlie Wilson's War",
            "label": "ACTED_IN",
            "type": "edge",
            "inVLabel": "movie",
            "outVLabel": "person",
            "inV": "movie\u0002Charlie Wilson's War",
            "outV": "person\u0002Tom Hanks",
            "properties": {
                "roles": "Rep. Charlie Wilson"
            }
        },
        {
            "id": "person\u0002al Pacino\u0001ACTED_IN\u0001John Milton\u0001movie\u0002The Devil's advocate",
            "label": "ACTED_IN",
            "type": "edge",
            "inVLabel": "movie",
            "outVLabel": "person",
            "inV": "movie\u0002The Devil's advocate",
            "outV": "person\u0002al Pacino",
            "properties": {
                "roles": "John Milton"
            }
        },
        {
            "id": "person\u0002John Goodman\u0001ACTED_IN\u0001Pops\u0001movie\u0002Speed Racer",
            "label": "ACTED_IN",
            "type": "edge",
            "inVLabel": "movie",
            "outVLabel": "person",
            "inV": "movie\u0002Speed Racer",
            "outV": "person\u0002John Goodman",
            "properties": {
                "roles": "Pops"
            }
        },
        {
            "id": "person\u0002Cuba Gooding Jr.\u0001ACTED_IN\u0001Rod Tidwell\u0001movie\u0002Jerry Maguire",
            "label": "ACTED_IN",
            "type": "edge",
            "inVLabel": "movie",
            "outVLabel": "person",
            "inV": "movie\u0002Jerry Maguire",
            "outV": "person\u0002Cuba Gooding Jr.",
            "properties": {
                "roles": "Rod Tidwell"
            }
        },
        {
            "id": "person\u0002Tom Cruise\u0001ACTED_IN\u0001Maverick\u0001movie\u0002Top Gun",
            "label": "ACTED_IN",
            "type": "edge",
            "inVLabel": "movie",
            "outVLabel": "person",
            "inV": "movie\u0002Top Gun",
            "outV": "person\u0002Tom Cruise",
            "properties": {
                "roles": "Maverick"
            }
        },
        {
            "id": "person\u0002Nora Ephron\u0001DIRECTED\u0001\u0001movie\u0002You've Got Mail",
            "label": "DIRECTED",
            "type": "edge",
            "inVLabel": "movie",
            "outVLabel": "person",
            "inV": "movie\u0002You've Got Mail",
            "outV": "person\u0002Nora Ephron",
            "properties": {
                "score": 10
            }
        },
        {
            "id": "person\u0002Geena Davis\u0001ACTED_IN\u0001Dottie Hinson\u0001movie\u0002a League of Their Own",
            "label": "ACTED_IN",
            "type": "edge",
            "inVLabel": "movie",
            "outVLabel": "person",
            "inV": "movie\u0002a League of Their Own",
            "outV": "person\u0002Geena Davis",
            "properties": {
                "roles": "Dottie Hinson"
            }
        },
        {
            "id": "person\u0002Matthew Fox\u0001ACTED_IN\u0001Racer X\u0001movie\u0002Speed Racer",
            "label": "ACTED_IN",
            "type": "edge",
            "inVLabel": "movie",
            "outVLabel": "person",
            "inV": "movie\u0002Speed Racer",
            "outV": "person\u0002Matthew Fox",
            "properties": {
                "roles": "Racer X"
            }
        },
        {
            "id": "person\u0002Corey Feldman\u0001ACTED_IN\u0001Teddy Duchamp\u0001movie\u0002Stand By Me",
            "label": "ACTED_IN",
            "type": "edge",
            "inVLabel": "movie",
            "outVLabel": "person",
            "inV": "movie\u0002Stand By Me",
            "outV": "person\u0002Corey Feldman",
            "properties": {
                "roles": "Teddy Duchamp"
            }
        },
        {
            "id": "person\u0002Helen Hunt\u0001ACTED_IN\u0001Kelly Frears\u0001movie\u0002Cast away",
            "label": "ACTED_IN",
            "type": "edge",
            "inVLabel": "movie",
            "outVLabel": "person",
            "inV": "movie\u0002Cast away",
            "outV": "person\u0002Helen Hunt",
            "properties": {
                "roles": "Kelly Frears"
            }
        },
        {
            "id": "person\u0002Ethan Hawke\u0001ACTED_IN\u0001Ishmael Chambers\u0001movie\u0002Snow Falling on Cedars",
            "label": "ACTED_IN",
            "type": "edge",
            "inVLabel": "movie",
            "outVLabel": "person",
            "inV": "movie\u0002Snow Falling on Cedars",
            "outV": "person\u0002Ethan Hawke",
            "properties": {
                "roles": "Ishmael Chambers"
            }
        },
        {
            "id": "person\u0002audrey Tautou\u0001ACTED_IN\u0001Sophie Neveu\u0001movie\u0002The Da Vinci Code",
            "label": "ACTED_IN",
            "type": "edge",
            "inVLabel": "movie",
            "outVLabel": "person",
            "inV": "movie\u0002The Da Vinci Code",
            "outV": "person\u0002audrey Tautou",
            "properties": {
                "roles": "Sophie Neveu"
            }
        },
        {
            "id": "person\u0002charlize Theron\u0001ACTED_IN\u0001Mary ann Lomax\u0001movie\u0002The Devil's advocate",
            "label": "ACTED_IN",
            "type": "edge",
            "inVLabel": "movie",
            "outVLabel": "person",
            "inV": "movie\u0002The Devil's advocate",
            "outV": "person\u0002charlize Theron",
            "properties": {
                "roles": "Mary ann Lomax"
            }
        },
        {
            "id": "person\u0002Jack Nicholson\u0001ACTED_IN\u0001Harry Sanborn\u0001movie\u0002Something's Gotta Give",
            "label": "ACTED_IN",
            "type": "edge",
            "inVLabel": "movie",
            "outVLabel": "person",
            "inV": "movie\u0002Something's Gotta Give",
            "outV": "person\u0002Jack Nicholson",
            "properties": {
                "roles": "Harry Sanborn"
            }
        },
        {
            "id": "person\u0002Halle Berry\u0001ACTED_IN\u0001Luisa Rey, Jocasta ayrs, Ovid, Meronym\u0001movie\u0002Cloud atlas",
            "label": "ACTED_IN",
            "type": "edge",
            "inVLabel": "movie",
            "outVLabel": "person",
            "inV": "movie\u0002Cloud atlas",
            "outV": "person\u0002Halle Berry",
            "properties": {
                "roles": "Luisa Rey, Jocasta ayrs, Ovid, Meronym"
            }
        },
        {
            "id": "person\u0002Kiefer Sutherland\u0001ACTED_IN\u0001ace Merrill\u0001movie\u0002Stand By Me",
            "label": "ACTED_IN",
            "type": "edge",
            "inVLabel": "movie",
            "outVLabel": "person",
            "inV": "movie\u0002Stand By Me",
            "outV": "person\u0002Kiefer Sutherland",
            "properties": {
                "roles": "ace Merrill"
            }
        },
        {
            "id": "person\u0002brooke Langton\u0001ACTED_IN\u0001annabelle Farrell\u0001movie\u0002The Replacements",
            "label": "ACTED_IN",
            "type": "edge",
            "inVLabel": "movie",
            "outVLabel": "person",
            "inV": "movie\u0002The Replacements",
            "outV": "person\u0002brooke Langton",
            "properties": {
                "roles": "annabelle Farrell"
            }
        },
        {
            "id": "person\u0002Kevin Pollak\u0001ACTED_IN\u0001Lt. Sam Weinberg\u0001movie\u0002a Few Good Men",
            "label": "ACTED_IN",
            "type": "edge",
            "inVLabel": "movie",
            "outVLabel": "person",
            "inV": "movie\u0002a Few Good Men",
            "outV": "person\u0002Kevin Pollak",
            "properties": {
                "roles": "Lt. Sam Weinberg"
            }
        },
        {
            "id": "person\u0002Rita Wilson\u0001ACTED_IN\u0001Suzy\u0001movie\u0002Sleepless in Seattle",
            "label": "ACTED_IN",
            "type": "edge",
            "inVLabel": "movie",
            "outVLabel": "person",
            "inV": "movie\u0002Sleepless in Seattle",
            "outV": "person\u0002Rita Wilson",
            "properties": {
                "roles": "Suzy"
            }
        },
        {
            "id": "person\u0002Victor Garber\u0001ACTED_IN\u0001Greg\u0001movie\u0002Sleepless in Seattle",
            "label": "ACTED_IN",
            "type": "edge",
            "inVLabel": "movie",
            "outVLabel": "person",
            "inV": "movie\u0002Sleepless in Seattle",
            "outV": "person\u0002Victor Garber",
            "properties": {
                "roles": "Greg"
            }
        },
        {
            "id": "person\u0002keanu Reeves\u0001ACTED_IN\u0001Neo\u0001movie\u0002The Matrix Reloaded",
            "label": "ACTED_IN",
            "type": "edge",
            "inVLabel": "movie",
            "outVLabel": "person",
            "inV": "movie\u0002The Matrix Reloaded",
            "outV": "person\u0002keanu Reeves",
            "properties": {
                "roles": "Neo"
            }
        },
        {
            "id": "person\u0002Steve Zahn\u0001ACTED_IN\u0001George Pappas\u0001movie\u0002You've Got Mail",
            "label": "ACTED_IN",
            "type": "edge",
            "inVLabel": "movie",
            "outVLabel": "person",
            "inV": "movie\u0002You've Got Mail",
            "outV": "person\u0002Steve Zahn",
            "properties": {
                "roles": "George Pappas"
            }
        },
        {
            "id": "person\u0002robin Williams\u0001ACTED_IN\u0001andrew Marin\u0001movie\u0002Bicentennial Man",
            "label": "ACTED_IN",
            "type": "edge",
            "inVLabel": "movie",
            "outVLabel": "person",
            "inV": "movie\u0002Bicentennial Man",
            "outV": "person\u0002robin Williams",
            "properties": {
                "roles": "andrew Marin"
            }
        },
        {
            "id": "person\u0002Jim Cash\u0001WROTE\u0001\u0001movie\u0002Top Gun",
            "label": "WROTE",
            "type": "edge",
            "inVLabel": "movie",
            "outVLabel": "person",
            "inV": "movie\u0002Top Gun",
            "outV": "person\u0002Jim Cash",
            "properties": {
                "score": 10
            }
        },
        {
            "id": "person\u0002Tom Hanks\u0001ACTED_IN\u0001Paul Edgecomb\u0001movie\u0002The Green Mile",
            "label": "ACTED_IN",
            "type": "edge",
            "inVLabel": "movie",
            "outVLabel": "person",
            "inV": "movie\u0002The Green Mile",
            "outV": "person\u0002Tom Hanks",
            "properties": {
                "roles": "Paul Edgecomb"
            }
        },
        {
            "id": "person\u0002hugo Weaving\u0001ACTED_IN\u0001agent Smith\u0001movie\u0002The Matrix",
            "label": "ACTED_IN",
            "type": "edge",
            "inVLabel": "movie",
            "outVLabel": "person",
            "inV": "movie\u0002The Matrix",
            "outV": "person\u0002hugo Weaving",
            "properties": {
                "roles": "agent Smith"
            }
        },
        {
            "id": "person\u0002Christian Bale\u0001ACTED_IN\u0001Dieter Dengler\u0001movie\u0002rescueDawn",
            "label": "ACTED_IN",
            "type": "edge",
            "inVLabel": "movie",
            "outVLabel": "person",
            "inV": "movie\u0002rescueDawn",
            "outV": "person\u0002Christian Bale",
            "properties": {
                "roles": "Dieter Dengler"
            }
        },
        {
            "id": "person\u0002charlize Theron\u0001ACTED_IN\u0001Tina\u0001movie\u0002That Thing You Do",
            "label": "ACTED_IN",
            "type": "edge",
            "inVLabel": "movie",
            "outVLabel": "person",
            "inV": "movie\u0002That Thing You Do",
            "outV": "person\u0002charlize Theron",
            "properties": {
                "roles": "Tina"
            }
        },
        {
            "id": "person\u0002Mike Nichols\u0001DIRECTED\u0001\u0001movie\u0002The Birdcage",
            "label": "DIRECTED",
            "type": "edge",
            "inVLabel": "movie",
            "outVLabel": "person",
            "inV": "movie\u0002The Birdcage",
            "outV": "person\u0002Mike Nichols",
            "properties": {
                "score": 10
            }
        },
        {
            "id": "person\u0002Frank Darabont\u0001DIRECTED\u0001\u0001movie\u0002The Green Mile",
            "label": "DIRECTED",
            "type": "edge",
            "inVLabel": "movie",
            "outVLabel": "person",
            "inV": "movie\u0002The Green Mile",
            "outV": "person\u0002Frank Darabont",
            "properties": {
                "score": 10
            }
        },
        {
            "id": "person\u0002J.T. Walsh\u0001ACTED_IN\u0001Frank Fitzsimmons\u0001movie\u0002hoffa",
            "label": "ACTED_IN",
            "type": "edge",
            "inVLabel": "movie",
            "outVLabel": "person",
            "inV": "movie\u0002hoffa",
            "outV": "person\u0002J.T. Walsh",
            "properties": {
                "roles": "Frank Fitzsimmons"
            }
        },
        {
            "id": "person\u0002Tom Cruise\u0001ACTED_IN\u0001Jerry Maguire\u0001movie\u0002Jerry Maguire",
            "label": "ACTED_IN",
            "type": "edge",
            "inVLabel": "movie",
            "outVLabel": "person",
            "inV": "movie\u0002Jerry Maguire",
            "outV": "person\u0002Tom Cruise",
            "properties": {
                "roles": "Jerry Maguire"
            }
        },
        {
            "id": "person\u0002Christina Ricci\u0001ACTED_IN\u0001Trixie\u0001movie\u0002Speed Racer",
            "label": "ACTED_IN",
            "type": "edge",
            "inVLabel": "movie",
            "outVLabel": "person",
            "inV": "movie\u0002Speed Racer",
            "outV": "person\u0002Christina Ricci",
            "properties": {
                "roles": "Trixie"
            }
        },
        {
            "id": "person\u0002carrie-anne Moss\u0001ACTED_IN\u0001Trinity\u0001movie\u0002The Matrix",
            "label": "ACTED_IN",
            "type": "edge",
            "inVLabel": "movie",
            "outVLabel": "person",
            "inV": "movie\u0002The Matrix",
            "outV": "person\u0002carrie-anne Moss",
            "properties": {
                "roles": "Trinity"
            }
        },
        {
            "id": "person\u0002Christopher Guest\u0001ACTED_IN\u0001Dr. Stone\u0001movie\u0002a Few Good Men",
            "label": "ACTED_IN",
            "type": "edge",
            "inVLabel": "movie",
            "outVLabel": "person",
            "inV": "movie\u0002a Few Good Men",
            "outV": "person\u0002Christopher Guest",
            "properties": {
                "roles": "Dr. Stone"
            }
        },
        {
            "id": "person\u0002James L. Brooks\u0001DIRECTED\u0001\u0001movie\u0002as Good as It Gets",
            "label": "DIRECTED",
            "type": "edge",
            "inVLabel": "movie",
            "outVLabel": "person",
            "inV": "movie\u0002as Good as It Gets",
            "outV": "person\u0002James L. Brooks",
            "properties": {
                "score": 10
            }
        },
        {
            "id": "person\u0002laurence Fishburne\u0001ACTED_IN\u0001Morpheus\u0001movie\u0002The Matrix Revolutions",
            "label": "ACTED_IN",
            "type": "edge",
            "inVLabel": "movie",
            "outVLabel": "person",
            "inV": "movie\u0002The Matrix Revolutions",
            "outV": "person\u0002laurence Fishburne",
            "properties": {
                "roles": "Morpheus"
            }
        },
        {
            "id": "person\u0002Nora Ephron\u0001WROTE\u0001\u0001movie\u0002When Harry Met Sally",
            "label": "WROTE",
            "type": "edge",
            "inVLabel": "movie",
            "outVLabel": "person",
            "inV": "movie\u0002When Harry Met Sally",
            "outV": "person\u0002Nora Ephron",
            "properties": {
                "score": 10
            }
        },
        {
            "id": "person\u0002Noah Wyle\u0001ACTED_IN\u0001Cpl. Jeffrey Barnes\u0001movie\u0002a Few Good Men",
            "label": "ACTED_IN",
            "type": "edge",
            "inVLabel": "movie",
            "outVLabel": "person",
            "inV": "movie\u0002a Few Good Men",
            "outV": "person\u0002Noah Wyle",
            "properties": {
                "roles": "Cpl. Jeffrey Barnes"
            }
        },
        {
            "id": "person\u0002hugo Weaving\u0001ACTED_IN\u0001agent Smith\u0001movie\u0002The Matrix Reloaded",
            "label": "ACTED_IN",
            "type": "edge",
            "inVLabel": "movie",
            "outVLabel": "person",
            "inV": "movie\u0002The Matrix Reloaded",
            "outV": "person\u0002hugo Weaving",
            "properties": {
                "roles": "agent Smith"
            }
        },
        {
            "id": "person\u0002Tom Skerritt\u0001ACTED_IN\u0001Viper\u0001movie\u0002Top Gun",
            "label": "ACTED_IN",
            "type": "edge",
            "inVLabel": "movie",
            "outVLabel": "person",
            "inV": "movie\u0002Top Gun",
            "outV": "person\u0002Tom Skerritt",
            "properties": {
                "roles": "Viper"
            }
        },
        {
            "id": "person\u0002Tom Hanks\u0001ACTED_IN\u0001Hero Boy\u0001movie\u0002The Polar Express",
            "label": "ACTED_IN",
            "type": "edge",
            "inVLabel": "movie",
            "outVLabel": "person",
            "inV": "movie\u0002The Polar Express",
            "outV": "person\u0002Tom Hanks",
            "properties": {
                "roles": "Hero Boy"
            }
        },
        {
            "id": "person\u0002laurence Fishburne\u0001ACTED_IN\u0001Morpheus\u0001movie\u0002The Matrix Reloaded",
            "label": "ACTED_IN",
            "type": "edge",
            "inVLabel": "movie",
            "outVLabel": "person",
            "inV": "movie\u0002The Matrix Reloaded",
            "outV": "person\u0002laurence Fishburne",
            "properties": {
                "roles": "Morpheus"
            }
        },
        {
            "id": "person\u0002Julia Roberts\u0001ACTED_IN\u0001Joanne Herring\u0001movie\u0002Charlie Wilson's War",
            "label": "ACTED_IN",
            "type": "edge",
            "inVLabel": "movie",
            "outVLabel": "person",
            "inV": "movie\u0002Charlie Wilson's War",
            "outV": "person\u0002Julia Roberts",
            "properties": {
                "roles": "Joanne Herring"
            }
        },
        {
            "id": "person\u0002Oliver Platt\u0001ACTED_IN\u0001Rupert Burns\u0001movie\u0002Bicentennial Man",
            "label": "ACTED_IN",
            "type": "edge",
            "inVLabel": "movie",
            "outVLabel": "person",
            "inV": "movie\u0002Bicentennial Man",
            "outV": "person\u0002Oliver Platt",
            "properties": {
                "roles": "Rupert Burns"
            }
        },
        {
            "id": "person\u0002Natalie Portman\u0001ACTED_IN\u0001Evey Hammond\u0001movie\u0002The Da Vinci Code",
            "label": "ACTED_IN",
            "type": "edge",
            "inVLabel": "movie",
            "outVLabel": "person",
            "inV": "movie\u0002The Da Vinci Code",
            "outV": "person\u0002Natalie Portman",
            "properties": {
                "roles": "Evey Hammond"
            }
        },
        {
            "id": "person\u0002Cameron Crowe\u0001PRODUCED\u0001\u0001movie\u0002Jerry Maguire",
            "label": "PRODUCED",
            "type": "edge",
            "inVLabel": "movie",
            "outVLabel": "person",
            "inV": "movie\u0002Jerry Maguire",
            "outV": "person\u0002Cameron Crowe",
            "properties": {
                "score": 10
            }
        },
        {
            "id": "person\u0002Joel Silver\u0001PRODUCED\u0001\u0001movie\u0002The Matrix",
            "label": "PRODUCED",
            "type": "edge",
            "inVLabel": "movie",
            "outVLabel": "person",
            "inV": "movie\u0002The Matrix",
            "outV": "person\u0002Joel Silver",
            "properties": {
                "score": 10
            }
        },
        {
            "id": "person\u0002Bill Paxton\u0001ACTED_IN\u0001Bill Harding\u0001movie\u0002twister",
            "label": "ACTED_IN",
            "type": "edge",
            "inVLabel": "movie",
            "outVLabel": "person",
            "inV": "movie\u0002twister",
            "outV": "person\u0002Bill Paxton",
            "properties": {
                "roles": "Bill Harding"
            }
        },
        {
            "id": "person\u0002carrie-anne Moss\u0001ACTED_IN\u0001Trinity\u0001movie\u0002The Matrix Revolutions",
            "label": "ACTED_IN",
            "type": "edge",
            "inVLabel": "movie",
            "outVLabel": "person",
            "inV": "movie\u0002The Matrix Revolutions",
            "outV": "person\u0002carrie-anne Moss",
            "properties": {
                "roles": "Trinity"
            }
        },
        {
            "id": "person\u0002Chris Columbus\u0001DIRECTED\u0001\u0001movie\u0002Bicentennial Man",
            "label": "DIRECTED",
            "type": "edge",
            "inVLabel": "movie",
            "outVLabel": "person",
            "inV": "movie\u0002Bicentennial Man",
            "outV": "person\u0002Chris Columbus",
            "properties": {
                "score": 10
            }
        },
        {
            "id": "person\u0002Bonnie Hunt\u0001ACTED_IN\u0001Jan Edgecomb\u0001movie\u0002The Green Mile",
            "label": "ACTED_IN",
            "type": "edge",
            "inVLabel": "movie",
            "outVLabel": "person",
            "inV": "movie\u0002The Green Mile",
            "outV": "person\u0002Bonnie Hunt",
            "properties": {
                "roles": "Jan Edgecomb"
            }
        },
        {
            "id": "person\u0002Nora Ephron\u0001PRODUCED\u0001\u0001movie\u0002When Harry Met Sally",
            "label": "PRODUCED",
            "type": "edge",
            "inVLabel": "movie",
            "outVLabel": "person",
            "inV": "movie\u0002When Harry Met Sally",
            "outV": "person\u0002Nora Ephron",
            "properties": {
                "score": 10
            }
        },
        {
            "id": "person\u0002Ian McKellen\u0001ACTED_IN\u0001Sir Leight Teabing\u0001movie\u0002The Da Vinci Code",
            "label": "ACTED_IN",
            "type": "edge",
            "inVLabel": "movie",
            "outVLabel": "person",
            "inV": "movie\u0002The Da Vinci Code",
            "outV": "person\u0002Ian McKellen",
            "properties": {
                "roles": "Sir Leight Teabing"
            }
        },
        {
            "id": "person\u0002Philip Seymour Hoffman\u0001ACTED_IN\u0001Dustin 'Dusty' Davis\u0001movie\u0002twister",
            "label": "ACTED_IN",
            "type": "edge",
            "inVLabel": "movie",
            "outVLabel": "person",
            "inV": "movie\u0002twister",
            "outV": "person\u0002Philip Seymour Hoffman",
            "properties": {
                "roles": "Dustin 'Dusty' Davis"
            }
        },
        {
            "id": "person\u0002dina Meyer\u0001ACTED_IN\u0001Jane\u0001movie\u0002Johnny Mnemonic",
            "label": "ACTED_IN",
            "type": "edge",
            "inVLabel": "movie",
            "outVLabel": "person",
            "inV": "movie\u0002Johnny Mnemonic",
            "outV": "person\u0002dina Meyer",
            "properties": {
                "roles": "Jane"
            }
        },
        {
            "id": "person\u0002Marshall Bell\u0001ACTED_IN\u0001Mr. Lachance\u0001movie\u0002Stand By Me",
            "label": "ACTED_IN",
            "type": "edge",
            "inVLabel": "movie",
            "outVLabel": "person",
            "inV": "movie\u0002Stand By Me",
            "outV": "person\u0002Marshall Bell",
            "properties": {
                "roles": "Mr. Lachance"
            }
        },
        {
            "id": "person\u0002Ed Harris\u0001ACTED_IN\u0001gene Kranz\u0001movie\u0002apollo 13",
            "label": "ACTED_IN",
            "type": "edge",
            "inVLabel": "movie",
            "outVLabel": "person",
            "inV": "movie\u0002apollo 13",
            "outV": "person\u0002Ed Harris",
            "properties": {
                "roles": "gene Kranz"
            }
        },
        {
            "id": "person\u0002gene Hackman\u0001ACTED_IN\u0001Little Bill Daggett\u0001movie\u0002unforgiven",
            "label": "ACTED_IN",
            "type": "edge",
            "inVLabel": "movie",
            "outVLabel": "person",
            "inV": "movie\u0002unforgiven",
            "outV": "person\u0002gene Hackman",
            "properties": {
                "roles": "Little Bill Daggett"
            }
        },
        {
            "id": "person\u0002Lilly Wachowski\u0001DIRECTED\u0001\u0001movie\u0002Cloud atlas",
            "label": "DIRECTED",
            "type": "edge",
            "inVLabel": "movie",
            "outVLabel": "person",
            "inV": "movie\u0002Cloud atlas",
            "outV": "person\u0002Lilly Wachowski",
            "properties": {
                "score": 10
            }
        },
        {
            "id": "person\u0002Stefan arndt\u0001PRODUCED\u0001\u0001movie\u0002Cloud atlas",
            "label": "PRODUCED",
            "type": "edge",
            "inVLabel": "movie",
            "outVLabel": "person",
            "inV": "movie\u0002Cloud atlas",
            "outV": "person\u0002Stefan arndt",
            "properties": {
                "score": 10
            }
        },
        {
            "id": "person\u0002taylor Hackford\u0001DIRECTED\u0001\u0001movie\u0002The Devil's advocate",
            "label": "DIRECTED",
            "type": "edge",
            "inVLabel": "movie",
            "outVLabel": "person",
            "inV": "movie\u0002The Devil's advocate",
            "outV": "person\u0002taylor Hackford",
            "properties": {
                "score": 10
            }
        },
        {
            "id": "person\u0002Regina King\u0001ACTED_IN\u0001Marcee Tidwell\u0001movie\u0002Jerry Maguire",
            "label": "ACTED_IN",
            "type": "edge",
            "inVLabel": "movie",
            "outVLabel": "person",
            "inV": "movie\u0002Jerry Maguire",
            "outV": "person\u0002Regina King",
            "properties": {
                "roles": "Marcee Tidwell"
            }
        },
        {
            "id": "person\u0002Cuba Gooding Jr.\u0001ACTED_IN\u0001albert Lewis\u0001movie\u0002What Dreams May Come",
            "label": "ACTED_IN",
            "type": "edge",
            "inVLabel": "movie",
            "outVLabel": "person",
            "inV": "movie\u0002What Dreams May Come",
            "outV": "person\u0002Cuba Gooding Jr.",
            "properties": {
                "roles": "albert Lewis"
            }
        },
        {
            "id": "person\u0002Lana Wachowski\u0001DIRECTED\u0001\u0001movie\u0002The Matrix",
            "label": "DIRECTED",
            "type": "edge",
            "inVLabel": "movie",
            "outVLabel": "person",
            "inV": "movie\u0002The Matrix",
            "outV": "person\u0002Lana Wachowski",
            "properties": {
                "score": 10
            }
        },
        {
            "id": "person\u0002John Patrick Stanley\u0001DIRECTED\u0001\u0001movie\u0002Joe Versus the Volcano",
            "label": "DIRECTED",
            "type": "edge",
            "inVLabel": "movie",
            "outVLabel": "person",
            "inV": "movie\u0002Joe Versus the Volcano",
            "outV": "person\u0002John Patrick Stanley",
            "properties": {
                "score": 10
            }
        },
        {
            "id": "person\u0002Greg Kinnear\u0001ACTED_IN\u0001Simon Bishop\u0001movie\u0002as Good as It Gets",
            "label": "ACTED_IN",
            "type": "edge",
            "inVLabel": "movie",
            "outVLabel": "person",
            "inV": "movie\u0002as Good as It Gets",
            "outV": "person\u0002Greg Kinnear",
            "properties": {
                "roles": "Simon Bishop"
            }
        },
        {
            "id": "person\u0002Helen Hunt\u0001ACTED_IN\u0001Carol Connelly\u0001movie\u0002as Good as It Gets",
            "label": "ACTED_IN",
            "type": "edge",
            "inVLabel": "movie",
            "outVLabel": "person",
            "inV": "movie\u0002as Good as It Gets",
            "outV": "person\u0002Helen Hunt",
            "properties": {
                "roles": "Carol Connelly"
            }
        },
        {
            "id": "person\u0002Ben Miles\u0001ACTED_IN\u0001Kass Jones\u0001movie\u0002Speed Racer",
            "label": "ACTED_IN",
            "type": "edge",
            "inVLabel": "movie",
            "outVLabel": "person",
            "inV": "movie\u0002Speed Racer",
            "outV": "person\u0002Ben Miles",
            "properties": {
                "roles": "Kass Jones"
            }
        },
        {
            "id": "person\u0002Tony Scott\u0001DIRECTED\u0001\u0001movie\u0002Top Gun",
            "label": "DIRECTED",
            "type": "edge",
            "inVLabel": "movie",
            "outVLabel": "person",
            "inV": "movie\u0002Top Gun",
            "outV": "person\u0002Tony Scott",
            "properties": {
                "score": 10
            }
        },
        {
            "id": "person\u0002Jim Broadbent\u0001ACTED_IN\u0001Vyvyan ayrs, Captain Molyneux, Timothy Cavendish\u0001movie\u0002Cloud atlas",
            "label": "ACTED_IN",
            "type": "edge",
            "inVLabel": "movie",
            "outVLabel": "person",
            "inV": "movie\u0002Cloud atlas",
            "outV": "person\u0002Jim Broadbent",
            "properties": {
                "roles": "Vyvyan ayrs, Captain Molyneux, Timothy Cavendish"
            }
        },
        {
            "id": "person\u0002Lilly Wachowski\u0001PRODUCED\u0001\u0001movie\u0002Speed Racer",
            "label": "PRODUCED",
            "type": "edge",
            "inVLabel": "movie",
            "outVLabel": "person",
            "inV": "movie\u0002Speed Racer",
            "outV": "person\u0002Lilly Wachowski",
            "properties": {
                "score": 10
            }
        },
        {
            "id": "person\u0002annabella Sciorra\u0001ACTED_IN\u0001annie Collins-Nielsen\u0001movie\u0002What Dreams May Come",
            "label": "ACTED_IN",
            "type": "edge",
            "inVLabel": "movie",
            "outVLabel": "person",
            "inV": "movie\u0002What Dreams May Come",
            "outV": "person\u0002annabella Sciorra",
            "properties": {
                "roles": "annie Collins-Nielsen"
            }
        },
        {
            "id": "person\u0002keanu Reeves\u0001ACTED_IN\u0001Julian Mercer\u0001movie\u0002Something's Gotta Give",
            "label": "ACTED_IN",
            "type": "edge",
            "inVLabel": "movie",
            "outVLabel": "person",
            "inV": "movie\u0002Something's Gotta Give",
            "outV": "person\u0002keanu Reeves",
            "properties": {
                "roles": "Julian Mercer"
            }
        },
        {
            "id": "person\u0002hugo Weaving\u0001ACTED_IN\u0001V\u0001movie\u0002The Da Vinci Code",
            "label": "ACTED_IN",
            "type": "edge",
            "inVLabel": "movie",
            "outVLabel": "person",
            "inV": "movie\u0002The Da Vinci Code",
            "outV": "person\u0002hugo Weaving",
            "properties": {
                "roles": "V"
            }
        },
        {
            "id": "person\u0002Robert Zemeckis\u0001DIRECTED\u0001\u0001movie\u0002The Polar Express",
            "label": "DIRECTED",
            "type": "edge",
            "inVLabel": "movie",
            "outVLabel": "person",
            "inV": "movie\u0002The Polar Express",
            "outV": "person\u0002Robert Zemeckis",
            "properties": {
                "score": 10
            }
        },
        {
            "id": "person\u0002Cameron Crowe\u0001WROTE\u0001\u0001movie\u0002Jerry Maguire",
            "label": "WROTE",
            "type": "edge",
            "inVLabel": "movie",
            "outVLabel": "person",
            "inV": "movie\u0002Jerry Maguire",
            "outV": "person\u0002Cameron Crowe",
            "properties": {
                "score": 10
            }
        },
        {
            "id": "person\u0002Kiefer Sutherland\u0001ACTED_IN\u0001Lt. Jonathan Kendrick\u0001movie\u0002a Few Good Men",
            "label": "ACTED_IN",
            "type": "edge",
            "inVLabel": "movie",
            "outVLabel": "person",
            "inV": "movie\u0002a Few Good Men",
            "outV": "person\u0002Kiefer Sutherland",
            "properties": {
                "roles": "Lt. Jonathan Kendrick"
            }
        },
        {
            "id": "person\u0002Philip Seymour Hoffman\u0001ACTED_IN\u0001Gust avrakotos\u0001movie\u0002Charlie Wilson's War",
            "label": "ACTED_IN",
            "type": "edge",
            "inVLabel": "movie",
            "outVLabel": "person",
            "inV": "movie\u0002Charlie Wilson's War",
            "outV": "person\u0002Philip Seymour Hoffman",
            "properties": {
                "roles": "Gust avrakotos"
            }
        },
        {
            "id": "person\u0002Rosie O'Donnell\u0001ACTED_IN\u0001Doris Murphy\u0001movie\u0002a League of Their Own",
            "label": "ACTED_IN",
            "type": "edge",
            "inVLabel": "movie",
            "outVLabel": "person",
            "inV": "movie\u0002a League of Their Own",
            "outV": "person\u0002Rosie O'Donnell",
            "properties": {
                "roles": "Doris Murphy"
            }
        },
        {
            "id": "person\u0002Richard Harris\u0001ACTED_IN\u0001English Bob\u0001movie\u0002unforgiven",
            "label": "ACTED_IN",
            "type": "edge",
            "inVLabel": "movie",
            "outVLabel": "person",
            "inV": "movie\u0002unforgiven",
            "outV": "person\u0002Richard Harris",
            "properties": {
                "roles": "English Bob"
            }
        },
        {
            "id": "person\u0002Gary Sinise\u0001ACTED_IN\u0001Ken Mattingly\u0001movie\u0002apollo 13",
            "label": "ACTED_IN",
            "type": "edge",
            "inVLabel": "movie",
            "outVLabel": "person",
            "inV": "movie\u0002apollo 13",
            "outV": "person\u0002Gary Sinise",
            "properties": {
                "roles": "Ken Mattingly"
            }
        },
        {
            "id": "person\u0002Rob Reiner\u0001DIRECTED\u0001\u0001movie\u0002a Few Good Men",
            "label": "DIRECTED",
            "type": "edge",
            "inVLabel": "movie",
            "outVLabel": "person",
            "inV": "movie\u0002a Few Good Men",
            "outV": "person\u0002Rob Reiner",
            "properties": {
                "score": 10
            }
        },
        {
            "id": "person\u0002Demi Moore\u0001ACTED_IN\u0001Lt. Cdr. Joanne Galloway\u0001movie\u0002a Few Good Men",
            "label": "ACTED_IN",
            "type": "edge",
            "inVLabel": "movie",
            "outVLabel": "person",
            "inV": "movie\u0002a Few Good Men",
            "outV": "person\u0002Demi Moore",
            "properties": {
                "roles": "Lt. Cdr. Joanne Galloway"
            }
        },
        {
            "id": "person\u0002Val Kilmer\u0001ACTED_IN\u0001Iceman\u0001movie\u0002Top Gun",
            "label": "ACTED_IN",
            "type": "edge",
            "inVLabel": "movie",
            "outVLabel": "person",
            "inV": "movie\u0002Top Gun",
            "outV": "person\u0002Val Kilmer",
            "properties": {
                "roles": "Iceman"
            }
        },
        {
            "id": "person\u0002Cameron Crowe\u0001DIRECTED\u0001\u0001movie\u0002Jerry Maguire",
            "label": "DIRECTED",
            "type": "edge",
            "inVLabel": "movie",
            "outVLabel": "person",
            "inV": "movie\u0002Jerry Maguire",
            "outV": "person\u0002Cameron Crowe",
            "properties": {
                "score": 10
            }
        },
        {
            "id": "person\u0002Ron howard\u0001DIRECTED\u0001\u0001movie\u0002apollo 13",
            "label": "DIRECTED",
            "type": "edge",
            "inVLabel": "movie",
            "outVLabel": "person",
            "inV": "movie\u0002apollo 13",
            "outV": "person\u0002Ron howard",
            "properties": {
                "score": 10
            }
        },
        {
            "id": "person\u0002Lilly Wachowski\u0001DIRECTED\u0001\u0001movie\u0002The Matrix Reloaded",
            "label": "DIRECTED",
            "type": "edge",
            "inVLabel": "movie",
            "outVLabel": "person",
            "inV": "movie\u0002The Matrix Reloaded",
            "outV": "person\u0002Lilly Wachowski",
            "properties": {
                "score": 10
            }
        },
        {
            "id": "person\u0002Nancy Meyers\u0001WROTE\u0001\u0001movie\u0002Something's Gotta Give",
            "label": "WROTE",
            "type": "edge",
            "inVLabel": "movie",
            "outVLabel": "person",
            "inV": "movie\u0002Something's Gotta Give",
            "outV": "person\u0002Nancy Meyers",
            "properties": {
                "score": 10
            }
        },
        {
            "id": "person\u0002James Cromwell\u0001ACTED_IN\u0001Judge Fielding\u0001movie\u0002Snow Falling on Cedars",
            "label": "ACTED_IN",
            "type": "edge",
            "inVLabel": "movie",
            "outVLabel": "person",
            "inV": "movie\u0002Snow Falling on Cedars",
            "outV": "person\u0002James Cromwell",
            "properties": {
                "roles": "Judge Fielding"
            }
        },
        {
            "id": "person\u0002Cuba Gooding Jr.\u0001ACTED_IN\u0001Frank Sachs\u0001movie\u0002as Good as It Gets",
            "label": "ACTED_IN",
            "type": "edge",
            "inVLabel": "movie",
            "outVLabel": "person",
            "inV": "movie\u0002as Good as It Gets",
            "outV": "person\u0002Cuba Gooding Jr.",
            "properties": {
                "roles": "Frank Sachs"
            }
        },
        {
            "id": "person\u0002David Morse\u0001ACTED_IN\u0001Brutus\u0001movie\u0002The Green Mile",
            "label": "ACTED_IN",
            "type": "edge",
            "inVLabel": "movie",
            "outVLabel": "person",
            "inV": "movie\u0002The Green Mile",
            "outV": "person\u0002David Morse",
            "properties": {
                "roles": "Brutus"
            }
        },
        {
            "id": "person\u0002Liv Tyler\u0001ACTED_IN\u0001Faye Dolan\u0001movie\u0002That Thing You Do",
            "label": "ACTED_IN",
            "type": "edge",
            "inVLabel": "movie",
            "outVLabel": "person",
            "inV": "movie\u0002That Thing You Do",
            "outV": "person\u0002Liv Tyler",
            "properties": {
                "roles": "Faye Dolan"
            }
        },
        {
            "id": "person\u0002Gary Sinise\u0001ACTED_IN\u0001Burt Hammersmith\u0001movie\u0002The Green Mile",
            "label": "ACTED_IN",
            "type": "edge",
            "inVLabel": "movie",
            "outVLabel": "person",
            "inV": "movie\u0002The Green Mile",
            "outV": "person\u0002Gary Sinise",
            "properties": {
                "roles": "Burt Hammersmith"
            }
        },
        {
            "id": "person\u0002Jack Nicholson\u0001ACTED_IN\u0001Melvin Udall\u0001movie\u0002as Good as It Gets",
            "label": "ACTED_IN",
            "type": "edge",
            "inVLabel": "movie",
            "outVLabel": "person",
            "inV": "movie\u0002as Good as It Gets",
            "outV": "person\u0002Jack Nicholson",
            "properties": {
                "roles": "Melvin Udall"
            }
        },
        {
            "id": "person\u0002Meg Ryan\u0001ACTED_IN\u0001DeDe, angelica Graynamore, Patricia Graynamore\u0001movie\u0002Joe Versus the Volcano",
            "label": "ACTED_IN",
            "type": "edge",
            "inVLabel": "movie",
            "outVLabel": "person",
            "inV": "movie\u0002Joe Versus the Volcano",
            "outV": "person\u0002Meg Ryan",
            "properties": {
                "roles": "DeDe, angelica Graynamore, Patricia Graynamore"
            }
        },
        {
            "id": "person\u0002Jan de Bont\u0001DIRECTED\u0001\u0001movie\u0002twister",
            "label": "DIRECTED",
            "type": "edge",
            "inVLabel": "movie",
            "outVLabel": "person",
            "inV": "movie\u0002twister",
            "outV": "person\u0002Jan de Bont",
            "properties": {
                "score": 10
            }
        },
        {
            "id": "person\u0002Tom Hanks\u0001ACTED_IN\u0001Dr. Robert Langdon\u0001movie\u0002The Da Vinci Code",
            "label": "ACTED_IN",
            "type": "edge",
            "inVLabel": "movie",
            "outVLabel": "person",
            "inV": "movie\u0002The Da Vinci Code",
            "outV": "person\u0002Tom Hanks",
            "properties": {
                "roles": "Dr. Robert Langdon"
            }
        },
        {
            "id": "person\u0002Tom Hanks\u0001ACTED_IN\u0001Jimmy Dugan\u0001movie\u0002a League of Their Own",
            "label": "ACTED_IN",
            "type": "edge",
            "inVLabel": "movie",
            "outVLabel": "person",
            "inV": "movie\u0002a League of Their Own",
            "outV": "person\u0002Tom Hanks",
            "properties": {
                "roles": "Jimmy Dugan"
            }
        },
        {
            "id": "person\u0002Jonathan Lipnicki\u0001ACTED_IN\u0001Ray Boyd\u0001movie\u0002Jerry Maguire",
            "label": "ACTED_IN",
            "type": "edge",
            "inVLabel": "movie",
            "outVLabel": "person",
            "inV": "movie\u0002Jerry Maguire",
            "outV": "person\u0002Jonathan Lipnicki",
            "properties": {
                "roles": "Ray Boyd"
            }
        },
        {
            "id": "person\u0002Michael Clarke Duncan\u0001ACTED_IN\u0001John Coffey\u0001movie\u0002The Green Mile",
            "label": "ACTED_IN",
            "type": "edge",
            "inVLabel": "movie",
            "outVLabel": "person",
            "inV": "movie\u0002The Green Mile",
            "outV": "person\u0002Michael Clarke Duncan",
            "properties": {
                "roles": "John Coffey"
            }
        },
        {
            "id": "person\u0002Kevin Bacon\u0001ACTED_IN\u0001Capt. Jack Ross\u0001movie\u0002a Few Good Men",
            "label": "ACTED_IN",
            "type": "edge",
            "inVLabel": "movie",
            "outVLabel": "person",
            "inV": "movie\u0002a Few Good Men",
            "outV": "person\u0002Kevin Bacon",
            "properties": {
                "roles": "Capt. Jack Ross"
            }
        },
        {
            "id": "person\u0002Tom Hanks\u0001ACTED_IN\u0001Joe Fox\u0001movie\u0002You've Got Mail",
            "label": "ACTED_IN",
            "type": "edge",
            "inVLabel": "movie",
            "outVLabel": "person",
            "inV": "movie\u0002You've Got Mail",
            "outV": "person\u0002Tom Hanks",
            "properties": {
                "roles": "Joe Fox"
            }
        },
        {
            "id": "person\u0002Danny DeVito\u0001ACTED_IN\u0001Martini\u0001movie\u0002One Flew Over the Cuckoo's Nest",
            "label": "ACTED_IN",
            "type": "edge",
            "inVLabel": "movie",
            "outVLabel": "person",
            "inV": "movie\u0002One Flew Over the Cuckoo's Nest",
            "outV": "person\u0002Danny DeVito",
            "properties": {
                "roles": "Martini"
            }
        },
        {
            "id": "person\u0002Milos Forman\u0001DIRECTED\u0001\u0001movie\u0002One Flew Over the Cuckoo's Nest",
            "label": "DIRECTED",
            "type": "edge",
            "inVLabel": "movie",
            "outVLabel": "person",
            "inV": "movie\u0002One Flew Over the Cuckoo's Nest",
            "outV": "person\u0002Milos Forman",
            "properties": {
                "score": 10
            }
        },
        {
            "id": "person\u0002Kelly Preston\u0001ACTED_IN\u0001avery Bishop\u0001movie\u0002Jerry Maguire",
            "label": "ACTED_IN",
            "type": "edge",
            "inVLabel": "movie",
            "outVLabel": "person",
            "inV": "movie\u0002Jerry Maguire",
            "outV": "person\u0002Kelly Preston",
            "properties": {
                "roles": "avery Bishop"
            }
        },
        {
            "id": "person\u0002Bill Pullman\u0001ACTED_IN\u0001Walter\u0001movie\u0002Sleepless in Seattle",
            "label": "ACTED_IN",
            "type": "edge",
            "inVLabel": "movie",
            "outVLabel": "person",
            "inV": "movie\u0002Sleepless in Seattle",
            "outV": "person\u0002Bill Pullman",
            "properties": {
                "roles": "Walter"
            }
        },
        {
            "id": "person\u0002Max von Sydow\u0001ACTED_IN\u0001The Tracker\u0001movie\u0002What Dreams May Come",
            "label": "ACTED_IN",
            "type": "edge",
            "inVLabel": "movie",
            "outVLabel": "person",
            "inV": "movie\u0002What Dreams May Come",
            "outV": "person\u0002Max von Sydow",
            "properties": {
                "roles": "The Tracker"
            }
        },
        {
            "id": "person\u0002Danny DeVito\u0001ACTED_IN\u0001Robert Ciaro\u0001movie\u0002hoffa",
            "label": "ACTED_IN",
            "type": "edge",
            "inVLabel": "movie",
            "outVLabel": "person",
            "inV": "movie\u0002hoffa",
            "outV": "person\u0002Danny DeVito",
            "properties": {
                "roles": "Robert Ciaro"
            }
        },
        {
            "id": "person\u0002Bruno Kirby\u0001ACTED_IN\u0001Jess\u0001movie\u0002When Harry Met Sally",
            "label": "ACTED_IN",
            "type": "edge",
            "inVLabel": "movie",
            "outVLabel": "person",
            "inV": "movie\u0002When Harry Met Sally",
            "outV": "person\u0002Bruno Kirby",
            "properties": {
                "roles": "Jess"
            }
        },
        {
            "id": "person\u0002Meg Ryan\u0001ACTED_IN\u0001Sally albright\u0001movie\u0002When Harry Met Sally",
            "label": "ACTED_IN",
            "type": "edge",
            "inVLabel": "movie",
            "outVLabel": "person",
            "inV": "movie\u0002When Harry Met Sally",
            "outV": "person\u0002Meg Ryan",
            "properties": {
                "roles": "Sally albright"
            }
        },
        {
            "id": "person\u0002Paul Bettany\u0001ACTED_IN\u0001Silas\u0001movie\u0002The Da Vinci Code",
            "label": "ACTED_IN",
            "type": "edge",
            "inVLabel": "movie",
            "outVLabel": "person",
            "inV": "movie\u0002The Da Vinci Code",
            "outV": "person\u0002Paul Bettany",
            "properties": {
                "roles": "Silas"
            }
        },
        {
            "id": "person\u0002River Phoenix\u0001ACTED_IN\u0001Chris Chambers\u0001movie\u0002Stand By Me",
            "label": "ACTED_IN",
            "type": "edge",
            "inVLabel": "movie",
            "outVLabel": "person",
            "inV": "movie\u0002Stand By Me",
            "outV": "person\u0002River Phoenix",
            "properties": {
                "roles": "Chris Chambers"
            }
        },
        {
            "id": "person\u0002hugo Weaving\u0001ACTED_IN\u0001Bill Smoke, Haskell Moore, Tadeusz Kesselring, Nurse Noakes, Boardman Mephi, Old Georgie\u0001movie\u0002Cloud atlas",
            "label": "ACTED_IN",
            "type": "edge",
            "inVLabel": "movie",
            "outVLabel": "person",
            "inV": "movie\u0002Cloud atlas",
            "outV": "person\u0002hugo Weaving",
            "properties": {
                "roles": "Bill Smoke, Haskell Moore, Tadeusz Kesselring, Nurse Noakes, Boardman Mephi, Old Georgie"
            }
        },
        {
            "id": "person\u0002Sam Rockwell\u0001ACTED_IN\u0001Wild Bill' Wharton\u0001movie\u0002The Green Mile",
            "label": "ACTED_IN",
            "type": "edge",
            "inVLabel": "movie",
            "outVLabel": "person",
            "inV": "movie\u0002The Green Mile",
            "outV": "person\u0002Sam Rockwell",
            "properties": {
                "roles": "Wild Bill' Wharton"
            }
        },
        {
            "id": "person\u0002Jay Mohr\u0001ACTED_IN\u0001Bob Sugar\u0001movie\u0002Jerry Maguire",
            "label": "ACTED_IN",
            "type": "edge",
            "inVLabel": "movie",
            "outVLabel": "person",
            "inV": "movie\u0002Jerry Maguire",
            "outV": "person\u0002Jay Mohr",
            "properties": {
                "roles": "Bob Sugar"
            }
        },
        {
            "id": "person\u0002Tom Tykwer\u0001DIRECTED\u0001\u0001movie\u0002Cloud atlas",
            "label": "DIRECTED",
            "type": "edge",
            "inVLabel": "movie",
            "outVLabel": "person",
            "inV": "movie\u0002Cloud atlas",
            "outV": "person\u0002Tom Tykwer",
            "properties": {
                "score": 10
            }
        },
        {
            "id": "person\u0002Kevin Bacon\u0001ACTED_IN\u0001Jack Brennan\u0001movie\u0002Frost/Nixon",
            "label": "ACTED_IN",
            "type": "edge",
            "inVLabel": "movie",
            "outVLabel": "person",
            "inV": "movie\u0002Frost/Nixon",
            "outV": "person\u0002Kevin Bacon",
            "properties": {
                "roles": "Jack Brennan"
            }
        },
        {
            "id": "person\u0002carrie Fisher\u0001ACTED_IN\u0001Marie\u0001movie\u0002When Harry Met Sally",
            "label": "ACTED_IN",
            "type": "edge",
            "inVLabel": "movie",
            "outVLabel": "person",
            "inV": "movie\u0002When Harry Met Sally",
            "outV": "person\u0002carrie Fisher",
            "properties": {
                "roles": "Marie"
            }
        },
        {
            "id": "person\u0002John Cusack\u0001ACTED_IN\u0001Denny Lachance\u0001movie\u0002Stand By Me",
            "label": "ACTED_IN",
            "type": "edge",
            "inVLabel": "movie",
            "outVLabel": "person",
            "inV": "movie\u0002Stand By Me",
            "outV": "person\u0002John Cusack",
            "properties": {
                "roles": "Denny Lachance"
            }
        },
        {
            "id": "person\u0002Jerry O'Connell\u0001ACTED_IN\u0001Vern Tessio\u0001movie\u0002Stand By Me",
            "label": "ACTED_IN",
            "type": "edge",
            "inVLabel": "movie",
            "outVLabel": "person",
            "inV": "movie\u0002Stand By Me",
            "outV": "person\u0002Jerry O'Connell",
            "properties": {
                "roles": "Vern Tessio"
            }
        },
        {
            "id": "person\u0002laurence Fishburne\u0001ACTED_IN\u0001Morpheus\u0001movie\u0002The Matrix",
            "label": "ACTED_IN",
            "type": "edge",
            "inVLabel": "movie",
            "outVLabel": "person",
            "inV": "movie\u0002The Matrix",
            "outV": "person\u0002laurence Fishburne",
            "properties": {
                "roles": "Morpheus"
            }
        },
        {
            "id": "person\u0002Jack Nicholson\u0001ACTED_IN\u0001Randle McMurphy\u0001movie\u0002One Flew Over the Cuckoo's Nest",
            "label": "ACTED_IN",
            "type": "edge",
            "inVLabel": "movie",
            "outVLabel": "person",
            "inV": "movie\u0002One Flew Over the Cuckoo's Nest",
            "outV": "person\u0002Jack Nicholson",
            "properties": {
                "roles": "Randle McMurphy"
            }
        },
        {
            "id": "person\u0002Tom Hanks\u0001ACTED_IN\u0001Jim Lovell\u0001movie\u0002apollo 13",
            "label": "ACTED_IN",
            "type": "edge",
            "inVLabel": "movie",
            "outVLabel": "person",
            "inV": "movie\u0002apollo 13",
            "outV": "person\u0002Tom Hanks",
            "properties": {
                "roles": "Jim Lovell"
            }
        },
        {
            "id": "person\u0002Meg Ryan\u0001ACTED_IN\u0001Kathleen Kelly\u0001movie\u0002You've Got Mail",
            "label": "ACTED_IN",
            "type": "edge",
            "inVLabel": "movie",
            "outVLabel": "person",
            "inV": "movie\u0002You've Got Mail",
            "outV": "person\u0002Meg Ryan",
            "properties": {
                "roles": "Kathleen Kelly"
            }
        },
        {
            "id": "person\u0002Joel Silver\u0001PRODUCED\u0001\u0001movie\u0002The Da Vinci Code",
            "label": "PRODUCED",
            "type": "edge",
            "inVLabel": "movie",
            "outVLabel": "person",
            "inV": "movie\u0002The Da Vinci Code",
            "outV": "person\u0002Joel Silver",
            "properties": {
                "score": 10
            }
        },
        {
            "id": "person\u0002Danny DeVito\u0001DIRECTED\u0001\u0001movie\u0002hoffa",
            "label": "DIRECTED",
            "type": "edge",
            "inVLabel": "movie",
            "outVLabel": "person",
            "inV": "movie\u0002hoffa",
            "outV": "person\u0002Danny DeVito",
            "properties": {
                "score": 10
            }
        },
        {
            "id": "person\u0002Patricia Clarkson\u0001ACTED_IN\u0001Melinda Moores\u0001movie\u0002The Green Mile",
            "label": "ACTED_IN",
            "type": "edge",
            "inVLabel": "movie",
            "outVLabel": "person",
            "inV": "movie\u0002The Green Mile",
            "outV": "person\u0002Patricia Clarkson",
            "properties": {
                "roles": "Melinda Moores"
            }
        },
        {
            "id": "person\u0002Lana Wachowski\u0001DIRECTED\u0001\u0001movie\u0002Speed Racer",
            "label": "DIRECTED",
            "type": "edge",
            "inVLabel": "movie",
            "outVLabel": "person",
            "inV": "movie\u0002Speed Racer",
            "outV": "person\u0002Lana Wachowski",
            "properties": {
                "score": 10
            }
        },
        {
            "id": "person\u0002emil Eifrem\u0001ACTED_IN\u0001emil\u0001movie\u0002The Matrix",
            "label": "ACTED_IN",
            "type": "edge",
            "inVLabel": "movie",
            "outVLabel": "person",
            "inV": "movie\u0002The Matrix",
            "outV": "person\u0002emil Eifrem",
            "properties": {
                "roles": "emil"
            }
        },
        {
            "id": "person\u0002aaron Sorkin\u0001WROTE\u0001\u0001movie\u0002a Few Good Men",
            "label": "WROTE",
            "type": "edge",
            "inVLabel": "movie",
            "outVLabel": "person",
            "inV": "movie\u0002a Few Good Men",
            "outV": "person\u0002aaron Sorkin",
            "properties": {
                "score": 10
            }
        },
        {
            "id": "person\u0002John Hurt\u0001ACTED_IN\u0001High Chancellor adam Sutler\u0001movie\u0002The Da Vinci Code",
            "label": "ACTED_IN",
            "type": "edge",
            "inVLabel": "movie",
            "outVLabel": "person",
            "inV": "movie\u0002The Da Vinci Code",
            "outV": "person\u0002John Hurt",
            "properties": {
                "roles": "High Chancellor adam Sutler"
            }
        },
        {
            "id": "person\u0002Nora Ephron\u0001DIRECTED\u0001\u0001movie\u0002Sleepless in Seattle",
            "label": "DIRECTED",
            "type": "edge",
            "inVLabel": "movie",
            "outVLabel": "person",
            "inV": "movie\u0002Sleepless in Seattle",
            "outV": "person\u0002Nora Ephron",
            "properties": {
                "score": 10
            }
        },
        {
            "id": "person\u0002Bill Paxton\u0001ACTED_IN\u0001Fred Haise\u0001movie\u0002apollo 13",
            "label": "ACTED_IN",
            "type": "edge",
            "inVLabel": "movie",
            "outVLabel": "person",
            "inV": "movie\u0002apollo 13",
            "outV": "person\u0002Bill Paxton",
            "properties": {
                "roles": "Fred Haise"
            }
        },
        {
            "id": "person\u0002James Marshall\u0001DIRECTED\u0001\u0001movie\u0002Speed Racer",
            "label": "DIRECTED",
            "type": "edge",
            "inVLabel": "movie",
            "outVLabel": "person",
            "inV": "movie\u0002Speed Racer",
            "outV": "person\u0002James Marshall",
            "properties": {
                "score": 10
            }
        },
        {
            "id": "person\u0002Tom Hanks\u0001ACTED_IN\u0001Mr. White\u0001movie\u0002That Thing You Do",
            "label": "ACTED_IN",
            "type": "edge",
            "inVLabel": "movie",
            "outVLabel": "person",
            "inV": "movie\u0002That Thing You Do",
            "outV": "person\u0002Tom Hanks",
            "properties": {
                "roles": "Mr. White"
            }
        },
        {
            "id": "person\u0002Meg Ryan\u0001ACTED_IN\u0001annie Reed\u0001movie\u0002Sleepless in Seattle",
            "label": "ACTED_IN",
            "type": "edge",
            "inVLabel": "movie",
            "outVLabel": "person",
            "inV": "movie\u0002Sleepless in Seattle",
            "outV": "person\u0002Meg Ryan",
            "properties": {
                "roles": "annie Reed"
            }
        },
        {
            "id": "person\u0002Lana Wachowski\u0001PRODUCED\u0001\u0001movie\u0002Speed Racer",
            "label": "PRODUCED",
            "type": "edge",
            "inVLabel": "movie",
            "outVLabel": "person",
            "inV": "movie\u0002Speed Racer",
            "outV": "person\u0002Lana Wachowski",
            "properties": {
                "score": 10
            }
        },
        {
            "id": "person\u0002John C. Reilly\u0001ACTED_IN\u0001Peter Connelly\u0001movie\u0002hoffa",
            "label": "ACTED_IN",
            "type": "edge",
            "inVLabel": "movie",
            "outVLabel": "person",
            "inV": "movie\u0002hoffa",
            "outV": "person\u0002John C. Reilly",
            "properties": {
                "roles": "Peter Connelly"
            }
        },
        {
            "id": "person\u0002Lori Petty\u0001ACTED_IN\u0001Kit Keller\u0001movie\u0002a League of Their Own",
            "label": "ACTED_IN",
            "type": "edge",
            "inVLabel": "movie",
            "outVLabel": "person",
            "inV": "movie\u0002a League of Their Own",
            "outV": "person\u0002Lori Petty",
            "properties": {
                "roles": "Kit Keller"
            }
        },
        {
            "id": "person\u0002Ice-T\u0001ACTED_IN\u0001J-Bone\u0001movie\u0002Johnny Mnemonic",
            "label": "ACTED_IN",
            "type": "edge",
            "inVLabel": "movie",
            "outVLabel": "person",
            "inV": "movie\u0002Johnny Mnemonic",
            "outV": "person\u0002Ice-T",
            "properties": {
                "roles": "J-Bone"
            }
        },
        {
            "id": "person\u0002Lilly Wachowski\u0001PRODUCED\u0001\u0001movie\u0002The Da Vinci Code",
            "label": "PRODUCED",
            "type": "edge",
            "inVLabel": "movie",
            "outVLabel": "person",
            "inV": "movie\u0002The Da Vinci Code",
            "outV": "person\u0002Lilly Wachowski",
            "properties": {
                "score": 10
            }
        },
        {
            "id": "person\u0002Ron howard\u0001DIRECTED\u0001\u0001movie\u0002The Da Vinci Code",
            "label": "DIRECTED",
            "type": "edge",
            "inVLabel": "movie",
            "outVLabel": "person",
            "inV": "movie\u0002The Da Vinci Code",
            "outV": "person\u0002Ron howard",
            "properties": {
                "score": 10
            }
        },
        {
            "id": "person\u0002Zach Grenier\u0001ACTED_IN\u0001Squad Leader\u0001movie\u0002rescueDawn",
            "label": "ACTED_IN",
            "type": "edge",
            "inVLabel": "movie",
            "outVLabel": "person",
            "inV": "movie\u0002rescueDawn",
            "outV": "person\u0002Zach Grenier",
            "properties": {
                "roles": "Squad Leader"
            }
        },
        {
            "id": "person\u0002keanu Reeves\u0001ACTED_IN\u0001Neo\u0001movie\u0002The Matrix",
            "label": "ACTED_IN",
            "type": "edge",
            "inVLabel": "movie",
            "outVLabel": "person",
            "inV": "movie\u0002The Matrix",
            "outV": "person\u0002keanu Reeves",
            "properties": {
                "roles": "Neo"
            }
        },
        {
            "id": "person\u0002Rosie O'Donnell\u0001ACTED_IN\u0001Becky\u0001movie\u0002Sleepless in Seattle",
            "label": "ACTED_IN",
            "type": "edge",
            "inVLabel": "movie",
            "outVLabel": "person",
            "inV": "movie\u0002Sleepless in Seattle",
            "outV": "person\u0002Rosie O'Donnell",
            "properties": {
                "roles": "Becky"
            }
        },
        {
            "id": "person\u0002Dave Chappelle\u0001ACTED_IN\u0001Kevin Jackson\u0001movie\u0002You've Got Mail",
            "label": "ACTED_IN",
            "type": "edge",
            "inVLabel": "movie",
            "outVLabel": "person",
            "inV": "movie\u0002You've Got Mail",
            "outV": "person\u0002Dave Chappelle",
            "properties": {
                "roles": "Kevin Jackson"
            }
        },
        {
            "id": "person\u0002Bill Paxton\u0001ACTED_IN\u0001Bob Hinson\u0001movie\u0002a League of Their Own",
            "label": "ACTED_IN",
            "type": "edge",
            "inVLabel": "movie",
            "outVLabel": "person",
            "inV": "movie\u0002a League of Their Own",
            "outV": "person\u0002Bill Paxton",
            "properties": {
                "roles": "Bob Hinson"
            }
        },
        {
            "id": "person\u0002Parker Posey\u0001ACTED_IN\u0001Patricia Eden\u0001movie\u0002You've Got Mail",
            "label": "ACTED_IN",
            "type": "edge",
            "inVLabel": "movie",
            "outVLabel": "person",
            "inV": "movie\u0002You've Got Mail",
            "outV": "person\u0002Parker Posey",
            "properties": {
                "roles": "Patricia Eden"
            }
        },
        {
            "id": "person\u0002nathan Lane\u0001ACTED_IN\u0001albert Goldman\u0001movie\u0002The Birdcage",
            "label": "ACTED_IN",
            "type": "edge",
            "inVLabel": "movie",
            "outVLabel": "person",
            "inV": "movie\u0002The Birdcage",
            "outV": "person\u0002nathan Lane",
            "properties": {
                "roles": "albert Goldman"
            }
        },
        {
            "id": "person\u0002Richard Harris\u0001ACTED_IN\u0001Bill Munny\u0001movie\u0002unforgiven",
            "label": "ACTED_IN",
            "type": "edge",
            "inVLabel": "movie",
            "outVLabel": "person",
            "inV": "movie\u0002unforgiven",
            "outV": "person\u0002Richard Harris",
            "properties": {
                "roles": "Bill Munny"
            }
        }
    ],
    "type": "EDGE",
    "duration": 1736,
    "id": "a105cdd9-58a7-4748-b276-fdb7c09bdeaf"
};