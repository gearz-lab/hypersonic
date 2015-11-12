/* @flow */

import Entity from '../../common/typings/Entity';
import _ from 'underscore';

class MenuDataBuilder {

    getMenuData(menuItems:Array<Entity>):any {
        let result = {};
        _.each(menuItems, entity => {
            result[entity.name] = this.getMenuItemsForEntity(entity);
        });
        result.settings = this.getMenuItemsForSettings();
        return result;
    }

    getMenuItemsForEntity(entity:Entity):any {
        // todo: Remove backward compatibility. Entitie's displayNameSingular is now required
        let displayName = entity.displayNameSingular ? entity.displayNameSingular : entity.name;
        return {
            display: displayName,
            nodes: {
                new: {
                    display: `New ${displayName}`,
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

    getMenuItemsForSettings():any {
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