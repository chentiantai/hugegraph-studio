import React from 'react';
import {openEditModal} from './actions';
import {NotebooksModalApp} from './notebooksmodal';
import {connect} from 'react-redux';


class NoteCardAdd extends React.Component {
    addNotebook() {

        let notebooks = {
            id: '',
            name: '',
            connectionName: ''
        };
        let operation = 'add';
        let title = 'Add notebook';
        this.props.openEditModal(notebooks, operation, title);
    }


    render() {
        return (
            <div className="notebook-card">

                <div className="notebook-card-add">
                    <button type="button" className="btn btn-link"
                            onClick={() => this.addNotebook()}>
                        <i className="fa fa-plus fa-4x" aria-hidden="true"></i>
                    </button>
                    <NotebooksModalApp/>
                </div>
            </div>
        )
    }


}

// Map Redux state to component props
function mapStateToProps(state) {
    return {
        notebooks: state.notebooks
    };
}

// Map Redux actions to component props
function mapDispatchToProps(dispatch) {
    return {
        deleteNotebooks: id => dispatch(deleteNotebooks(id)),
        showNotebooks: notebooks => dispatch(showNotebooks(notebooks)),
        openEditModal: (notebooks, operation, title) => dispatch(openEditModal(notebooks, operation, title)),
        getConnectionName: () => dispatch(getConnectionName())

    };
}

// Connected Component
export const NotebooksCardAddApp = connect(
    mapStateToProps,
    mapDispatchToProps
)(NoteCardAdd);

//export default NoteCardAdd