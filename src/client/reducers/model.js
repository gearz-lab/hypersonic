import {
    ENTITY_SAVING,
    ENTITY_SAVED,
    ENTITY_SAVE_ERROR,
    ENTITY_LOADING,
    ENTITY_LOADED,
    ENTITY_LOAD_ERROR
} from '../actions/entity';

var defaultState = {
    status: 'NOT LOADED',
    data: null
};

export default function menu(state = defaultState, action) {
    switch (action.type) {
        case ENTITY_SAVING:
            return {
                status: 'SAVING',
                entityName: action.entityName,
                data: action.data
            };
        case ENTITY_SAVED:
            return {
                status: 'SAVED',
                entityName: action.entityName,
                data: action.data
            };
        case ENTITY_SAVE_ERROR:
            return {
                status: 'ERROR',
                entityName: action.entityName,
                data: action.data,
                error: action.error
            };
        case ENTITY_LOADING:
            return {
                status: 'LOADING',
                entityName: action.entityName,
                data: action.data
            };
        case ENTITY_LOADED:
            return {
                status: 'LOADED',
                entityName: action.entityName,
                data: action.data
            };
        case ENTITY_LOAD_ERROR:
            return {
                status: 'ERROR',
                entityName: action.entityName,
                data: action.data,
                error: action.error
            };

        default:
            return state
    }
}
