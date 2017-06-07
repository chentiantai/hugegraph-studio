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


class ConnectionModal extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        const newConnection = Object.assign({}, this.props.modalInfo.connection, {[name]: value});
        this.props.refreshModal(newConnection);
    }


    render() {
        let isOpen = this.props.modalInfo.isOpen;
        let connection = this.props.modalInfo.connection;
        return (
            <div>
                <Modal isOpen={isOpen}>
                    <ModalHeader className="modal-header">
                        <ModalClose onClick={() => this.props.closeEditModal()}/>
                        <h4 className="modal-title">{this.props.modalInfo.title} </h4>
                    </ModalHeader>
                    <ModalBody>
                        <form className="form-horizontal">
                            <div className="form-group">
                                <label className="col-sm-2 control-label">Name</label>
                                <div className="col-sm-10">
                                    <input type="text" className="form-control" placeholder="Name" name="name"
                                           value={connection.name} onChange={this.handleChange}/>
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="col-sm-2 control-label">graphName</label>
                                <div className="col-sm-10">
                                    <input type="text" className="form-control" placeholder="graphName" name="graphName"
                                           value={connection.graphName} onChange={this.handleChange}/>
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="col-sm-2 control-label">Host</label>
                                <div className="col-sm-10">
                                    <input type="text" className="form-control" placeholder="Host" name="connectionHost"
                                           value={connection.connectionHost} onChange={this.handleChange}/>
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="col-sm-2 control-label">Port</label>
                                <div className="col-sm-10">
                                    <input type="text" className="form-control" placeholder="Port" name="port"
                                           value={connection.port} onChange={this.handleChange}/>
                                </div>
                            </div>
                        </form>
                    </ModalBody>

                    <ModalFooter className="modal-footer">
                        <button type="button" className="btn btn-default" onClick={() => this.props.closeEditModal()}>
                            Close
                        </button>
                        <button type="button" className="btn btn-primary"
                                onClick={() => this.props.saveConnection(this.props.modalInfo)}>Save
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
        refreshModal: connection => dispatch(refreshModal(connection)),
        saveConnection: modalInfo => dispatch(saveConnection(modalInfo))
    };
}

// Connected Component
export const ConnectionModalApp = connect(
    mapStateToProps,
    mapDispatchToProps
)(ConnectionModal);