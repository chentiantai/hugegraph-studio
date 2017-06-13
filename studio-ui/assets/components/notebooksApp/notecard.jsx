import React from 'react'

class NoteCard extends React.Component {

    del = e => {
        let event = {
            domEvent: e,
            type: 'remove',
            eventKey: this.props.eventKey
        }

        this.props.changeList(event)
    }

    render() {
        return (
            <div className="notebook-card">
                <div className="notebook-card-info">

                    <div>
                        <div className="notebook-card-close">
                            <button type="button" className="btn btn-link"
                                    onClick={this.del}>
                                <i className="fa fa-times"
                                   aria-hidden="true"></i>
                            </button>
                        </div>
                        <div className="notebook-card-title">
                            Title:Welcome to a b c d HugeGraph!
                        </div>
                    </div>
                    <div className="notebook-card-description">
                        Description:HugeGraph focos on bigdata analyse.
                    </div>
                </div>

                <div className="notebook-card-control">

                    <div className="notebook-card-createtime">
                        1 day ago
                    </div>

                    <div className="notebook-card-operation">
                        <button type="button" className="btn btn-link"
                                data-toggle="modal"
                                data-target="#notebookCardModal">
                    <span>
                        <i className="fa fa-pencil-square-o"
                           aria-hidden="true"></i>
                    </span>
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}

export default NoteCard