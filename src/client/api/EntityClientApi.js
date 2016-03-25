import request from 'axios';

export default {

    /**
     * Loads the given entity
     * @param entityName
     * @param entityId
     * @param next Callback called when the entity is retrieved
     */
    load: function(entityName, entityId, next) {
        if(!entityName) {
            throw Error('entityName is required');
        }
        if(!entityId) {
            throw Error('entityId is required');
        }
        request.get(`/api/entity/${entityName}/get/${entityId}`)
            .then(r => next(null, r.data))
            .catch(ex => next(ex));
    },

    /**
     * Saves the given entity
     * @param entityName The name of the entity being saved
     * @param entity The entity being saved
     * @param next Callback called when the save result is retrieved
     */
    save: function(entityName, entity, next) {
        if(!entityName) {
            throw Error('entityName is required');
        }

        request.post(`/api/entity/${entityName}/new/`)
            .then(r => next(null, r.data))
            .catch(ex => next(ex));
    },

    /**
     * Searchs
     * @param entityName
     * @param searchCriteria
     * @param next
     */
    search: function(entityName, searchCriteria, next) {
        if(!entityName) {
            throw Error('entityName is required');
        }
        request.get(`/api/entity/${entityName}/search`)
            .then(r => next(null, r.data))
            .catch(ex => next(ex));
    }
}