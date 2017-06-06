/**
 * @file Desciption:
 * @author huanghaiping(huanghaiping02@baidu.com)
 * Created on 17/5/31
 */
import React from 'react';
import {connect} from 'react-redux';
import {addConnection} from './actions';
import {
    Modal,
    ModalHeader,
    ModalClose,
    ModalBody,
    ModalFooter
} from 'react-modal-bootstrap';


class Connectionmodal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            name: '',
            graphName: '',
            host: '',
            port: ''
        };

        this.handleChange = this.handleChange.bind(this);

    }

    openModal() {
        this.setState({
            isOpen: true
        });
    }

    hideModal() {
        this.setState({
            isOpen: false
        });
    }

    save() {
        let newConnection = {
            'name': this.state.name,
            'graphName': this.state.graphName,
            'connectionHost': this.state.connectionHost,
            'port': this.state.port
        };
        this.props.addConnection(newConnection);
        this.hideModal();
    }

    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });
    }


    render() {
        return (
            <div>
                <button type="button" className="btn btn-default" onClick={() => this.openModal()}>
                    <i className="fa fa-plus" aria-hidden="true"><span>add</span></i>
                </button>
                <Modal isOpen={this.state.isOpen} onRequestHide={() => this.hideModal()}>
                    <ModalHeader className="modal-header">
                        <ModalClose onClick={() => this.hideModal()}/>
                        <h4 className="modal-title">Connetion information </h4>
                    </ModalHeader>
                    <ModalBody>
                        <form className="form-horizontal">
                            <div className="form-group">
                                <label className="col-sm-2 control-label">Name</label>
                                <div className="col-sm-10">
                                    <input type="text" className="form-control" placeholder="Name" name="name"
                                           value={this.state.name} onChange={this.handleChange}/>
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="col-sm-2 control-label">graphName</label>
                                <div className="col-sm-10">
                                    <input type="text" className="form-control" placeholder="graphName" name="graphName"
                                           value={this.state.graphName} onChange={this.handleChange}/>
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="col-sm-2 control-label">Host</label>
                                <div className="col-sm-10">
                                    <input type="text" className="form-control" placeholder="Host" name="connectionHost"
                                           value={this.state.connectionHost} onChange={this.handleChange}/>
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="col-sm-2 control-label">Port</label>
                                <div className="col-sm-10">
                                    <input type="text" className="form-control" placeholder="Port" name="port"
                                           value={this.state.port} onChange={this.handleChange}/>
                                </div>
                            </div>
                        </form>
                    </ModalBody>

                    <ModalFooter className="modal-footer">
                        <button type="button" className="btn btn-default" onClick={() => this.hideModal()}>Close
                        </button>
                        <button type="button" className="btn btn-primary" onClick={() => this.save()}>Save</button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}


// Map Redux state to component props
function mapStateToProps(state) {
    return {
        connections: state.connections
    };
}

// Map Redux actions to component props
function mapDispatchToProps(dispatch) {
    return {
        addConnection: newConnection => dispatch(addConnection(newConnection))
    };
}

// Connected Component
export const ConnectionmodalApp = connect(
    mapStateToProps,
    mapDispatchToProps
)(Connectionmodal);