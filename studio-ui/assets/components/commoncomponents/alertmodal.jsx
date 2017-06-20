/**
 * @file Desciption:
 * @author huanghaiping(huanghaiping02@baidu.com)
 * Created on 17/6/9
 */
import React from 'react';
import Modal from './modal';

export default class AlertModal extends React.Component {
    render() {
        return (
            <Modal isOpen={true}>
                <div className="modal-header">
                    <button type="button" className="close" data-dismiss="modal"
                            aria-label="Close"
                            onClick={() => this.props.cancel()}><span
                        aria-hidden="true">&times;</span></button>
                    <div className="alert-message">
                        <h4 className="modal-title">{this.props.message}</h4>
                    </div>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-default"
                            data-dismiss="modal"
                            onClick={() => this.props.cancel()}>Cancel
                    </button>
                    <button type="button" className="btn btn-primary"
                            onClick={(id) => this.props.confirm(id)}>Yes
                    </button>
                </div>
            </Modal>
        )
    }
}