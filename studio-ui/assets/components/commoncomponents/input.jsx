/**
 * @file Desciption:
 * @author huanghaiping(huanghaiping02@baidu.com)
 * Created on 17/6/7
 */
import React from 'react';


const COMMON = 'common';
const ERR = 'verificationFailed';

export  default class Input extends React.Component {
    constructor(props) {
        super(props);
        // status:The status of component ,including COMMON,ERR
        // isChange:The component has been operated
        // isValidateByForce:The component is triggered to validate by the another component
        this.state = {
            status: COMMON,
            message: '',
            value: '',
            isChange: false,
            isValidateByForce: false
        }
        this.handleChange = this.handleChange.bind(this);
        this.validateData = this.validateData.bind(this);

    }


    componentWillReceiveProps(nextProps) {
        if (nextProps.isValidateByForce === undefined) {
            this.state.isValidateByForce = false;
        } else {
            this.state.isValidateByForce = nextProps.isValidateByForce;
        }
        this.state.isChange = false;
        let value = nextProps.value;
        const validationResult = this.validateData(value);
        this.state.isValidateByForce = false;
        this.props.onChange(nextProps.name, value, validationResult.flag);
    }

    render() {
        let value = this.state.value;
        if (value === null || value === undefined) {
            value = '';
        }

        if (this.state.status === COMMON)
            return (
                <div className={this.props.className}>
                    <input type="text" className="form-control"
                           placeholder={this.props.placeholder}
                           name={this.props.name}
                           value={value} onChange={this.handleChange}/>
                </div>
            );
        else
            return (
                <div className={this.props.className}>
                    <input type="text" className="form-control has-error"
                           placeholder={this.props.placeholder}
                           name={this.props.name}
                           value={value} onChange={this.handleChange}/>
                    <div className="form-err-message">{this.state.message}</div>
                </div>
            );
    }


    handleChange(event) {
        this.state.isChange = true;
        let value = event.target.value;
        let name = event.target.name;
        const validationResult = this.validateData(value);
        this.props.onChange(name, value, validationResult.flag);
    }

    validateData(value) {
        const validator = this.props.validator;
        let validation = {};
        if (validator !== undefined) {
            if (this.props.message !== undefined) {
                validation = validator(value, this.props.message);
            } else {
                validation = validator(value);
            }
        } else {
            validation = {flag: true};
        }

        if (validation.flag) {
            this.setState({status: COMMON, value: value});
        } else {
            if (this.state.isValidateByForce) {
                this.setState({
                    status: ERR,
                    message: validation.message,
                    value: value
                });
            } else {
                if (!this.state.isChange)
                    this.setState({
                        status: COMMON,
                        message: validation.message,
                        value: value
                    });
                else
                    this.setState({
                        status: ERR,
                        message: validation.message,
                        value: value
                    });
            }
        }
        return validation;
    }

}
