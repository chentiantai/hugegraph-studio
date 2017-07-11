/**
 * @file Desciption:
 * @author huanghaiping(huanghaiping02@baidu.com)
 * Created on 17/6/30
 */


import React from 'react';

export default class LoadPanel extends React.Component {
    constructor() {
        super();
    }

    render() {
        console.log("LoadPanel render");
        let loadingDisplay = this.props.loading ? "block" : "none";
        console.log(loadingDisplay);

        return (
            <div ref={el => this.progressWrapper = el}
                 className="progress-wrapper"
                 style={{display: loadingDisplay}}>
                <img style={{width: "80px", height: "80px"}}
                     src='/images/spinner.gif'/>
            </div>
        );
    }

    componentDidUpdate() {
        let loadingDisplay = this.props.loading ? "block" : "none";
        console.log("LoadPanel componentDidUpdate");
        this.progressWrapper.style.display=loadingDisplay;
        console.log("LoadPanel componentDidUpdate setting");

    }

    componentDidMount() {
        console.log("LoadPanel componentDidMount");
    }

}

