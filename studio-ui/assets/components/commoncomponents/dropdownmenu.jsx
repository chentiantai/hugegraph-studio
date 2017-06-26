/**
 * @file Desciption:
 * @author huanghaiping(huanghaiping02@baidu.com)
 * Created on 17/6/15
 */

import React from 'react';
import {Nav, NavDropdown, MenuItem} from 'react-bootstrap';

export default class DropDownMenu extends React.Component {
    constructor() {
        super();
        this.state = {
            selectMenu: ''
        };
    }


    componentDidMount() {
        if (this.props.menuItems !== undefined && this.props.menuItems.length > 0) {
            this.setState({selectMenu: this.props.menuItems[0]});
        } else {
            this.setState({selectMenu: ''});
        }
    }

    handleSelect = (eventKey) => {
        this.setState({selectMenu: `${eventKey}`});
        this.props.onChange(`${eventKey}`);
    }

    render() {
        let menuItems = this.props.menuItems.map((item, index) =>
            <MenuItem key={index} eventKey={item}>{item}</MenuItem>
        );


        return (
            <Nav bsStyle="pills" onSelect={this.handleSelect}>
                <NavDropdown title={this.state.selectMenu} id={'dropdown_menu_'+this.props.id}>
                    {menuItems}
                </NavDropdown>
            </Nav>
        );
    }
}
