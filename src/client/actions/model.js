import api from '../api/EntityClientApi';
import {browserHistory} from 'react-router'
export const MODEL_SAVING = 'MODEL_SAVING';
export const MODEL_SAVED = 'MODEL_SAVED';
export const MODEL_SAVE_ERROR = 'MODEL_SAVE_ERROR';
export const MODEL_LOADING = 'MODEL_LOADING';
export const MODEL_LOADED = 'MODEL_LOADED';
export const MODEL_LOAD_ERROR = 'MODEL_LOAD_ERROR';

function modelSaving(entityName, entity) {
    if (!entityName) throw Error('\'entityName\' should be truthy');
    if (!entity) throw Error('\'entity\' should be truthy');
    return {
        type: MODEL_SAVING,
        entityName: entityName,
        data: entity
    };
}

function modelSaved(entityName, entity) {
    if (!entityName) throw Error('\'entityName\' should be truthy');
    if (!entity) throw Error('\'entity\' should be truthy');
    return {
        type: MODEL_SAVED,
        entityName: entityName,
        data: entity
    };
}

function modelSaveError(entityName, entity, error) {
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
        dispatch(modelSaving(entityName, entity));
        api.save(entityName, entity)
            .then(r => {
                if (r.data.status == 'success') {
                    dispatch(modelSaved(entityName, r.data.entity));
                    browserHistory.push(`/e/${entityName}/details/${r.data.entity.id}`);
                }
                else {
                    dispatch(modelSaveError(entityName, entity, r.data.error));
                }
            })
            .catch(ex => {
                throw Error(ex)
            });
    };
}

function modelLoading(entityName, data) {
    if (!entityName) throw Error('\'entity\' should be truthy');
    if (!data) throw Error('\'data\' should be truthy');
    return {
        type: MODEL_LOADING,
        data: data,
        entityName: entityName
    };
}

function modelLoaded(entityName, entity) {
    if (!entityName) throw Error('\'entityName\' should be truthy');
    if (!entity) throw Error('\'entity\' should be truthy');
    return {
        type: MODEL_LOADED,
        entityName: entityName,
        data: entity
    };
}

function modelLoadError(entityName, id, error) {
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
        dispatch(modelLoading(entityName, {id}));
        api.load(entityName, id)
            .then(r => {
                if (r.data.status == 'success') {
                    dispatch(modelLoaded(entityName, r.data.entity));
                }
                else {
                    dispatch(modelLoadError(entityName, id, r.data.error));
                }
            })
            .catch(ex => {
                throw Error(ex)
            });
    };
}

export function searchEntities(entityName, criteria, page) {
    if (!entityName) throw Error('\'entityName\' should be truthy');
    return dispatch => {
        dispatch(modelLoading(entityName, {}));
        api.search(entityName, criteria, page)
            .then(r => {
                if (r.data.status == 'success') {
                    dispatch(modelLoaded(entityName, r.data.result));
                }
                else {
                    dispatch(modelLoadError(entityName, id, r.data.error));
                }
            })
            .catch(ex => {
                throw Error(ex)
            });
    };
}