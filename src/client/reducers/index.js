import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import user from './user';
import menu from './menu';
import model from './model';
import modal from './modal';
import applicationDomain from './applicationDomain';
import notification from './notification';
import { reducer as formReducer } from 'redux-form';

const rootReducer = combineReducers({
    routing,
    applicationDomain,
    user,
    menu,
    model,
    notification,
    modal,
    form: formReducer
});

export default rootReducer;
