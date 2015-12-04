import r from 'rethinkdb';
import _ from 'underscore';
import async from 'async';
import rc from '../src/server/lib/database/constants.js';
import rh from '../src/server/lib/database/dbHelper.js';
import systemEntitiesProvider from '../src/server/systemEntityDefinitions/systemEntitiesProvider';
import EntityDalFlow from '../src/server/lib/dal/EntityDal';
import rethinkDbFireStarter from './lib/rethinkDbFireStarter';

let entityDal = new EntityDalFlow(rc.DB_DEFAULT);

rh.connect((error, connection: Connection) => {
    if (error) {
        throw error;
    }
    console.log('RethinkDB connected.');
    console.log('Setting up the database...');
    async.series([
        (next) => rethinkDbFireStarter.setupDatabase(connection, next),
        (next) => {
            let systemEntities = systemEntitiesProvider.getEntities();
            let entityCreationCallbacks = systemEntities.map(se => {
                return (n) => {
                    entityDal.filter(connection, {name: se.name}, (error, results) => {
                        if(error) {
                            n(error);
                        }
                        else if(results.length > 1) {
                            n(`There shouldn't be more than one entity with the same name. Entity name: ${se.name}`);
                        }
                        else if(results.length == 1) {
                            let existingEntity = results[0];
                            se.id = existingEntity.id;
                            entityDal.replace(connection, existingEntity.id, se, n);
                        }
                        else {
                            entityDal.insert(connection, se, n);
                        }
                    });

                }
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