import r from 'rethinkdb';
import _ from 'underscore';
import rc from '../src/lib/rethinkDb/constants.js';
import rh from '../src/lib/rethinkDb/rethinkHelpers.js';

r.connect( {host: 'localhost', port: 28015}, function(error, connection) {
    if (error) {
        throw error;
    }
    rh.createDb(rc.DB_GEARZ_GLOBAL, connection, () => {
        console.log(`${rc.DB_GEARZ_GLOBAL} is set up`);
        rh.createTable(rc.DB_GEARZ_GLOBAL, rc.TABLE_USERS, connection, () => {
            console.log(`${rc.TABLE_USERS} is set up`);
            connection.close();
        });
    });
})