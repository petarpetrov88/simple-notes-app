import Communicator from '../utils/Communicator';

import {
    AUTH_AUTHENTICATE,
    AUTH_LOGOUT,
    APP_START_LOADING,
    APP_FINISH_LOADING
} from '../constants/actionTypes'

import Session from '../utils/Session'

import { handleCommunicationErrors } from './app'

export const login = async (data, dispatch) => {
    try {
        const result = await Communicator.post('auth/login', data);

        Session.set('jwt', result.jwt);
        dispatch({ type: AUTH_AUTHENTICATE });

    } catch (error) {
        handleCommunicationErrors(error, dispatch);
    }
};

export const signup = async (data, dispatch) => {
    try {
        const result = await Communicator.post('auth/signup', data);
        Session.set('jwt', result.jwt);
        dispatch({ type: AUTH_AUTHENTICATE });
    } catch (error) {
        handleCommunicationErrors(error, dispatch);
    }
};

export const authenticate = () => async (dispatch) => {
    dispatch({ type: APP_START_LOADING });

    try {
        const result = await Communicator.get('auth');

        if (result)
            dispatch({ type: AUTH_AUTHENTICATE });

    } catch (error) {
        if (error.status === 401) {
            Session.delete('jwt');
            dispatch({ type: AUTH_LOGOUT });
        }
    }

    dispatch({ type: APP_FINISH_LOADING });
};