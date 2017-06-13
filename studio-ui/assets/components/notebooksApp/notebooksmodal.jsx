/**
 * @file Desciption:
 * @author liunanke(liunanke@baidu.com)
 * Created on 17/6/6
 */
import React from 'react';
import {connect} from 'react-redux';
import {closeEditModal, refreshModal, saveNotebooks} from './actions';
import {
    Modal,
    ModalHeader,
    ModalClose,
    ModalBody,
    ModalFooter
} from 'react-modal-bootstrap';


class NotebooksModal extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        const newNotebooks = Object.assign({}, this.props.modalInfo.notebooks, {[name]: value});
        this.props.refreshModal(newNotebooks);
    }


    render() {
        let isOpen = this.props.modalInfo.isOpen;
        let notebooks = this.props.modalInfo.notebooks;
        return (
            <div>
                <Modal isOpen={isOpen}>
                    <ModalHeader className="modal-header">
                        <ModalClose
                            onClick={() => this.props.closeEditModal()}/>
                        <h4 className="modal-title">{this.props.modalInfo.title} </h4>
                    </ModalHeader>
                    <ModalBody>
                        <form className="form-horizontal">
                            <div className="form-group">
                                <label
                                    className="col-sm-2 control-label">Name*</label>
                                <div className="col-sm-10">
                                    <input type="text" className="form-control"
                                           placeholder="Name" name="name"
                                           value={notebooks.name}
                                           onChange={this.handleChange}/>
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="col-sm-2 control-label">Connection*</label>
                                <div className="col-sm-10">
                                    <select type="text" className="form-control"
                                            placeholder="Select a Connection "
                                            name="connectionName">
                                        <option value="" disabled selected
                                                className="form-control">Select
                                            a Connection
                                        </option>
                                        <option value="saab">Saab</option>
                                        <option value="mercedes">Mercedes
                                        </option>
                                        <option value="audi">Audi</option>
                                    </select>
                                </div>
                            </div>
                        </form>
                    </ModalBody>

                    <ModalFooter className="modal-footer">
                        <button type="button" className="btn btn-default"
                                onClick={() => this.props.closeEditModal()}>
                            Close
                        </button>
                        <button type="button" className="btn btn-primary"
                                onClick={() => this.props.saveNotebooks(this.props.modalInfo)}>
                            Save
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
        refreshModal: notebooks => dispatch(refreshModal(notebooks)),
        saveNotebooks: modalInfo => dispatch(saveNotebooks(modalInfo))
    };
}

// Connected Component
export const NotebooksModalApp = connect(
    mapStateToProps,
    mapDispatchToProps
)(NotebooksModal);
