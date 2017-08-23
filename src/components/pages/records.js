// @flow
import React, {Component} from 'react';
import {Tile, Content} from 're-bulma';

type Props = {};
type State = {};

export default class Records extends Component<Props, State> {
    props: Props;
    state: State;

    render() {
        return (
            <Tile>
                <Content>
                    Records
                </Content>
            </Tile>
        );
    }
}