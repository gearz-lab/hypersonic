import httpApi from './HttpApi.js';

class EntityClientApi {

    /**
     * Loads the given entity
     * @param entityName
     * @param entityId
     * @param next Callback called when the entity is retrieved
     */
    load(entityName, entityId, next) {
        if(!entityName) {
            throw Error('entityName is required');
        }
        if(!entityId) {
            throw Error('entityId is required');
        }
        httpApi.get(`/api/entity/${entityName}/get/${entityId}`, null, (response) => {
            next(null, response.data);
        });
    }

    /**
     * Saves the given entity
     * @param entityName The name of the entity being saved
     * @param entity The entity being saved
     * @param next Callback called when the save result is retrieved
     */
    save(entityName, entity, next) {
        if(!entityName) {
            throw Error('entityName is required');
        }
        httpApi.post(`/api/entity/${entityName}/new/`, entity, (response) => {
            next(null, response.data);
        });
    }

    /**
     * Searchs
     * @param entityName
     * @param searchCriteria
     * @param next
     */
    search(entityName, searchCriteria, next) {
        if(!entityName) {
            throw Error('entityName is required');
        }
        httpApi.get(`/api/entity/${entityName}/search`, null, (response) => {
           next(null, response.data);
        });
    }
}

export default new EntityClientApi();