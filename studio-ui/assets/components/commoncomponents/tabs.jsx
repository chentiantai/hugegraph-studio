/**
 * @file Desciption:
 * @author huanghaiping(huanghaiping02@baidu.com)
 * Created on 17/7/19
 */
import React from 'react';

export class Tabs extends React.Component {

    constructor() {
        super();
        this.state = {
            tabs: []
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({tabs: nextProps.tabs});
    }


    render() {
        return (
            <div>
                <div className="react-tabs">
                    <ul className="nav nav-pills">
                        {this.state.tabs.map((tab,index) => {
                                if (tab.isActive)
                                    return <li className="active" key={index}>
                                        <a onClick={() => this.onClick(tab.type)}>
                                            <i className={tab.label}
                                               aria-hidden="true"></i></a>
                                    </li>
                                else
                                    return <li key={index}>
                                        <a onClick={() => this.onClick(tab.type)}>
                                            <i className={tab.label}
                                               aria-hidden="true"></i></a>
                                    </li>
                            }
                        )}

                    </ul>
                </div>
                <div className="tab-content">
                    {this.props.children.map((child, index) => {
                        let tabPane = null;
                        let curTab = this.state.tabs[index];
                        if (curTab.isActive) {
                            tabPane =
                                <div key={index} className="show">
                                    {child}
                                </div>
                        } else {
                            if (curTab.exist) {
                                tabPane =
                                    <div key={index}
                                         className="hidden">
                                        {child}
                                    </div>
                            } else {
                                tabPane = null;
                            }
                        }
                        return tabPane;
                    })}
                </div>
            </div>
        );
    }

    componentDidMount() {
        this.setState({tabs: this.props.tabs});
    }


    onClick = (type) => {
        let tabs = this.state.tabs.map(tab => {
            if (tab.type === type) {
                tab.isActive = true;
                tab.exist = true;
            }
            else {
                tab.isActive = false;
            }
            return tab;
        })
        this.setState({tabs: tabs});
    }
}

export class TabPane extends React.Component {
    render() {
        return (
            <div>
                {this.props.children}
            </div>
        );
    }
}