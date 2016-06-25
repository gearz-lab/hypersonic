import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import user from './userReducer';
import menu from './menuReducer';
import model from './modelReducer';
import modal from './modalReducer';
import applicationDomain from './applicationDomainReducer';
import notification from './notificationReducer';
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
