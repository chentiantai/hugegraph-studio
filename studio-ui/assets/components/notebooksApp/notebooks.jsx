/**
 * @file Desciption:
 * @author liunanke(liunanke@baidu.com)
 * Created on 17/5/31
 */

import React from 'react'
import NoteCardAdd from './notecardadd'
import NoteCard from "./notecard";

class Notebooks extends React.Component {
    constructor(props) {
        super(...arguments);
        this.state = {};
    }

    render() {

        return (
            <div>
                <NoteCardAdd />
            </div>
        )
    }
}

export default Notebooks;