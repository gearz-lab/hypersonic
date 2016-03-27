import {USER_LOADING, USER_LOADED} from '../actions/user';

export default function user(state = {}, action) {
    switch (action.type) {
        case USER_LOADING:
            return {
                status: 'LOADING',
                data: null
            };
        case USER_LOADED:
            return {
                status: 'LOADED',
                data: action.user
            };
        default:
            return state
    }
}
