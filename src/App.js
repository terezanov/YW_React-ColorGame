// @flow
import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import Rx from 'rxjs';
import {BrowserRouter as Router, Link, Route} from 'react-router-dom';
import 'font-awesome/css/font-awesome.css';
import insertCss from 'insert-css';
import css from 're-bulma/build/css';
import {Tile, Content, Title, Subtitle, Nav, NavGroup, NavItem, NavToggle, Icon, Button} from 're-bulma';
import MainPage from './components/pages/main';
import Game from './components/pages/game';
import Records from './components/pages/records';
import Settings from './components/pages/settings';
import styles from './components/styles';
import AuthPopup from './components/auth_popup';
import ErrorPopup from './components/error_popup';
import reducer from './reducers/index';

try { if (typeof document !== 'undefined' || document !== null) insertCss(css, {prepend: true}); } catch (e) {}


window.eventBus$ = new Rx.Subject();


type Props = {}
type State = {
    user: {
        login: string,
        password: string
    },
    engine: {
        isStarted: boolean,
        time: number,
        level: number
    },
    popups: {
        isAuthVisible: boolean,
        isErrorVisible: boolean
    }
};

class App extends Component<Props, State> {

    state: State = {
        user: {
            login: '',
            password: ''
        },
        engine: {
            isStarted: false,
            time: 0,
            level: 0
        },
        popups: {
            isAuthVisible: false,
            isErrorVisible: false
        }
    };

    componentDidMount() {
        window.eventBus$
            .filter(({type}) => Boolean(type))
            .subscribe(action => {
                console.log(action);
                const newState = reducer(this.state, action);
                this.setState(newState);
            });
    }

    validate({login, password}) {
        const isTrue = v => typeof v === 'string' && v.trim() !== '';
        return isTrue(login) && isTrue(password);
    }

    render() {
        const isAuth = this.validate(this.state.user);
        const {isAuthVisible, isErrorVisible} = this.state.popups;
        const style = { background: '#eee', borderRadius: '5px', padding: '10px' };
        const GameWrapper = (props) => () => <Game {...props}/>;
        const Game1 = GameWrapper(this.state.engine);
        return (
            <Router>
                <Tile isVertical>
                    <Tile context="isParent">
                        <Tile context="isChild">
                            <Nav>
                                <NavToggle />
                                <NavGroup align="left">
                                    <NavItem>
                                        <Link to="/">Logo</Link>
                                    </NavItem>
                                </NavGroup>
                                <NavGroup align="center">
                                    <NavItem>
                                        {isAuth ?
                                            <Link to="/game" style={styles}>
                                                <Button color="isSuccess">Начать игру</Button>
                                            </Link> :
                                            <Button onClick={() => window.eventBus$.next({type: "OPEN_AUTH_POPUP"})}
                                                    color="isSuccess">
                                                Начать игру
                                            </Button>
                                        }
                                    </NavItem>
                                    <NavItem>
                                        <Link to="/records" style={styles}><Button color="isInfo">Таблица рекордов</Button></Link>
                                    </NavItem>
                                    <NavItem>
                                        <Link to="/settings" style={styles}><Button>Настройки</Button></Link>
                                    </NavItem>
                                </NavGroup>
                            </Nav>
                        </Tile>
                    </Tile>
                    <Tile context="isParent">
                        <Tile context="isChild" style={style}>
                            <Route exact path="/" component={MainPage}/>
                            <Route exact path="/game" component={Game1}/>
                            <Route exact path="/records" component={Records}/>
                            <Route exact path="/settings" component={Settings}/>
                        </Tile>
                    </Tile>
                    <Tile>
                        {isAuthVisible && <AuthPopup onCloseHandlerAuth={() => window.eventBus$.next({type: 'CLOSE_AUTH_POPUP'})}/>}
                        {isErrorVisible && <ErrorPopup message="Error" onCloseHandlerError={() => window.eventBus$.next({type: 'CLOSE_ERROR_POPUP'})}/>}
                    </Tile>
                </Tile>
            </Router>
        );
    }
}

export default App;

