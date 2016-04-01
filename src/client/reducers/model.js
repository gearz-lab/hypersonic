import {LOCATION_CHANGE} from 'react-router-redux';
import clone from 'clone';
import {
    MODEL_SAVING,
    MODEL_SAVED,
    MODEL_SAVE_ERROR,
    MODEL_LOADING,
    MODEL_LOADED,
    MODEL_LOAD_ERROR,
    MODEL_CHANGE_SEARCH_CRITERIA
} from '../actions/model';

var defaultState = {
    status: 'NOT LOADED',
    data: {}
};

export default function menu(state = defaultState, action) {
    switch (action.type) {
        case LOCATION_CHANGE:
            return action.action == 'PUSH' ? {} : state;
        case MODEL_SAVING:
            return {
                status: 'SAVING',
                entityName: action.entityName,
                data: action.data || {}
            };
        case MODEL_SAVED:
            return {
                status: 'SAVED',
                entityName: action.entityName,
                data: action.data || {}
            };
        case MODEL_SAVE_ERROR:
            return {
                status: 'ERROR',
                entityName: action.entityName,
                data: action.data || {},
                error: action.error
            };
        case MODEL_LOADING:
            return {
                status: 'LOADING',
                entityName: action.entityName,
                data: action.data || {}
            };
        case MODEL_LOADED:
            return {
                status: 'LOADED',
                entityName: action.entityName,
                data: action.data || {},
                elapsed: action.elapsed
            };
        case MODEL_LOAD_ERROR:
            return {
                status: 'ERROR',
                entityName: action.entityName,
                data: action.data || {},
                error: action.error
            };
        case MODEL_CHANGE_SEARCH_CRITERIA:
            let newState = clone(state);
            newState.data.criteria = action.criteria;
            return newState;

        default:
            return state
    }
}