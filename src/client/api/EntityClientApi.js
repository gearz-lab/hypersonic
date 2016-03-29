/* @flow */
import http from 'axios';

export default {
    /**
     * Loads the given entity
     * @param entityName
     * @param entityId
     */
    load: function (entityName:string, entityId:number) {
        if (!entityName) throw Error('\'entityName\' should be truthy');
        if (!entityId) throw Error('\'entityId\' should be truthy');

        return http.get(`/api/entity/${entityName}/get/${entityId}`);
    },

    /**
     * Saves the given entity
     * @param entityName The name of the entity being saved
     * @param entity The entity being saved
     */
    save: function (entityName:string, entity:any) {
        if (!entityName) throw Error('\'entityName\' should be truthy');
        if (!entity) throw Error('\'entity\' should be truthy');


        return http.post(`/api/entity/${entityName}/new/`, entity);
    },

    /**
     * Searchs
     * @param entityName
     * @param criteria
     */
    search: function (entityName:string, criteria:string) {
        if (!entityName) throw Error('\'entityName\' should be truthy');
        if (criteria === undefined || criteria === null) throw Error('\'criteria\' should not be null or undefined');

        return http.get(`/api/entity/${entityName}/search`, {
            params: {
                q: criteria
            }
        });
    }
}