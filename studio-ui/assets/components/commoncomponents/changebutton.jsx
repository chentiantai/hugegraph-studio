/**
 * @file Desciption:
 * @author huanghaiping(huanghaiping02@baidu.com)
 * Created on 17/6/19
 */
import React from 'react';

export default class ChangeButton extends React.Component {
    constructor() {
        super();
    }

    onClick = () => {
        this.props.onClick(!this.props.cssFlag);
    }

    render() {
        let cssMode = this.props.cssFlag ? this.props.trueCss : this.props.falseCss;
        return (
            <button type="button" className="btn btn-link"
                    onClick={this.onClick}>
                <i className={cssMode} aria-hidden="true"></i>
            </button>
        );
    }
}