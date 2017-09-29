/**
 * @file Desciption:
 * @author huanghaiping(huanghaiping02@baidu.com)
 * Created on  17/5/31
 */

import React from 'react';
import {connect} from 'react-redux';
import {saveConnection} from './actions';
import {
    Modal,
    ModalHeader,
    ModalClose,
    ModalBody,
    ModalFooter
} from 'react-modal-bootstrap';
import Input from '../commoncomponents/input';
import {isNull,isNumber} from '../commoncomponents/validator';

class ConnectionModal extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isValidateByForce: false,
            isOpen: false,
            connection: {
                id: '',
                name: '',
                graphName: '',
                connectionHost: '',
                port: ''
            },
            title: '',
            operation: ''
        };
        this.validation = {
            name: true,
            graphName: true,
            connectionHost: true,
            port: true
        };
    }

    handleChange = (name, value, ...needless) => {
        if (needless.length > 0) {
            this.validation[name] = needless[0];
        }
        this.state.connection[name] = value.trim();
    }

    saveConnection() {
        this.setState({isValidateByForce: true});
        let validationStatus = true;
        for (let k in this.validation) {
            validationStatus = validationStatus && this.validation[k];
            if (!validationStatus) {
                break;
            }
        }

        if (validationStatus) {
            let modalInfo = {}
            if (this.props.operation === 'add') {
                modalInfo = {
                    operation: this.props.operation,
                    connection: {
                        name: this.state.connection.name,
                        graphName: this.state.connection.graphName,
                        connectionHost: this.state.connection.connectionHost,
                        port: this.state.connection.port
                    }
                }
            } else {
                modalInfo = {
                    operation: this.props.operation,
                    connection: {...this.state.connection}
                }
            }

            this.props.saveConnection(modalInfo);
            this.closeModal();
        }
    }

    componentDidUpdate() {
        this.state.isValidateByForce = false;
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            isOpen: nextProps.isOpen,
            connection: nextProps.connection,
            operation: nextProps.operation,
            title:nextProps.title
        });
    }

    closeModal=()=>{
        this.setState({isOpen: false});
    }

    render() {
        let isOpen = this.state.isOpen;
        let connection = this.state.connection;
        return (
            <div>
                <Modal isOpen={isOpen}>
                    <ModalHeader className="modal-header">
                        <ModalClose
                            onClick={this.closeModal}/>
                        <h4 className="modal-title">{this.state.title} </h4>
                    </ModalHeader>
                    <ModalBody>
                        <form className="form-horizontal">
                            <div className="form-group">
                                <label
                                    className="col-sm-2 control-label">Name</label>
                                <Input className="col-sm-10" placeholder="Name"
                                       name="name"
                                       validator={isNull}
                                       message="please enter the name"
                                       isValidateByForce={this.state.isValidateByForce}
                                       value={connection.name}
                                       onChange={this.handleChange}
                                       onKeyPress={() => this.saveConnection()}/>
                            </div>
                            <div className="form-group">
                                <label className="col-sm-2 control-label">graphName</label>
                                <Input className="col-sm-10"
                                       placeholder="graphName" name="graphName"
                                       validator={isNull}
                                       isValidateByForce={this.state.isValidateByForce}
                                       value={connection.graphName}
                                       onChange={this.handleChange}
                                       onKeyPress={() => this.saveConnection()}/>
                            </div>
                            <div className="form-group">
                                <label
                                    className="col-sm-2 control-label">Host</label>
                                <Input className="col-sm-10"
                                       placeholder="ConnectionHost"
                                       name="connectionHost"
                                       validator={isNull}
                                       isValidateByForce={this.state.isValidateByForce}
                                       value={connection.connectionHost}
                                       onChange={this.handleChange}
                                       onKeyPress={() => this.saveConnection()}/>
                            </div>
                            <div className="form-group">
                                <label
                                    className="col-sm-2 control-label">Port</label>
                                <Input className="col-sm-10" placeholder="Port"
                                       name="port"
                                       validator={isNumber}
                                       isValidateByForce={this.state.isValidateByForce}
                                       value={connection.port}
                                       onChange={this.handleChange}
                                       onKeyPress={() => this.saveConnection()}/>
                            </div>
                        </form>
                    </ModalBody>

                    <ModalFooter className="modal-footer">
                        <button type="button" className="btn btn-default"
                                onClick={this.closeModal}>
                            Close
                        </button>
                        <button type="button" className="btn btn-primary"
                                onClick={() => this.saveConnection()}>Save
                        </button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}

// Map Redux state to component props
function mapStateToProps(state) {
    return {
        connectionModalInfo: state.connectionModalInfo
    };
}

// Map Redux actions to component props
function mapDispatchToProps(dispatch) {
    return {
        saveConnection: info => dispatch(saveConnection(info))
    };
}

// Connected Component
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ConnectionModal);
