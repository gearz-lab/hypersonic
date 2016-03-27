import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import user from './user';
import menu from './menu';
import entity from './entity';
import applicationDomain from './applicationDomain';

const rootReducer = combineReducers({
    routing,
    applicationDomain,
    user,
    menu,
    entity
});

export default rootReducer;
