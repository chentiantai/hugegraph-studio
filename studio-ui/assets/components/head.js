/**
 * @file Desciption:
 * @author huanghaiping(huanghaiping02@baidu.com)
 * Created on 17/5/31
 */

import '../vendors/bootstrap/css/bootstrap.min.css';
import '../css/main.css';
import React from 'react';
import {Navbar, Nav, NavDropdown, MenuItem} from 'react-bootstrap';
export default class Head extends React.Component {

    render() {
        let fluid = this.props.fluid === undefined ? false : this.props.fluid;
        return (
            <div>
                <Navbar inverse collapseOnSelect fluid={fluid}>
                    <Navbar.Header>
                        <Navbar.Brand>
                            <a href="#"><img src='../images/logo.png'/></a>
                        </Navbar.Brand>
                        <Navbar.Toggle />
                    </Navbar.Header>
                    <Navbar.Collapse>
                        <Nav pullRight>
                            <NavDropdown eventKey={1} title="setting" id="head-nav-dropdown">
                                <MenuItem eventKey={1.1} href="./index.html">notebooks</MenuItem>
                                <MenuItem divider/>
                                <MenuItem eventKey={1.2} href="./connections.html">connections</MenuItem>
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </div>
        );
    }
}






