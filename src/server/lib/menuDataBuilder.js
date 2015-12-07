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
        result.settings = this.getMenuItemsForSettings();
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
                    route: {
                        name: "new",
                        params: {
                            entity: entity.name
                        }
                    }
                }
            }
        };
    }

    /**
     * Gets menu data for settings
     * @returns {{display: string, nodes: {customization: {display: string, nodes: {entities: {display: string, nodes: {new: {display: string, route: {name: string, params: {entity: string}}}}}}}}}}
     */
    getMenuItemsForSettings() {
        return {
            display: "Settings",
            nodes: {
                customization: {
                    display: "Customization",
                    nodes: {
                        entities: {
                            display: "Entities",
                            nodes: {
                                new: {
                                    display: "New",
                                    route: {
                                        name: "new",
                                        params: {
                                            entity: "entity"
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        };
    }
}

export default new MenuDataBuilder();