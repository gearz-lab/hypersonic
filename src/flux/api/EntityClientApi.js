import httpApi from './HttpApi.js';

class EntityClientApi {

    /**
     * Saves the given entity
     * @param entityName
     * @param next
     */
    save(entityName, entity, next) {
        if(!entityName) {
            throw Error('entity is required');
        }
        httpApi.post(`/api/entity/${entityName}/new/`, entity, (response) => {
            next(null, response.data);
        })
    }
}

export default new EntityClientApi();