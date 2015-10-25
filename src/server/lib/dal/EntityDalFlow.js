/* @flow */

import BaseDal from './BaseDalFlow';
import Entity from '../../../common/typings/Entity';

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

