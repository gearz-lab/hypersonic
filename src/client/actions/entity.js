import api from '../api/EntityClientApi';
import {browserHistory} from 'react-router'
export const ENTITY_SAVING = 'ENTITY_SAVING';
export const ENTITY_SAVED = 'ENTITY_SAVED';
export const ENTITY_SAVE_ERROR = 'ENTITY_SAVE_ERROR';
export const ENTITY_LOADING = 'ENTITY_LOADING';
export const ENTITY_LOADED = 'ENTITY_LOADED';
export const ENTITY_LOAD_ERROR = 'ENTITY_LOAD_ERROR';

function entitySaving(entityName, entity) {
    if (!entityName) throw Error('\'entityName\' should be truthy');
    if (!entity) throw Error('\'entity\' should be truthy');
    return {
        type: ENTITY_SAVING,
        entityName: entityName,
        data: entity
    };
}

function entitySaved(entityName, entity) {
    if (!entityName) throw Error('\'entityName\' should be truthy');
    if (!entity) throw Error('\'entity\' should be truthy');
    return {
        type: ENTITY_SAVED,
        entityName: entityName,
        data: entity
    };
}

function entitySaveError(entityName, entity, error) {
    if (!entityName) throw Error('\'entityName\' should be truthy');
    if (!entity) throw Error('\'entity\' should be truthy');
    if (!error) throw Error('\'error\' should be truthy');
    return {
        type: ENTITY_SAVE_ERROR,
        entityName: entityName,
        data: entity,
        error: error
    }
}

export function saveEntity(entityName, entity) {
    return dispatch => {
        dispatch(entitySaving(entityName, entity));
        api.save(entityName, entity)
            .then(r => {
                if (r.data.status == 'success') {
                    dispatch(entitySaved(entityName, r.data.entity));
                    //browserHistory.push(`/e/${entityName}/details/${r.data.entity.id}`);
                }
                else {
                    dispatch(entitySaveError(entityName, entity, r.data.error));
                }
            })
            .catch(ex => {
                throw Error(ex)
            });
    };
}

function entityLoading(entityName, id) {
    if (!entityName) throw Error('\'entity\' should be truthy');
    if (!id) throw Error('\'id\' should be truthy');
    return {
        type: ENTITY_LOADING,
        data: { id: id },
        entityName: entityName
    };
}

function entityLoaded(entityName, entity) {
    if (!entityName) throw Error('\'entityName\' should be truthy');
    if (!entity) throw Error('\'entity\' should be truthy');
    return {
        type: ENTITY_LOADED,
        entityName: entityName,
        data: entity
    };
}

function entityLoadError(entityName, id, error) {
    if (!entityName) throw Error('\'entityName\' should be truthy');
    if (!id) throw Error('\'id\' should be truthy');
    if (!error) throw Error('\'error\' should be truthy');
    return {
        type: ENTITY_LOAD_ERROR,
        entityName: entityName,
        data: { id: id },
        error: error
    }
}

export function loadEntity(entityName, id) {
    return dispatch => {
        dispatch(entityLoading(entityName, id));
        api.load(entityName, id)
            .then(r => {
                if (r.data.status == 'success') {
                    dispatch(entityLoaded(entityName, r.data.entity));
                }
                else {
                    dispatch(entityLoadError(entityName, id, r.data.error));
                }
            })
            .catch(ex => {
                throw Error(ex)
            });
    };
}