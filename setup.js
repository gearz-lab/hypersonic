import r from 'rethinkdb';
import rc from 'src/server/lib/database/constants.js';
import rh from 'src/server/lib/database/dbHelper.js';
import async from 'async';

rh.connect((error, connection) => {

    let createGearzGlobalDbTask = (done) => {
        console.log(`Making sure the database ${rc.DB_GEARZ_GLOBAL} exists...`);
        rh.createDb(connection, rc.DB_GEARZ_GLOBAL, (error) => {
            // the database has been created
            if(error) {
                done(error);
            }
            // if we should create tables, then let's create them
            rh.createTables(connection, rc.DB_GEARZ_GLOBAL, [rc.TABLE_USERS], (error) => {
                if(error) {
                    done(error);
                }
                else {
                    done(null);
                }
            });
        });
    };

    let createGearzCustomerDbTask = (done) => {
        console.log(`Making sure the database customerDb exists...`);
        rh.createDb(connection, 'customerDb', (error) => {
            // the database has been created
            if(error) {
                done(error);
            }
            else {
                done(null);
            }
        });
    }

    async.parallel([createGearzGlobalDbTask, createGearzCustomerDbTask], () => {
        console.log('complete');
        connection.close();
    })


});