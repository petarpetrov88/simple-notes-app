import {
    APP_START_LOADING,
    APP_FINISH_LOADING,
    APP_MESSAGE,
    APP_MESSAGE_DISMISS
} from '../constants/actionTypes'

const initialState = {
    loading : false,
    message: null
};

export default (state = initialState, action) => {
    switch (action.type) {
        case APP_START_LOADING:
            return { ...state, loading: true };
        case APP_FINISH_LOADING:
            return { ...state, loading: false };
        case APP_MESSAGE:
            return { ...state, message: action.payload };
        case APP_MESSAGE_DISMISS:
            return { ...state, message: null };
        default:
            return state;
    }
};