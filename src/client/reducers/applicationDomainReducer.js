import {APPLICATION_DOMAIN_LOADING, APPLICATION_DOMAIN_LOADED} from '../actions/applicationDomainActions';

var defaultState = {
    status: 'NOT LOADED',
    data: null
};

export default function menu(state = defaultState, action) {
    switch (action.type) {
        case APPLICATION_DOMAIN_LOADING:
            return {
                status: 'LOADING',
                data: null
            };
        case APPLICATION_DOMAIN_LOADED:
            return {
                status: 'LOADED',
                data: action.data
            };
        default:
            return state
    }
}
