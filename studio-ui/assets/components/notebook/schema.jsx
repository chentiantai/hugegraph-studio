/**
 * @file Desciption
 * @author liunanke(liunanke@baidu.com)
 * Created on 2017/6/1.
 */
import React from "react";
import {showSchema} from "./actions";
import {connect} from "react-redux";

export class Schema extends React.Component {
    constructor() {
        super();
    }

    render() {
        let schemaResult = this.props.schema;
        if (schemaResult !== null) {
            return (
                <div>
                    <div className="container schema-container">
                        <div className="row schema">
                            <h5>Node
                                labels({schemaResult.vertexLabels.length})</h5>
                            <div className="schema-box">
                                {
                                    schemaResult.vertexLabels.map(
                                        (vertexLabel, index) =>
                                            <span key={index}
                                                  className="label label-default schema-span"> {vertexLabel.name}</span>
                                    )
                                }
                            </div>
                        </div>
                        <div className="row schema">
                            <h5>Relationship
                                types({schemaResult.edgeLabels.length})</h5>
                            <div className="schema-box">
                                {
                                    schemaResult.edgeLabels.map(
                                        (edgeLabel, index) =>
                                            <span key={index}
                                                  className="label label-default schema-span"> {edgeLabel.name}</span>
                                    )
                                }
                            </div>
                        </div>
                        <div className="row schema">
                            <h5>Property keys({schemaResult.propertyKeys.length})</h5>
                            <div className="schema-box">
                                {
                                    schemaResult.propertyKeys.map(
                                        (propertyKey, index) =>
                                            <span key={index}
                                                  className="label label-default schema-span"> {propertyKey.name}</span>
                                    )
                                }
                            </div>
                        </div>
                    </div>
                </div>
            );
        } else {
            return null;
        }
    }

    componentDidMount() {
        let connectionId = this.props.notebook.connection.id;
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
