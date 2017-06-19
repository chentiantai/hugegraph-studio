/**
 * @file Desciption:
 * @author huanghaiping(huanghaiping02@baidu.com)
 * Created on 17/6/12
 */
import React from 'react';
import NotebookItem from './notebookitem';
import {connect} from 'react-redux';
import {itemScreenMode} from './actions';

class NotebookBoard extends React.Component {
    constructor() {
        super();
        this.itemKey = [0, 1,3];
    }


    render() {
        let fullScreenItem = this.props.screenMode.itemKey;
        let fullScreen = this.props.screenMode.fullScreen;
        let display = fullScreen ? 'none' : 'block';
        let content = this.itemKey.map(i =>
            <div key={i}>
                <NotebookItem itemKey={i}
                              display={fullScreen ? fullScreenItem === i ? 'block' : 'none' : 'block'}/>
                <NoteBookItemAdd itemKey={i + '_add'} display={display}/>
            </div>
        );

        return (
            <div>
                {content}
            </div>
        );
    }
}


class NoteBookItemAdd extends React.Component {
    render() {
        return (
            <div className="container" style={{display: this.props.display}}>
                <div className="row card">
                    <div className="col-md-12 col-box card-add">
                        <div className="card-add-line"></div>
                        <div className="card-add-btn">
                            <div className="btn-group btn-group-sm" role="group">
                                <button type="button" className="btn btn-default">
                                    <i className="fa fa-plus" aria-hidden="true"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}


// Map Redux state to component props
function mapStateToProps(state) {
    return {
        screenMode: state.screenMode
    };
}

// Map Redux actions to component props
function mapDispatchToProps(dispatch) {
    return {
        itemScreenMode: (flag, itemKey) => dispatch(itemScreenMode(flag, itemKey))
    };
}

// Connected Component
export default  connect(
    mapStateToProps,
    mapDispatchToProps
)(NotebookBoard);
