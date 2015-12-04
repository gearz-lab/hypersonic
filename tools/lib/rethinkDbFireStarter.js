import r from 'rethinkdb';
import _ from 'underscore';
import async from 'async';
import rc from '../../src/server/lib/database/constants.js';
import rh from '../../src/server/lib/database/dbHelper.js';

class RethinkDbFireStarter {
    /**
     * Sets up a database for working with Gearz
     * @param connection
     * @param callback
     */
    setupDatabase(connection, callback) {
        async.series([
            (next) => rh.createDb(connection,  rc.DB_DEFAULT, next),
            (next) => rh.createTable(connection, rc.DB_DEFAULT, rc.TABLE_ENTITIES, next),
            (next) => rh.createTable(connection, rc.DB_DEFAULT, rc.TABLE_USERS, next)
        ], (error, results) => {
            callback(error, results);
        });
    }
}
export default new RethinkDbFireStarter;