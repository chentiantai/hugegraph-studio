import React from 'react';
import {openNoteCardModal} from './actions';
import NoteCardModal from './notecardmodal';
import {connect} from 'react-redux';


class NoteCardAdd extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            addTimes: 0
        }
    }

    addNotebook() {
        this.setState({
            isOpen: true,
            addTimes: this.state.addTimes + 1
        });
    }


    render() {
        return (
            <div className="notebook-card">
                <div className="notebook-card-add">
                    <button type="button" className="btn btn-link"
                            onClick={() => this.addNotebook()}>
                        <i className="fa fa-plus fa-4x" aria-hidden="true"></i>
                    </button>
                    <NoteCardModal addTime={this.state.addTimes} isOpen={this.state.isOpen} operation="add"
                                   title="Add notebook"/>
                </div>
            </div>
        )
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
        openModal: (noteCard, operation, title) => dispatch(openNoteCardModal(noteCard, operation, title))
    };
}

// Connected Component
export default  connect(
    mapStateToProps,
    mapDispatchToProps
)(NoteCardAdd);
