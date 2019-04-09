import map from 'lodash/map';
import uniq from 'lodash/uniq';
import keys from 'lodash/keys';

import {
    CRUD_ITEM_CREATED,
    CRUD_LIST_FETCHED,
    CRUD_LIST_INITIALIZE,
    CRUD_LIST_PARAM_SET,
    CRUD_LIST_START_FETCHING
} from '../constants/actionTypes'

const initialState = {
    loading : true,
    fetched : false,
    error : null,
    model : null,
    params : {
        page : 1,
        'per-page' : 20
    },
    items : [],
    totalItems : 0,
    totalPages : 0
};

export default function (state = {}, action) {
    let filteredKeys = [];
    switch (action.type) {
        case CRUD_LIST_INITIALIZE:
            return { ...state, [action.payload.id] : { ...initialState, ...{ model : action.payload.model, params: { ...initialState['params'], ...action['payload']['options'] } } } };
        case CRUD_LIST_START_FETCHING:
            return { ...state, [action.payload] : { ...state[action.payload], ...{ loading: true, fetched: false } } };
        case CRUD_LIST_FETCHED:
            return {
                ...state,
                [action.payload.id] : {
                    ...state[action.payload.id],
                    ...{
                        fetched : true,
                        loading : false,
                        items : uniq([...state[action.payload.id]['items'], ...map(action.payload.data.items, (item) => item.id)]),
                        params : {
                            ...state[action.payload.id]['params'],
                            ...{
                                page : action.payload.data['_meta']['currentPage'],
                                'per-page' : action.payload.data['_meta']['perPage']
                            }
                        },
                        totalPages : action.payload.data['_meta']['pageCount'],
                        totalItems : action.payload.data['_meta']['totalCount']
                    }
                }
            };
        case CRUD_LIST_PARAM_SET:
            return {
                ...state,
                [action.payload.id] : {
                    ...state[action.payload.id],
                    params : {
                        ...state[action.payload.id]['params'],
                        [action.payload.key] : action.payload.value
                    }
                }
            };
        case CRUD_ITEM_CREATED:
            filteredKeys = keys(state)
                .filter(key => state[key].model === action.payload.model);
            let newState = {};

            filteredKeys.forEach((key) => {
                newState[key] = { ...state[key], ...initialState};
            });

            return { ...state, ...newState};
        default:
            return state;
    }
}