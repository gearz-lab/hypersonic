import httpApi from './HttpApi.js';

class EntityClientApi {

    /**
     * Loads the given entity
     * @param entityName
     * @param entityId
     * @param next
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
     * @param entityName
     * @param next
     */
    save(entityName, entity, next) {
        if(!entityName) {
            throw Error('entityName is required');
        }
        httpApi.post(`/api/entity/${entityName}/new/`, entity, (response) => {
            next(null, response.data);
        });
    }
}

export default new EntityClientApi();