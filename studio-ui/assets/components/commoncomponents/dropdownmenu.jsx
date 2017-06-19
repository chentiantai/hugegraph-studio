/**
 * @file Desciption:
 * @author huanghaiping(huanghaiping02@baidu.com)
 * Created on 17/6/15
 */

import React from 'react';

export default class DropDownMenu extends React.Component {
    constructor() {
        super();
        this.state = {
            selectMenu: ''
        };
    }

    handleClick(item) {
        this.setState({selectMenu: item});
        this.props.onChange(item);
    }

    componentDidMount() {
        if (this.props.menuItems !== undefined && this.props.menuItems.length > 0) {
            this.setState({selectMenu: this.props.menuItems[0]});
        } else {
            this.setState({selectMenu: ''});
        }
    }

    render() {
        return (
            <ul className="nav nav-pills drop-down-menu">
                <li role="presentation" className="dropdown">
                    <a className="dropdown-toggle" data-toggle="dropdown" href="#" role="button" aria-haspopup="true"
                       aria-expanded="false">
                        {this.state.selectMenu}
                        <span className="caret"></span>
                    </a>
                    <ul className="dropdown-menu">
                        {
                            this.props.menuItems.map((item, index) =>
                                <li key={index} onClick={() => this.handleClick(item)}><a>{item}</a></li>)
                        }
                    </ul>
                </li>
            </ul>
        );
    }
}