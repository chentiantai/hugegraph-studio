/**
 * @file Desciption:
 * @author huanghaiping(huanghaiping02@baidu.com)
 * Created on 17/7/31
 */

import React from 'react';

export default class CardFooter extends React.Component {
    constructor() {
        super();
    }

    render() {
        return (
            <div>
                {this.showFooter()}
            </div>
        );
    }


    showFooter = () => {
        if (this.props.result !== null) {
            if (this.props.result.duration != null && this.isConsistent()) {
                return (
                    <div>
                        Real-time Success.
                        Duration {this.props.result.duration * 1.0 / 1000} s
                    </div>
                );
            } else {
                return <div/>;
            }
        } else {
            return <div/>
        }
    }

    isConsistent = () => {
        let flag = false;
        if (this.props.language === 'markdown') {
            if (this.props.result.type === 'MARKDOWN') {
                flag = true;
            } else {
                flag = false;
            }
        } else if (this.props.language === 'gremlin') {
            if (this.props.result.type !== 'MARKDOWN') {
                flag = true;
            } else {
                flag = false;
            }
        } else {
            flag = false;
        }

        return flag;
    }

}