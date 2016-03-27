import {ENTITY_SAVING, ENTITY_SAVED, ENTITY_SAVE_ERROR} from '../actions/entity';

export default function menu(state = {}, action) {
    switch (action.type) {
        case ENTITY_SAVING:
            return {
                status: 'SAVING',
                data: action.entity
            };
        case ENTITY_SAVED:
            return {
                status: 'SAVED',
                data: action.entity,
                generatedKey: action.generatedKey
            };
        case ENTITY_SAVE_ERROR:
            return {
                status: 'ERROR',
                data: action.entity,
                error: action.error
            }
        default:
            return state
    }
}
