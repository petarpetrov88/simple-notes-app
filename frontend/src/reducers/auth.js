import {
    AUTH_AUTHENTICATE,
    AUTH_LOGOUT
} from '../constants/actionTypes';

const initialState = {
    authenticated: false
}

export default (state = initialState, action) => {
    switch (action.type) {
        case AUTH_AUTHENTICATE:
            return {...state, authenticated: true};
        case AUTH_LOGOUT:
            return {...state, authenticated: false};
        default:
            return state;
    }
}
