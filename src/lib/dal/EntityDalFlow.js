/* @flow */

import BaseDal from './BaseDalFlow';
import Entity from '../../typings/Entity';

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

