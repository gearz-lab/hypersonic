import r from 'rethinkdb';
import _ from 'underscore';
import rethinkConstants from '../src/lib/rethinkDb/constants.js';
import rethinkHelpers from '../src/lib/rethinkDb/rethinkHelpers.js';

r.connect( {host: 'localhost', port: 28015}, function(error, connection) {
    if (error) {
        throw error;
    }
    rethinkHelpers.createDb(rethinkConstants.GEARZ_GLOBAL, connection, () => {
        console.log(`${rethinkConstants.GEARZ_GLOBAL} is set up`);
        connection.close();
    });
})