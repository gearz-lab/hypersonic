import {MENU_LOADING, MENU_LOADED} from '../actions/menu';

export default function menu(state = {}, action) {
    switch (action.type) {
        case MENU_LOADING:
            return {
                status: 'LOADING',
                data: null
            };
        case MENU_LOADED:
            return {
                status: 'LOADED',
                data: action.menu
            }
        default:
            return state
    }
}
