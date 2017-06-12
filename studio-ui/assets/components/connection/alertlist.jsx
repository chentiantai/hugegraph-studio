/**
 * @file Desciption:
 * @author huanghaiping(huanghaiping02@baidu.com)
 * Created on 17/6/12
 */

import React from 'react';
import {Alert} from 'react-bootstrap';
import { connect } from 'react-redux';
import { hideAllAlert, alertHide } from './actions';

class AlertList extends React.Component {
    constructor() {
        super();
    }


    componentDidMount() {
        this.props.hideAllAlert();
    }

    render() {
        return(
            <div>
                {this.props.alerts.items.map((item, i) => (
                    <Alert
                        key={i}
                        bsStyle={item.messageType}
                        onDismiss={() => this.props.alertHide(item.key)}
                    >
                        {item.messageText}
                    </Alert>
                ))}
            </div>
        );
    }
}



// Map Redux state to component props
function mapStateToProps(state) {
    return {
        alerts: state.alerts
    };
}

// Map Redux actions to component props
function mapDispatchToProps(dispatch) {
    return {
        alertHide: key => dispatch(alertHide(key)),
        hideAllAlert:() => dispatch(hideAllAlert())
    };
}

// Connected Component
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AlertList);