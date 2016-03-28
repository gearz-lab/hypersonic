import api from '../api/EntityClientApi';
import {browserHistory} from 'react-router'
export const MODEL_SAVING = 'ENTITY_SAVING';
export const MODEL_SAVED = 'ENTITY_SAVED';
export const MODEL_SAVE_ERROR = 'ENTITY_SAVE_ERROR';
export const MODEL_LOADING = 'ENTITY_LOADING';
export const MODEL_LOADED = 'ENTITY_LOADED';
export const MODEL_LOAD_ERROR = 'ENTITY_LOAD_ERROR';

function entitySaving(entityName, entity) {
    if (!entityName) throw Error('\'entityName\' should be truthy');
    if (!entity) throw Error('\'entity\' should be truthy');
    return {
        type: MODEL_SAVING,
        entityName: entityName,
        data: entity
    };
}

function entitySaved(entityName, entity) {
    if (!entityName) throw Error('\'entityName\' should be truthy');
    if (!entity) throw Error('\'entity\' should be truthy');
    return {
        type: MODEL_SAVED,
        entityName: entityName,
        data: entity
    };
}

function entitySaveError(entityName, entity, error) {
    if (!entityName) throw Error('\'entityName\' should be truthy');
    if (!entity) throw Error('\'entity\' should be truthy');
    if (!error) throw Error('\'error\' should be truthy');
    return {
        type: MODEL_SAVE_ERROR,
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
                    browserHistory.push(`/e/${entityName}/details/${r.data.entity.id}`);
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

function entityLoading(entityName, data) {
    if (!entityName) throw Error('\'entity\' should be truthy');
    if (!data) throw Error('\'data\' should be truthy');
    return {
        type: MODEL_LOADING,
        data: data,
        entityName: entityName
    };
}

function entityLoaded(entityName, entity) {
    if (!entityName) throw Error('\'entityName\' should be truthy');
    if (!entity) throw Error('\'entity\' should be truthy');
    return {
        type: MODEL_LOADED,
        entityName: entityName,
        data: entity
    };
}

function entityLoadError(entityName, id, error) {
    if (!entityName) throw Error('\'entityName\' should be truthy');
    if (!id) throw Error('\'id\' should be truthy');
    if (!error) throw Error('\'error\' should be truthy');
    return {
        type: MODEL_LOAD_ERROR,
        entityName: entityName,
        data: {id: id},
        error: error
    }
}

export function loadEntity(entityName, id) {
    if (!entityName) throw Error('\'entityName\' should be truthy');
    return dispatch => {
        dispatch(entityLoading(entityName, {id}));
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

export function searchEntities(entityName, criteria) {
    if (!entityName) throw Error('\'entityName\' should be truthy');
    return dispatch => {
        dispatch(entityLoading(entityName, {}));
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