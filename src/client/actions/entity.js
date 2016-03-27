import api from '../api/EntityClientApi';
import {browserHistory} from 'react-router'
export const ENTITY_SAVING = 'ENTITY_SAVING';
export const ENTITY_SAVED = 'ENTITY_SAVED';
export const ENTITY_SAVE_ERROR = 'ENTITY_SAVE_ERROR';

function entitySaving(entity) {
    if (!entity) throw Error('\'entity\' should be truthy');
    return {
        type: ENTITY_SAVING,
        data: entity
    };
}

function entitySaved(entity, generatedKey) {
    if (!entity) throw Error('\'entity\' should be truthy');
    if (!generatedKey) throw Error('\'generatedKey\' should be truthy');
    return {
        type: ENTITY_SAVED,
        data: entity,
        generatedKey: generatedKey
    };
}

function entitySaveError(entity, error) {
    if (!entity) throw Error('\'entity\' should be truthy');
    if (!error) throw Error('\'error\' should be truthy');
    return {
        type: ENTITY_SAVE_ERROR,
        data: entity,
        error: error
    }
}

export function saveEntity(entityName, entity) {
    return dispatch => {
        dispatch(entitySaving());
        api.save(entityName, entity)
            .then(r => {
                if (r.data.status == 'success') {
                    dispatch(entitySaved(entity, r.data.generatedKey));
                    browserHistory.push(`/e/${entityName}/details/${r.data.generatedKey}`);
                }
                else {
                    dispatch(entitySaveError(entity, r.data.error));
                }
            })
            .catch(ex => {
                throw Error(ex)
            });
    };
}