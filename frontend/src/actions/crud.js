import md5 from 'md5'

import Communicator from '../utils/Communicator';
import sortObjectKeys from '../utils/sortObjectKeys';

import { handleCommunicationErrors } from './app'

import {
    CRUD_LIST_START_FETCHING,
    CRUD_LIST_INITIALIZE,
    CRUD_LIST_FETCHED,
    CRUD_LIST_PARAM_SET,
    CRUD_ITEM_CREATED,
    CRUD_ITEM_DELETED,
    CRUD_ITEM_UPDATED,
    CRUD_READ_START_FETCHING,
    CRUD_READ_FETCHED
} from '../constants/actionTypes'


export const initialize = (id, model, options) => dispatch => {
    dispatch({ type: CRUD_LIST_INITIALIZE, payload: { id, model, options } });
};

export const setParam = (id, key, value) => dispatch => {
    dispatch({ type: CRUD_LIST_PARAM_SET, payload: { id, key, value } });
};

export const generateId = ({ model, options }) => {
    return md5(model + '_' + JSON.stringify(sortObjectKeys(options)));
};

export const list = (id, model, params) => async (dispatch) => {
    dispatch({ type: CRUD_LIST_START_FETCHING, payload: id });
    try {
        const result = await Communicator.get(model, params);
        dispatch({ type: CRUD_LIST_FETCHED, payload : { id, model, data: result } });
    } catch (error) {
        handleCommunicationErrors(error, dispatch)
    }
};

export const get = (id, model) => async (dispatch) => {
    dispatch({ type: CRUD_READ_START_FETCHING });
    try {
        const result = await Communicator.get(model + '/' + id);
        dispatch({ type: CRUD_READ_FETCHED, payload : { model, data: result } });
    } catch (error) {
        handleCommunicationErrors(error, dispatch)
    }
};

export const update = async (id, model, data, dispatch) => {
    try {
        const result = await Communicator.put('/' + model + '/' + id, data);
        if (result)
            dispatch({ type : CRUD_ITEM_UPDATED, payload : { model, data: result } });
    } catch (error) {
        handleCommunicationErrors(error, dispatch)
    }
};

export const create = async (model, data, dispatch) => {
    try {
        const result = await Communicator.post('/' + model, data);
        if (result)
            dispatch({ type : CRUD_ITEM_CREATED, payload : { model } });
    } catch (error) {
        handleCommunicationErrors(error, dispatch)
    }
};

export const del = (id, model) => async (dispatch) => {
    try {
        await Communicator.delete(model + '/' + id)
        dispatch({ type : CRUD_ITEM_DELETED, payload : { model, id } });
    } catch (error) {
        handleCommunicationErrors(error, dispatch)
    }
};