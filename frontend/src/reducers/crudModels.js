import keyBy from 'lodash/keyBy';
import pickBy from 'lodash/pickBy';

import {
    CRUD_ITEM_DELETED, CRUD_ITEM_UPDATED,
    CRUD_LIST_FETCHED,
    CRUD_READ_FETCHED
} from '../constants/actionTypes'

export default function (state = {}, action) {
    let newState = {};
    switch (action.type) {
        case CRUD_LIST_FETCHED:
            return {
                ...state,
                [action.payload.model] : {
                    ...state[action.payload.model], ...keyBy(action.payload.data.items, 'id')
                }
            };
        case CRUD_READ_FETCHED:
        case CRUD_ITEM_UPDATED:
            if (!state[action.payload.model])
                state = {...state, [action.payload.model] : {}};

            return {
                ...state,
                [action.payload.model]: {
                    ...state[action.payload.model],
                    [action.payload.data.id]: {
                        ...state[action.payload.model][action.payload.data.id],
                        ...action.payload.data
                    }

                }
            };
        case CRUD_ITEM_DELETED:
            newState = {};
            newState[action.payload.model] = pickBy(state[action.payload.model], (value, key) => {
                return parseInt(key, 10) !== parseInt(action.payload.id, 10)
            });

            return {
                ...state,
                ...newState
            };
        default:
            return state;
    }
}