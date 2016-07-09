/* @flow */
import http from 'axios';

export default {
    /**
     * Loads the given entity
     * @param entityName
     * @param entityId
     */
    load: function (entityName, entityId) {
        if (!entityName) throw Error('\'entityName\' should be truthy');
        if (!entityId) throw Error('\'entityId\' should be truthy');

        return http.get(`/api/entity/${entityName}/get/${entityId}`);
    },

    /**
     * Saves the given entity
     * @param entityName The name of the entity being saved
     * @param entity The entity being saved
     */
    save: function (entityName, entity) {
        if (!entityName) throw Error('\'entityName\' should be truthy');
        if (!entity) throw Error('\'entity\' should be truthy');

        return http.post(`/api/entity/${entityName}/new/`, entity);
    },

    /**
     * Searchs
     * @param entityName
     * @param page
     * @param criteria
     */
    search: function (entityName, page, criteria) {
        if (!entityName) throw Error('\'entityName\' should be truthy');

        return http.get(`/api/entity/${entityName}/search`, {
            params: {
                q: criteria,
                p: page
            }
        });
    },

    delete: function (entityName, ids) {
        if (!entityName) throw Error('\'entityName\' should be truthy');
        if (!ids) throw Error('\'ids\' should be truthy');
        if (!ids.length) throw Error('\'ids.length\' should be truthy');

        let idsParam = ids.reduce(function (previousValue, currentValue, currentIndex, array) {
            return previousValue + ',' + currentValue;
        });
        return http.delete(`/api/entity/${entityName}/delete`, {
            params: {
                ids: idsParam
            }
        });
    }
}