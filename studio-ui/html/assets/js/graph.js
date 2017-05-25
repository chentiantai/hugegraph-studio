/**
 * @file Created by huanghaiping02 on 17/5/9.
 */

$(function () {
    var onLoad = function onLoad() {

        $.getJSON('/assets/data/schema.json', function (result) {
            if (result.status === 200) {
                var schema = result.data;
                drawGraph(schema);
            } else {
                alert(result.message);
            }
        });
        // $('canvas').css('height','250px');
    };

    onLoad();

    function drawGraph(schema) {
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
        schema.edgeLabels.map(function (item) {
            item.connections.map(function (conn) {
                ++i;
                edges.add([
                    {id: i, from: conn.srcVertex, to: conn.tgtVertex, label: item.name},
                ]);
            });

        });

        var container = document.getElementById('graph');
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
                interaction: {hover: true},
                physics: true,
                configure: function (option, path) {
                    if (path.indexOf('dynamic') !== -1 || option === 'dynamic') {
                        return true;
                    }
                    return false;
                },
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
});
