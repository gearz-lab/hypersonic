import r from 'rethinkdb';
import _ from 'underscore';
import async from 'async';
import rc from '../src/lib/rethinkDb/constants.js';
import rh from '../src/lib/rethinkDb/rethinkHelpers.js';

r.connect( {host: 'localhost', port: 28015}, function(error, connection) {
    if (error) {
        throw error;
    }
    console.log('Setting up the database...');
    async.series([
        (next) => rh.createDb(connection, rc.DB_GEARZ_GLOBAL, next),
        (next) => rh.createTable(connection, rc.DB_GEARZ_GLOBAL, rc.TABLE_USERS, next),
        (next) => rh.createUser(connection, rc.USER_ADMIN, 'myPic', next),
        () => {
            console.log('Everything looks good');
            connection.close();
        }
    ]);
});