import React from 'react'
import NoteCardAdd from './notecardadd'
import NoteCard from "./notecard";

class Container extends React.Component {
    constructor (props) {
        super(...arguments);
        this.state = {
            list: []
        };
    }

    changeList = e => {
        const list = this.state.list.concat()
        if (e.type === 'add') {
            list.push(e.item)
        }

        this.setState({ list })
    }


    render () {
    const { list } = this.state
        
        return (
            <div>
                <NoteCardAdd changeList={this.changeList}/>
                {list.map((item, i) => <NoteCard key={i} />)}
            </div>
        )
    }
}

export default Container;