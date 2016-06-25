import {MENU_LOADING, MENU_LOADED} from '../actions/menuActions';

var defaultState = {
    status: 'NOT LOADED',
    data: null
};

export default function menu(state = defaultState, action) {
    switch (action.type) {
        case MENU_LOADING:
            return {
                status: 'LOADING',
                data: null
            };
        case MENU_LOADED:
            return {
                status: 'LOADED',
                data: action.data
            };
        default:
            return state
    }
}
