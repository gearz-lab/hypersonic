import httpApi from './HttpApi.js';

class EntityClientApi {

    /**
     * Saves the given entity
     * @param entity
     * @param next
     */
    save(entity, next) {
        if(!entity) {
            throw Error('entity is required');
        }
        httpApi.post(`/entity/${entity}/new/`, null, (response) => {
            next(null, response.data);
        })
    }
}

export default new EntityClientApi();