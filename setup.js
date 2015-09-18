import r from 'rethinkdb';
import rc from './src/lib/database/constants.js';
import rh from './src/lib/database/dbHelper.js';

rh.connect((error, connection) => {

    console.log(`Making sure the database ${rc.DB_GEARZ_GLOBAL} exists...`);

    rh.createDb(connection, rc.DB_GEARZ_GLOBAL, (error) => {

        let done = () => {
            console.log('done');
            connection.close();
        }

        // the database has been created
        if(error) {
            throw error;
        }
        // if we should create tables, then let's create them
        rh.createTables(connection, rc.DB_GEARZ_GLOBAL, [rc.TABLE_USERS], (error) => {
            if(error) {
                throw error;
            }
            done();
        });

    });
});