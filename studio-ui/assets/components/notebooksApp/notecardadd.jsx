import React from 'react';


class NoteCardAdd extends React.Component {

    add = e => {
        let event = {
            domEvent: e,
            type: 'add',
            item: '123',
        }
        this.props.changeList(event)
    }

    render() {
        return (
            <div className="notebook-card">

                <div className="notebook-card-add">
                    <button type="button" className="btn btn-link"
                            onClick={this.add}>
                        <i className="fa fa-plus fa-4x" aria-hidden="true"></i>
                    </button>
                </div>
            </div>
        )
    }
}

export default NoteCardAdd