import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form'

import auth from './auth';
import app from './app';
import crudList from './crudList';
import crudModels from './crudModels';


export default combineReducers({
    app,
    auth,
    crudList : crudList,
    crudModels : crudModels,
    form : formReducer
});