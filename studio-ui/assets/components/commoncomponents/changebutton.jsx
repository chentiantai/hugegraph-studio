/**
 * @file Desciption:
 * @author huanghaiping(huanghaiping02@baidu.com)
 * Created on 17/6/19
 */
import React from 'react';

export default class ChangeButton extends React.Component {
    constructor() {
        super();
        this.state = {
            cssFlag: true
        }
    }

    onClick = () => {
        this.props.onClick(this.state.cssFlag);
        this.setState({cssFlag: !this.state.cssFlag});
    }

    render() {
        let cssMode = this.state.cssFlag ? this.props.defaultCss : this.props.changeCss;
        return (
            <button type="button" className="btn btn-link"
                    onClick={this.onClick}>
                <i className={cssMode} aria-hidden="true"></i>
            </button>
        );
    }
}