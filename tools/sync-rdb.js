/* @flow */

import r from 'rethinkdb';
import _ from 'underscore';
import async from 'async';
import rc from '../src/lib/database/constants.js';
import rh from '../src/lib/database/dbHelper.js';
import systemEntitiesProvider from '../src/entities/systemEntitiesProvider';
import EntityDalFlow from '../src/lib/dal/EntityDalFlow';
import rethinkDbFireStarter from './lib/rethinkDbFireStarter';

let entityDal = new EntityDalFlow(rc.DB_DEFAULT);

rh.connect((error, connection: Connection) => {
    if (error) {
        throw error;
    }
    console.log('RethinkDB connected.');
    console.log('Setting up the database...');
    async.series([
        (next) => rethinkDbFireStarter.ignite(connection, rc.DB_DEFAULT, next),
        (next) => {
            let systemEntities = systemEntitiesProvider.getEntities();
            let entityCreationCallbacks = systemEntities.map(se => {
                return (n) => entityDal.insert(connection, se, n);
            });
            async.series(entityCreationCallbacks, next);
        }
    ], (error, results) => {
        if(error) {
            console.log(error);
        }
        else {
            console.log('Everything is in sync');
        }
        connection.close();
    });
});