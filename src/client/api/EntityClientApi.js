import http from 'axios';

export default {
    /**
     * Loads the given entity
     * @param entityName
     * @param entityId
     */
    load: function(entityName, entityId) {
        if (!entityName) throw Error('\'entityName\' should be truthy');
        if (!entityId) throw Error('\'entityId\' should be truthy');

        return http.get(`/api/entity/${entityName}/get/${entityId}`);
    },

    /**
     * Saves the given entity
     * @param entityName The name of the entity being saved
     * @param entity The entity being saved
     */
    save: function(entityName, entity, next) {
        if (!entityName) throw Error('\'entityName\' should be truthy');
        if (!entity) throw Error('\'entity\' should be truthy');

        return http.post(`/api/entity/${entityName}/new/`, entity);
    },

    /**
     * Searchs
     * @param entityName
     * @param searchCriteria
     */
    search: function(entityName, searchCriteria, next) {
        if (!entityName) throw Error('\'entityName\' should be truthy');
        if (!searchCriteria) throw Error('\'searchCriteria\' should be truthy');

        return http.get(`/api/entity/${entityName}/search`);
    }
}