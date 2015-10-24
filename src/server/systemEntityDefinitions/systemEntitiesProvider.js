/* @flow */

import entity from './entity';
import field from './field';

class SystemEntitiesProvider {
    entities:Array<any>;

    constructor() {
        this.entities = [];
    }

    /**
     * Entity to be added
     * @param entity
     */
    add(entity:Object) {
        this.entities.push(entity);
    }

    getEntities(): Array<any> {
        return this.entities;
    }
}

let systemEntitiesProvider = new SystemEntitiesProvider();
systemEntitiesProvider.add(entity);
systemEntitiesProvider.add(field);

export default systemEntitiesProvider;