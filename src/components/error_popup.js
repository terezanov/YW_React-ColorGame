// @flow
import React, {Component} from 'react';
import {Modal, Content} from 're-bulma';

type Props = {
    message: string,
    onCloseHandlerError: Function
};

export default class ErrorPopup extends Component<Props> {
    props: Props;

    render() {
        return (
            <Modal type="card" headerContent="Произошла ошибка" onCloseRequest={this.props.onCloseHandlerError} isActive={true}>
                <Content>{this.props.message}</Content>
            </Modal>
        );
    }
}