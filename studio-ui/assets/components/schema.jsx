/**
 * @file Desciption
 * @author liunanke(liunanke@baidu.com)
 * Created on 2017/6/1.
 */
import React from 'react';

export default class Schema extends React.Component {


    render() {
        return (
            <div>
                {JSON.stringify(this.props.notebook.connection)}
            </div>
        );
    }


}
