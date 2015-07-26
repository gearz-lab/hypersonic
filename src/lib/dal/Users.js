import r from 'rethinkdb';
import _ from 'underscore';
import async from 'async';
import rc from '../rethinkDb/rethinkConstants.js';
import BaseDal from './BaseDal.js';

class UserDal extends BaseDal {

    constructor(options) {
        super(_.extend({
            dbName: rc.DB_GEARZ_GLOBAL,
            tableName: rc.TABLE_USERS
        }, options));
    }

    formatObject(object) {
        return {
            name: object.userName,
            pictureUrl: object.pictureUrl
        };
    }
}

export default UserDal;