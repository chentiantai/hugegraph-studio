/**
 * @file Desciption:
 * @author huanghaiping(huanghaiping02@baidu.com)
 * Created on 17/5/31
 */
import React from 'react';
import {connect} from 'react-redux';
import {closeEditModal, refreshModal, saveConnection} from './actions';
import {
    Modal,
    ModalHeader,
    ModalClose,
    ModalBody,
    ModalFooter
} from 'react-modal-bootstrap';
import Input from '../commoncomponents/input';
import {isNull, isIp, isNumber} from '../commoncomponents/validator';


class ConnectionModal extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isValidateByForce: false
        };
        this.validation = {
            name: true,
            graphName: true,
            connectionHost: true,
            port: true
        };
        this.modalInfo = {};
        this.isValidateByForce = false;
    }

    handleChange = (name, value, ...needles) => {
        if (needles.length > 0) {
            this.validation[name] = needles[0];
        }
        this.modalInfo.connection = Object.assign({}, this.props.modalInfo.connection, {[name]: value});

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
            this.props.saveConnection(this.modalInfo);
        }

    }


    closeEditModal() {
        this.props.closeEditModal();
    }


    componentDidUpdate() {
        this.state.isValidateByForce = false;
    }

    render() {
        this.modalInfo = this.props.modalInfo;
        let isOpen = this.props.modalInfo.isOpen;
        let connection = this.props.modalInfo.connection;
        return (
            <div>
                <Modal isOpen={isOpen}>
                    <ModalHeader className="modal-header">
                        <ModalClose
                            onClick={() => this.props.closeEditModal()}/>
                        <h4 className="modal-title">{this.modalInfo.title} </h4>
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
                                       onChange={this.handleChange}/>
                            </div>
                            <div className="form-group">
                                <label className="col-sm-2 control-label">graphName</label>
                                <Input className="col-sm-10"
                                       placeholder="graphName" name="graphName"
                                       validator={isNull}
                                       isValidateByForce={this.state.isValidateByForce}
                                       value={connection.graphName}
                                       onChange={this.handleChange}/>
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
                                       onChange={this.handleChange}/>
                            </div>
                            <div className="form-group">
                                <label
                                    className="col-sm-2 control-label">Port</label>
                                <Input className="col-sm-10" placeholder="Port"
                                       name="port"
                                       validator={isNumber}
                                       isValidateByForce={this.state.isValidateByForce}
                                       value={connection.port}
                                       onChange={this.handleChange}/>
                            </div>
                        </form>
                    </ModalBody>

                    <ModalFooter className="modal-footer">
                        <button type="button" className="btn btn-default"
                                onClick={() => this.closeEditModal()}>
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
        modalInfo: state.modalInfo
    };
}

// Map Redux actions to component props
function mapDispatchToProps(dispatch) {
    return {
        closeEditModal: () => dispatch(closeEditModal()),
        saveConnection: modalInfo => dispatch(saveConnection(modalInfo))
    };
}

// Connected Component
export const ConnectionModalApp = connect(
    mapStateToProps,
    mapDispatchToProps
)(ConnectionModal);