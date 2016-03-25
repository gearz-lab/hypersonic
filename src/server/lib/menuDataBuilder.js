import _ from 'underscore';

class MenuDataBuilder {

    /**
     * Gets a menu data for the given entities
     * @param entities
     * @returns {{}}
     */
    getMenuData(entities) {
        if (!entities) throw Error('\'entities\' should be truthy');

        let result = {};
        _.each(entities, entity => {
            result[entity.name] = this.getMenuItemsForEntity(entity);
        });
        return result;
    }

    /**
     * Gets menu data for the given entity
     * @param entity
     * @returns {{display: *, nodes: {new: {display: *, route: {name: string, params: {entity: *}}}}}}
     */
    getMenuItemsForEntity(entity) {
        if (!entity) throw Error('\'entity\' should be truthy');
        if (!entity.name) throw Error('\'entity.name\' should be truthy');
        if (!entity.displayNameSingular) throw Error('\'entity.displayNameSingular\' should be truthy');

        return {
            display: entity.displayNameSingular,
            nodes: {
                new: {
                    display: `New ${entity.displayNameSingular}`,
                    url: `/e/${entity.name}/new`
                }
            }
        }
    };
}

export default new MenuDataBuilder();