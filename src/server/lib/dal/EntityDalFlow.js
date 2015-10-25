/* @flow */

import BaseDal from './BaseDalFlow';
import Entity from '../../../common/typings/Entity';
import rc from '../database/constants';

class EntityDalFlow extends BaseDal<Entity> {
    constructor(dbName: string) {
        let options = {
            dbName: dbName,
            tableName: rc.TABLE_ENTITIES
        };
        super(options);
    }
}

export default EntityDalFlow;

