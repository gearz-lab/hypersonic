/* @flow */

import EntityDal from '../lib/dal/EntityDalFlow';
import db from '../lib/database/dbHelper.js';
import rc from '../lib/database/constants';

export default {
    setup(router:any) {

        // routes
        router.route('/applicationdomain/load').get(function(req, res) {

            let entities = new EntityDal(rc.DB_DEFAULT);
            db.connect((error, connection) => {
                // find(connection, tableName, id, next) {
                entities.list(connection, (error, entities) => {
                    if (error) {
                        throw error;
                    }
                    let result = {
                        entities: entities
                    }
                    res.send(result);
                });
            });

        });
    }
}