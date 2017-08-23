// @flow
import React, {Component} from 'react';
import Rx from 'rxjs';
import {Tile, Content, Progress, Container, Section} from 're-bulma';

type Props = {
    isStarted: boolean,
    time: number,
    level: number
};

type State = {
    time: number,
    fullTime: number
};

const Timer = ({time}) => <Progress className="time-progress" value={time} max="100" style={{transition: 'width .3s ease'}} />;


export default class Game extends Component<Props, State> {
    props: Props;
    state: State = {
        time: 0,
        fullTime: 100 //sec
    };
    interval$: any;

    componentDidMount() {
        this.interval$ = Rx.Observable.interval(1000)
            .mapTo(1)
            .subscribe(tick => {
                console.log(tick);
                if(this.state.time > this.state.fullTime) {
                    this.interval$.unsubscribe();
                }
                this.setState({time: this.state.time + 1});
            });
    }

    componentWillUnmount() {
        this.interval$.unsubscribe();
    }

    render() {
        return (
            <Container>
                <Section>
                    <Timer time={this.state.time} />
                    <div style={{textAlign: 'center'}}>{this.state.time}</div>
                </Section>
            </Container>
        );
    }
}