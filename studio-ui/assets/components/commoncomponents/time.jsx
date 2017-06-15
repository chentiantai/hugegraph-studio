/**
 * @file Desciption:
 * @author huanghaiping(huanghaiping02@baidu.com)
 * Created on 17/6/15
 */

import React from 'react';
import Time from 'react-time';

export  default class TimeFormat extends React.Component {
    constructor() {
        super();
    }

    render() {
        let lastUsedTime = (this.props.timeFormat) * 1000;
        return (
            <div>
                <p><Time value={lastUsedTime} titleFormat="YYYY/MM/DD HH:mm"
                         relative/></p>
            </div>
        )
    }
}
