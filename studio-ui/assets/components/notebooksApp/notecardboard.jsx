/**
 * @file Desciption:
 * @author huanghaiping(huanghaiping02@baidu.com)
 * Created on 17/6/14
 */

import React from 'react';
import NoteCardAdd from './notecardadd';
import AlertList from './alertlist';
import NoteCard from './notecard';
import {connect} from 'react-redux';
import {loadNoteCards} from './actions';
import NoteCardModal from './notecardmodal';

class NoteCardBoard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            addTimes: 0,
            noteCard: {
                id: '',
                name: '',
                connectionName: '',
                connectionId: ''
            },
            operation: 'add'
        }
    }

    addNoteCard() {
        this.setState({
            title: 'add notebook',
            isOpen: true,
            addTimes: this.state.addTimes + 1,
            noteCard: {
                id: '',
                name: '',
                connectionId: ''
            },
            operation: 'add'
        });
    }

    updateNoteCard = noteCard => {
        this.setState({
            title: 'update notebook',
            isOpen: true,
            addTimes: this.state.addTimes + 1,
            noteCard: {
                id: noteCard.id,
                name: noteCard.name,
                connectionId: noteCard.connectionId
            },
            operation: 'update'
        });
    }

    render() {
        const noteCards = this.props.noteCards;
        return (
            <div className="container">

                <div className="row">
                    <AlertList/>
                </div>
                <div className="row">
                    <div className="notebook-cards">
                        <NoteCardAdd onClick={() => this.addNoteCard()}/>
                        {
                            noteCards.map(noteCard =>
                                <NoteCard key={noteCard.id}
                                          value={noteCard}
                                          onUpdate={this.updateNoteCard}/>)
                        }
                    </div>
                </div>
                <NoteCardModal noteCard={this.state.noteCard}
                               addTime={this.state.addTimes}
                               isOpen={this.state.isOpen}
                               operation={this.state.operation}
                               title={this.state.title}/>
            </div>
        );
    }

    componentDidMount() {
        this.props.loadNoteCards();
    }


}


// Map Redux state to component props
function mapStateToProps(state) {
    return {
        noteCards: state.noteCards
    };
}

// Map Redux actions to component props
function mapDispatchToProps(dispatch) {
    return {
        loadNoteCards: () => dispatch(loadNoteCards())
    };
}

// Connected Component
export default  connect(
    mapStateToProps,
    mapDispatchToProps
)(NoteCardBoard);


