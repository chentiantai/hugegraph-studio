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
        this.state = {
            itemKeys: [0]
        }
    }


    render() {
        console.log(this.state.itemKeys);
        let fullScreenItem = this.props.screenMode.itemKey;
        let fullScreen = this.props.screenMode.fullScreen;
        let addDisplay = fullScreen ? 'none' : 'block';
        return (
            <div>
                {
                    this.state.itemKeys.map(i =>
                        <div key={i}>
                            <NotebookItem itemKey={i}
                                          display={fullScreen ? fullScreenItem === i ? 'block' : 'none' : 'block'}/>
                            <NoteBookItemAdd itemKey={i} display={addDisplay}
                                             onClick={this.addItem}/>
                        </div>)
                }
            </div>
        );
    }

    addItem = (itemKey) => {
        let newItemKeys = [];
        this.state.itemKeys.forEach(i => {
                if (i === itemKey) {
                    newItemKeys.push(i);
                    newItemKeys.push(this.state.itemKeys.length);
                } else {
                    newItemKeys.push(i);
                }
            }
        );
        this.setState({
            itemKeys: newItemKeys
        });
    }
}


class NoteBookItemAdd extends React.Component {
    onClick = () => {
        this.props.onClick(this.props.itemKey);
    }

    render() {
        return (
            <div className="container" style={{display: this.props.display}}>
                <div className="row">
                    <div className="col-md-12 col-box card-add">
                        <div className="card-add-line"></div>
                        <div className="card-add-btn">
                            <div className="btn-group btn-group-sm"
                                 role="group">
                                <button type="button"
                                        className="btn btn-default"
                                        onClick={this.onClick}>
                                    <i className="fa fa-plus"
                                       aria-hidden="true"></i>
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
