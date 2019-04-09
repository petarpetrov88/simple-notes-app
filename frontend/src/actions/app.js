import {
    APP_MESSAGE,
    APP_MESSAGE_DISMISS
} from '../constants/actionTypes'
import * as appMessages from '../constants/appMessages';
import { SubmissionError } from 'redux-form'

export const handleCommunicationErrors = (error, dispatch) => {
    if (error.status && error.status < 500) {
        switch (error.status) {
            case 401:
                showMessage(appMessages.unAuthorized)(dispatch);
                break;
            case 403:
                showMessage(appMessages.forbidden)(dispatch);
                break;
            case 404:
                showMessage(appMessages.notFound)(dispatch);
                break;
            case 422:
                throw new SubmissionError(JSON.parse(error.message));
            default:
                showMessage(appMessages.unknown)(dispatch);
        }
    } else if (error.status && error.status >= 500) {
        showMessage(appMessages.serverError)(dispatch);

    }
};

export const dismissMessage = () => dispatch => {
    dispatch({ type : APP_MESSAGE_DISMISS });
};

export const showMessage = ({ type, text }) => dispatch => {
    dispatch({ type : APP_MESSAGE, payload : { type, text } });
};