/**
 * @file Desciption:
 * @author huanghaiping(huanghaiping02@baidu.com)
 * Created on 17/6/14
 */

import React from 'react';

export  default class Select extends React.Component {
    constructor() {
        super();
        this.state = {value: ''};
        this.handleSelectChange = this.handleSelectChange.bind(this);
    }

    handleSelectChange(event){
        this.setState({value: event.target.value});
        this.props.onChange(event.target.name,event.target.value);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({value: nextProps.value});
        this.props.onChange(nextProps.name,nextProps.value);
    }

    render() {
        return (
            <div className={this.props.className}>
                <select type="text" className="form-control"
                        name={this.props.name}
                        value={this.state.value}
                        onChange={this.handleSelectChange}>
                    {
                        this.props.options
                    }
                </select>
            </div>
        );
    }
}