import EntityDal from '../lib/repositories/EntityRepository';
import rc from '../lib/database/constants';

export default {
    setup(router, appConfig, db) {
        if (!router) throw Error('\'router\' should be truthy');
        if (!appConfig) throw Error('\'appConfig\' should be truthy');
        if (!db) throw Error('\'db\' should be truthy');

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