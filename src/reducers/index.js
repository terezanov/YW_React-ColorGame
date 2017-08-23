export default function (state, {type, payload}) {
    switch (type) {
        case 'OPEN_AUTH_POPUP':
            return {...state, popups: {...state.popups, isAuthVisible: true}};
            break;
        case 'OPEN_ERROR_POPUP':
            return {...state, popups: {...state.popups, isErrorVisible: true}};
            break;
        case 'CLOSE_AUTH_POPUP':
            return {...state, popups: {...state.popups, isAuthVisible: false}};
            break;
        case 'CLOSE_ERROR_POPUP':
            return {...state, popups: {...state.popups, isErrorVisible: false}};
            break;
        case 'CREDENTIALS_INPUT':
            return {...state, user: {...state.user, ...payload}};
            break;
        case 'CREDENTIALS_SEND':
            return state;
            break;
        case 'GAME_TICK':
            return {...state, engine: {...state.engine, time: state.engine.time + payload}};
            break;
    }
}