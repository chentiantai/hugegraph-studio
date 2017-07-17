import React from 'react';
import {connect} from 'react-redux';
import {alertMessage, loadConnections} from '../connection/actions';


export class NoteCardAdd extends React.Component {
    constructor() {
        super();
    }

    render() {
        return (
            <div className="notebook-card">
                <div className="notebook-card-add">
                    <button type="button" className="btn btn-link"
                            onClick={() => this.addNoteCard()}>
                        <i className="fa fa-plus fa-4x" aria-hidden="true"></i>
                    </button>
                </div>
            </div>
        )
    }

    componentDidMount() {
        this.props.loadConnections();
    }

    addNoteCard() {
        if (this.props.connections.length === 0) {
            this.props.alertMessage('There is not any connections, please' +
                ' create a connection firstly.', 'warning');
        } else {
            this.props.onClick();
        }
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
        loadConnections: () => dispatch(loadConnections()),
        alertMessage: (msg, type) => dispatch(alertMessage(msg, type))
    };
}

// Connected Component
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(NoteCardAdd);