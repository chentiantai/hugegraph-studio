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
import {showSchema} from './actions';
import {connect} from 'react-redux';
import {OverlayTrigger, ButtonToolbar, Popover} from 'react-bootstrap';

export class Schema extends React.Component {
    constructor() {
        super();
    }

    render () {
        if (this.props.schema !== null) {
            let vertexLabels = this.props.schema.vertexLabels
            let edgeLabels = this.props.schema.edgeLabels
            let propertyKeys = this.props.schema.propertyKeys
            return (
                <div>
                    <div className="container schema-container">
                        <div className="row schema">
                            <h5>Vertex Labels
                                ({vertexLabels.length})</h5>
                            <div className="schema-box">
                                {this.createVertexLabelsDom(vertexLabels)}
                            </div>
                        </div>
                        <div className="row schema">
                            <h5>Edge Labels
                                ({edgeLabels.length})</h5>
                            <div className="schema-box">
                                {this.createEdgeLabelsDom(edgeLabels)}
                            </div>
                        </div>
                        <div className="row schema">
                            <h5>Property Keys
                                ({propertyKeys.length})</h5>
                            <div className="schema-box">
                                {this.createPropertyKeysDom(propertyKeys)}
                            </div>
                        </div>
                    </div>
                </div>
            )
        } else {
            return null
        }
    }

    createVertexLabelsDom = (vertexLabels) => {
        return (<ButtonToolbar>
            {
                vertexLabels.map((vertexLabel, index) => {
                    let tooltip =
                        <Popover id="schema-tooltip" title="VertexLabel">
                            <div>
                                <div>
                                    <span className="property_name_span">
                                        Name
                                    </span>:
                                    <span className="property_value_span">
                                        {vertexLabel.name}
                                    </span>
                                </div>
                                <div>
                                    <span className="property_name_span">
                                        Properties
                                    </span>:
                                    <span className="property_value_span">
                                        {vertexLabel.properties.length === 0 ?
                                         '[ ]' :
                                         JSON.stringify(vertexLabel.properties)}
                                    </span>
                                </div>
                                <div>
                                    <span className="property_name_span">
                                        PrimaryKeys
                                    </span>:
                                    <span className="property_value_span">
                                        {vertexLabel.primary_keys.length === 0 ?
                                         '[ ]' : vertexLabel.primary_keys}
                                    </span>
                                </div>
                            </div>
                        </Popover>
                    return (
                        <OverlayTrigger key={index}
                                        placement="bottom"
                                        overlay={tooltip}>
                            <span className="label label-default schema-span">
                                {vertexLabel.name}
                            </span>
                        </OverlayTrigger>
                    )
                })
            }
        </ButtonToolbar>)
    }

    createEdgeLabelsDom = (edgeLabels) => {
        return (<ButtonToolbar>
            {
                edgeLabels.map((edgeLabel, index) => {
                    let tooltip =
                        <Popover id="schema-tooltip" title="EdgeLabels">
                            <div>
                                <div>
                                    <span className="property_name_span">
                                        Name
                                    </span>:
                                    <span className="property_value_span">
                                        {edgeLabel.name}
                                    </span>
                                </div>
                                <div>
                                    <span className="property_name_span">
                                        Properties
                                    </span>:
                                    <span className="property_value_span">
                                        {edgeLabel.properties.length === 0 ?
                                        '[ ]' :
                                         JSON.stringify(edgeLabel.properties)}
                                    </span>
                                </div>
                                <div>
                                    <span className="property_name_span">
                                        Frequency
                                    </span>:
                                    <span className="property_value_span">
                                        {edgeLabel.frequency}
                                    </span>
                                </div>
                                <div>
                                    <span className="property_name_span">
                                        Source
                                    </span>:
                                    <span className="property_value_span">
                                        {edgeLabel.source_label}
                                    </span>
                                </div>
                                <div>
                                    <span className="property_name_span">
                                        Target
                                    </span>:
                                    <span className="property_value_span">
                                        {edgeLabel.target_label}
                                    </span>
                                </div>
                                <div>
                                    <span className="property_name_span">
                                        SortKeys
                                    </span>:
                                    <span className="property_value_span">
                                        {edgeLabel.sort_keys.length === 0 ?
                                        '[ ]' : edgeLabel.sort_keys}
                                    </span>
                                </div>
                            </div>
                        </Popover>
                    return (
                        <OverlayTrigger
                            key={index}
                            placement="bottom"
                            overlay={tooltip}>
                            <span className="label label-default schema-span">
                                {edgeLabel.name}
                            </span>
                        </OverlayTrigger>
                    )
                })
            }
        </ButtonToolbar>)


    }

    createPropertyKeysDom = (propertyKeys) => {
        return (<ButtonToolbar>
            {
                propertyKeys.map((propertyKey, index) => {
                    let tooltip =
                        <Popover id="schema-tooltip" title="PropertyKeys">
                            <div>
                                <div>
                                    <span className="property_name_span">
                                        Name
                                    </span>:
                                    <span className="property_value_span">
                                        {propertyKey.name}
                                    </span>
                                </div>
                                <div>
                                    <span className="property_name_span">
                                        Properties
                                    </span>:
                                    <span className="property_value_span">
                                        {propertyKey.properties.length === 0 ?
                                         '[ ]' :
                                         JSON.stringify(propertyKey.properties)}
                                    </span>
                                </div>
                                <div>
                                    <span className="property_name_span">
                                        DataType
                                    </span>:
                                    <span className="property_value_span">
                                        {propertyKey.data_type}
                                    </span>
                                </div>
                                <div>
                                    <span className="property_name_span">
                                        Cardinality
                                    </span>:
                                    <span className="property_value_span">
                                        {propertyKey.cardinality}
                                    </span>
                                </div>
                            </div>
                        </Popover>
                    return (
                        <OverlayTrigger
                            key={index}
                            placement="bottom"
                            overlay={tooltip}>
                        <span className="label label-default schema-span">
                            {propertyKey.name}
                        </span>
                        </OverlayTrigger>
                    )
                })
            }
        </ButtonToolbar>)

    }

    componentDidMount() {
        let connectionId = this.props.connection.id;
        this.props.showSchema(connectionId);
    }
}

//Map Redux state to component props
function mapStateToProps(state) {
    return {
        schema: state.schema
    };
}

// Map Redux actions to component props
function mapDispatchToProps(dispatch) {
    return {
        showSchema: (connectionId) => dispatch(showSchema(connectionId))
    };
}

//Connected Component with Redux
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Schema);
