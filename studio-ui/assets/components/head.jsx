/*
 * Copyright 2017 HugeGraph Authors
 *
 * Licensed to the Apache Software Foundation (ASF) under one or more
 * contributor license agreements. See the NOTICE file distributed with this
 * work for additional information regarding copyright ownership. The ASF
 * licenses this file to You under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations
 * under the License.
 */

import '../vendors/bootstrap/css/bootstrap.min.css';
import '../css/main.css';
import React from 'react';
import {Navbar, Nav, NavDropdown, MenuItem} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {changeHeadMode} from './actions';
import {withRouter} from 'react-router-dom';

class Head extends React.Component {

    render() {
        return (
            <div>
                <Navbar inverse collapseOnSelect
                        fluid={this.props.headMode.fullScreen}>
                    <Navbar.Header>
                        <Navbar.Brand>
                            <Link to="/index">
                                <img src="../images/logo.png"/>
                            </Link>
                        </Navbar.Brand>
                        <Navbar.Toggle />
                    </Navbar.Header>
                    <Navbar.Collapse>
                        <Nav pullRight>
                            <NavDropdown eventKey={1}
                                         title="setting"
                                         id="head-nav-dropdown">
                                <MenuItem eventKey={1.1}>
                                    <Link to="/index">notebooks</Link>
                                </MenuItem>
                                <MenuItem divider/>
                                <MenuItem eventKey={1.2}>
                                    <Link to="/connections">connections</Link>
                                </MenuItem>
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </div>
        );
    }
}

// Map Redux state to component props
function mapStateToProps(state) {
    return {
        headMode: state.headMode
    };
}

// Map Redux actions to component props
function mapDispatchToProps(dispatch) {
    return {
        changeHeadMode: mode => dispatch(changeHeadMode(mode))
    };
}

// Connected Component
export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(Head));
