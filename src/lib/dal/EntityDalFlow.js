/* @flow */

import BaseDal from './BaseDalFlow';

class Entity {
    name: string;
}

class EntityDalFlow extends BaseDal<Entity> {
    constructor(dbName: string) {
        let options = {
            dbName: dbName,
            tableName: "entities"
        };
        super(options);
    }
}

export default EntityDalFlow;

