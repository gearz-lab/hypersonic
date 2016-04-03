import _ from 'underscore';

export default {
    /**
     * Returns the given layout of the given entity. If the layout is not found, the entity will be returned if 
     * defaultToEntity is true. Otherwise returns undefined.
     * @param applicationDomain
     * @param entityName
     * @param layoutName
     * @param defaultToEntity
     */
    getEntityAndLayout(applicationDomain, entityName, layoutName) {
        if (!applicationDomain) throw Error('\'applicationDomain\' should be truthy');
        if (!entityName) throw Error('\'entityName\' should be truthy');
        if (!layoutName) throw Error('\'layoutName\' should be truthy');

        let result = {
            entity: _.find(applicationDomain.entities, e => e.name == entityName),
            layout: undefined
        };
        if (result.entity.layouts && result.entity.layouts.length) {
            result.layout = _.find(result.entity.layouts, l => l.type == layoutName);
        }
        return result;
    }
}