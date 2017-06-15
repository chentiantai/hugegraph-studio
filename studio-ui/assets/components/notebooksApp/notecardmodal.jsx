/**
 * @file Desciption:
 * @author liunanke(liunanke@baidu.com)
 * Created on 17/6/6
 */
import React from 'react';
import {connect} from 'react-redux';
import {saveNoteCard} from './actions';
import {
    Modal,
    ModalHeader,
    ModalClose,
    ModalBody,
    ModalFooter
} from 'react-modal-bootstrap';
import Input from '../commoncomponents/input';
import Select from '../commoncomponents/select';
import {isNull} from '../commoncomponents/validator';


class NoteCardModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            operation: 'add',
            isValidateByForce: false,
            connections: [],
            isOpen: false,
            noteCard: {
                id: '',
                name: '',
                connectionId: ''
            }
        };

        this.validation = {
            name: true
        };
    }

    handleChange = (name, value, ...needles) => {
        if (needles.length > 0) {
            this.validation[name] = needles[0];
        }

        this.state.noteCard[name] = value;
    }


    handleSelectChange = (name, value) => {
        this.state.noteCard[name] = value;
    }

    closeModal() {
        this.setState({isOpen: false});
    }

    saveNoteCard() {
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
            if (this.props.operation == 'add') {
                modalInfo = {
                    operation: this.props.operation,
                    noteCard: {
                        name: this.state.noteCard.name,
                        connectionId: this.state.noteCard.connectionId
                    }
                }
            } else {
                modalInfo = {
                    operation: this.props.operation,
                    noteCard: {
                        id: this.state.noteCard.id,
                        name: this.state.noteCard.name,
                        connectionId: this.state.noteCard.connectionId
                    }
                }
            }

            this.props.saveNoteCard(modalInfo);
            this.closeModal();
        }
    }


    loadConnections() {
        fetch('/api/v1/connections')
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    console.error('Load Connection: Server Side Error；\r\nCode:' + response.status);
                }
            })
            .then(data => {
                this.setState({connections: data});
            })
            .catch(err => {
                console.error(err);
            });
    }


    componentWillReceiveProps(nextProps) {
        this.setState({
            isOpen: nextProps.isOpen,
            noteCard: nextProps.noteCard,
            operation: nextProps.operation
        });
    }

    render() {
        let selectValue =
            this.state.noteCard.connectionId === '' && this.state.connections.length > 0 ?
                this.state.connections[0].id : this.state.noteCard.connectionId;

        return (
            <div>
                <Modal isOpen={this.state.isOpen}>
                    <ModalHeader className="modal-header">
                        <ModalClose
                            onClick={() => this.closeModal()}/>
                        <h4 className="modal-title">{this.props.title} </h4>
                    </ModalHeader>
                    <ModalBody>
                        <form className="form-horizontal">
                            <div className="form-group">
                                <label
                                    className="col-sm-2 control-label">Name*</label>
                                <Input className="col-sm-10" placeholder="Name"
                                       name="name"
                                       validator={isNull}
                                       message="please enter the notebook name"
                                       isValidateByForce={this.state.isValidateByForce}
                                       value={this.state.noteCard.name}
                                       onChange={this.handleChange}/>
                            </div>
                            <div className="form-group">
                                <label className="col-sm-2 control-label">Connection*</label>
                                <Select className="col-sm-10"
                                        name="connectionId"
                                        value={selectValue}
                                        options={
                                            this.state.connections.map(connection =>
                                                <option key={connection.id}
                                                        value={connection.id}>{connection.name}</option>)
                                        }
                                        onChange={this.handleSelectChange}
                                />
                            </div>
                        </form>
                    </ModalBody>

                    <ModalFooter className="modal-footer">
                        <button type="button" className="btn btn-default"
                                onClick={() => this.closeModal()}>
                            Close
                        </button>
                        <button type="button" className="btn btn-primary"
                                onClick={() => this.saveNoteCard()}>
                            Save
                        </button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }

    componentDidUpdate() {
        // close validation of input
        this.state.isValidateByForce = false;
    }

    componentDidMount() {
        //there will be some problem
        this.loadConnections();
    }
}


// Map Redux state to component props
function mapStateToProps(state) {
    return {
        cardModalInfo: state.cardModalInfo
    };
}

// Map Redux actions to component props
function mapDispatchToProps(dispatch) {
    return {
        saveNoteCard: (modalInfo) => dispatch(saveNoteCard(modalInfo))
    };
}

// Connected Component
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(NoteCardModal);
