/**
 * @file Desciption:
 * @author huanghaiping(huanghaiping02@baidu.com)
 * Created on 17/6/29
 */

import React from 'react';

export class TabsPage extends React.Component {
    constructor() {
        super();
        this.state = {
            selectedTabKey: 1
        }
    }

    selectTab = tabKey => {
        this.setState({
            selectedTabKey: tabKey
        });
    }

    componentWillMount(){
        this.state.selectedTabKey=this.props.defaultTabkey;
    }

    render() {
        let selectedTabKey = this.state.selectedTabKey;
        return (
            <div className="card-content-toolbox btn-toolbar">
                {React.cloneElement(this.props.children[0], {onSelect: this.selectTab})}
                <div style={{clear: 'both'}}></div>
                {React.cloneElement(this.props.children[1], {selectedTabKey: selectedTabKey})}
            </div>
        );
    }


}

export class Tabs extends React.Component {
    selectTab = tabKey => {
        this.props.onSelect(tabKey);
    }

    render() {
        return (
            <div className="btn-group btn-group-sm" role="group">
                {this.props.children.map((child, i) =>
                    React.cloneElement(child, {
                        key: i,
                        onClick: this.selectTab
                    }))}
            </div>
        );
    }
}


export class Tab extends React.Component {
    onClick = () => {
        this.props.onClick(this.props.tabKey);
    }

    render() {
        return (
            <button type="button" className={this.props.btClassName}
                    onClick={this.onClick}>
                <i className={this.props.iClassName} aria-hidden="true"></i>
            </button>
        );
    }
}


export class TabContents extends React.Component {
    render() {
        return (
            <div className="tab-content">
                {
                    this.props.children.filter(child => child.props.tabKey === this.props.selectedTabKey)
                }
            </div>
        );
    }
}

export class TabContent extends React.Component {
    render() {
        return (
            <div>
                {this.props.children}
            </div>
        );
    }
}




