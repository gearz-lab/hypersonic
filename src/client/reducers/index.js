import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import user from './user';
import menu from './menu';
import model from './model';
import applicationDomain from './applicationDomain';

const rootReducer = combineReducers({
    routing,
    applicationDomain,
    user,
    menu,
    model
});

export default rootReducer;
