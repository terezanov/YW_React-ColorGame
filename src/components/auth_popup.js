import React, {Component} from 'react';
import Rx from 'rxjs';
import {Modal, Content, Input, Button} from 're-bulma';

export default class AuthPopup extends Component {

    componentDidMount() {
        const login$ = Rx.Observable
            .fromEvent(document.querySelector('.login > input'), 'input')
            .pluck("target", "value");

        const password$ = Rx.Observable
            .fromEvent(document.querySelector('.password > input'), 'input')
            .pluck("target", "value");

        Rx.Observable
            .combineLatest(login$, password$)
            .subscribe(data => {
                const [login, password] = data;
                window.eventBus$.next({type: 'CREDENTIALS_INPUT', payload: {login, password}});
            });
    }

    render() {
        const {onCloseHandlerAuth} = this.props;
        return (
            <Modal type="card" headerContent="Authorization" onCloseRequest={onCloseHandlerAuth} isActive={true}>
                <Content>
                    <Input className="login" hasIcon={true} icon="fa fa-user-o" type="text" placeholder="Login" size="isMedium"/>
                    <Input className="password" hasIcon={true} icon="fa fa-unlock" type="text" placeholder="Password" size="isMedium"/>
                    <Button color="isSuccess" onClick={() => window.eventBus$.next({type: 'CREDENTIALS_SEND'})}>Sign in</Button>
                </Content>
            </Modal>
        );
    }
}
