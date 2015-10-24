/* @flow */

import r from 'rethinkdb';
import _ from 'underscore';
import async from 'async';
import rc from '../../src/server/lib/database/constants.js';
import rh from '../../src/server/lib/database/dbHelper.js';

class RethinkDbFireStarter {
    ignite(connection:Connection, dbName:string, callback: defaultCallback) {
        async.series([
            (next) => rh.createDb(connection, dbName, next),
            (next) => rh.createTable(connection, rc.DB_DEFAULT, rc.TABLE_ENTITIES, next),
            (next) => rh.createTable(connection, rc.DB_DEFAULT, rc.TABLE_USERS, next)
        ], (error, results) => {
            callback(error, results);
        });
    }
}
export default new RethinkDbFireStarter;