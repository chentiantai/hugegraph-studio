import React from 'react';


export default class NoteCardAdd extends React.Component {
    addNoteCard() {
        this.props.onClick();
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
}
