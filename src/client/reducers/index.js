import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import user from './user';
import menu from './menu';
import entity from './entity';

const rootReducer = combineReducers({
    routing,
    user,
    menu,
    entity
});

export default rootReducer;
