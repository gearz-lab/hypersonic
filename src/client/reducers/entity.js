import {ENTITY_SAVING, ENTITY_SAVED, ENTITY_SAVE_ERROR} from '../actions/entity';

var defaultState = {
    status: 'NOT LOADED',
    data: null
};

export default function menu(state = defaultState, action) {
    switch (action.type) {
        case ENTITY_SAVING:
            return {
                status: 'SAVING',
                data: action.data
            };
        case ENTITY_SAVED:
            return {
                status: 'SAVED',
                data: action.data,
                generatedKey: action.generatedKey
            };
        case ENTITY_SAVE_ERROR:
            return {
                status: 'ERROR',
                data: action.data,
                error: action.error
            }
        default:
            return state
    }
}
