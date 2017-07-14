/**
 * @file Desciption:
 * @author huanghaiping(huanghaiping02@baidu.com)
 * Created on 17/6/30
 */

import React from 'react';
import {connect} from 'react-redux';
import {changeLoadingMode} from '../actions';

export  class TableResult extends React.Component {
    constructor() {
        super();
    }

    render() {
        const tableContent = this.props.content.data;
        let dataType = this.props.content.type;
        switch (dataType) {
            case 'VERTEX':
                return (
                    <div style={{height: this.props.height + 'px'}}
                         className="code-content">
                        <table className="table table-bordered table-striped">
                            <tbody>
                            <tr className="info">
                                <th>id</th>
                                <th>label</th>
                                <th>properties</th>
                            </tr>
                            {
                                tableContent.map((vertex, index) =>
                                    <tr key={index}>
                                        <td>{vertex.id}</td>
                                        <td>{vertex.label}</td>
                                        <td>{JSON.stringify(vertex.properties)}</td>
                                    </tr>
                                )
                            }
                            </tbody>
                        </table>
                    </div>
                );
            case 'EDGE':
                return (
                    <div style={{height: this.props.height + 'px'}}
                         className="code-content">
                        <table className="table table-bordered table-striped">
                            <tbody>
                            <tr className="info">
                                <th>id</th>
                                <th>label</th>
                                <th>source</th>
                                <th>target</th>
                                <th>properties</th>
                            </tr>
                            {
                                tableContent.map((edge, index) =>
                                    <tr key={index}>
                                        <td>{edge.id}</td>
                                        <td>{edge.label}</td>
                                        <td>{edge.outV}</td>
                                        <td>{edge.inV}</td>
                                        <td>{JSON.stringify(edge.properties)}</td>
                                    </tr>
                                )
                            }
                            </tbody>
                        </table>
                    </div>
                );
            case 'NUMBER':
                return (
                    <div style={{height: this.props.height + 'px'}}
                         className="code-content">
                        <table className="table table-bordered table-striped">
                            <tbody>
                            <tr className="info">
                                <th>count</th>
                            </tr>
                            <tr>
                                <td>{tableContent}</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                );
            case 'PATH':
                return (
                    <div style={{height: this.props.height + 'px'}}
                         className="code-content">
                        <table className="table table-bordered table-striped">
                            <tbody>
                            <tr className="info">
                                <th>path</th>
                            </tr>

                            {
                                tableContent.map((obj, index) => {
                                    let vertexName = obj.objects[0].id.split('\u0002')[1];
                                    let edgeLabel = obj.objects[1].label;
                                    let pathResult = vertexName + '--' + edgeLabel + '-->';
                                    return <tr key={index}>
                                        <td>{pathResult}</td>
                                    </tr>;
                                })

                            }

                            </tbody>
                        </table>
                    </div>
                )
            default :
                return (<div></div>);
        }
    }

    componentDidUpdate(){
        this.loadDone();
    }

    componentDidMount() {
        this.loadDone();
    }


    loadDone = () => {
        this.props.changeLoadingMode({
            loading: false,
            cellId: this.props.cellId
        });
    }
}


// Map Redux state to component props
function mapStateToProps(state) {
    return {
        loading: state.loadingMode.loading
    };
}

// Map Redux actions to component props
function mapDispatchToProps(dispatch) {
    return {
        changeLoadingMode: mode => dispatch(changeLoadingMode(mode))
    };
}

// Connected Component
export default  connect(
    mapStateToProps,
    mapDispatchToProps
)(TableResult);