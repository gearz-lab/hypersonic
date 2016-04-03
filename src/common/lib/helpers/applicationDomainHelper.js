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
    getLayout(applicationDomain, entityName, layoutName, defaultToEntity = false) {
        if (!applicationDomain) throw Error('\'applicationDomain\' should be truthy');
        if (!entityName) throw Error('\'entityName\' should be truthy');
        if (!layoutName) throw Error('\'layoutName\' should be truthy');
        
        let entity = _.find(applicationDomain.entities, e => {
            return e.name == entityName
        });
        if (!entity)
            return undefined;
        let layout;
        if (entity.layouts && entity.layouts.length) {
            layout = _.find(entity.layouts, l => l.type == layoutName);
            if(layout)
                return layout;
        }
        if (defaultToEntity)
            return entity;
        return undefined;
    }
}