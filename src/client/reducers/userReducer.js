import {USER_LOADING, USER_LOADED} from '../actions/userActions';

var defaultState = {
    status: 'NOT LOADED',
    data: null
};

export default function user(state = defaultState, action) {
    switch (action.type) {
        case USER_LOADING:
            return {
                status: 'LOADING',
                data: null
            };
        case USER_LOADED:
            return {
                status: 'LOADED',
                data: action.data
            };
        default:
            return state
    }
}
