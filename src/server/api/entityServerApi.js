import EntityDal from '../lib/dal/EntityDal.js';
import dbHelper from '../lib/database/dbHelper.js';
import dalHelper from '../lib/database/dalHelper';
import rc from '../lib/database/constants.js';

class EntityServerApi {

    /**
     * Gets an entity by id
     * @param dbName
     * @param entityName
     * @param entityId
     * @param next
     */
    getEntityById(dbName, entityName, entityId, next) {
        let entities = dalHelper.getDalForEntity(dbName, entityName);
        dbHelper.connect((error, connection) => {
            entities.find(connection, entityId, (error, entity) => {
                next(error, entity);
            });
        });
    }

    /**
     * Posts and entity
     * @param dbName
     * @param entityName
     * @param entity
     * @param next
     */
    postNewEntity(dbName, entityName, entity, next) {
        let entities = dalHelper.getDalForEntity(dbName, entityName);
        dbHelper.connect((error, connection) => {
            // validate entity here. If the validation does not succeed, we're going
            // to send a response like { status: 'failed', error: '' }
            entities.insert(connection, entity, (error, result) => {
                if (error) {
                    throw error;
                }
                let newEntityKey = result.generated_keys[0];
                // new we need to actually create the table for the entity being created
                dbHelper.createTable(connection, dbHelper.getCustomerDbName(req.user), entityName, (error, result) => {
                    if (error) {
                        next(error);
                    }
                    else {
                        next(null, {status: 'success', generatedKey: newEntityKey});
                    }
                });
            });
        });
    }


    setup(router) {

        // get
        router.route('/entity/:entity/get/:id').get(function (req, res) {
            var entityName = req.params.entity;
            var entityId = req.params.id;
            let entities = dalHelper.getDalForEntity(req.user, entityName);

            dbHelper.connect((error, connection) => {
                entities.find(connection, entityId, (error, next) => {
                    if (error) {
                        throw error;
                    }
                    res.send(next);
                });
            });
        });

        // post
        router.route('/entity/:entity/new/').post(function (req, res) {
            var entityName = req.params.entity;
            var entity = req.body;
            let entities = dalHelper.getDalForEntity(dbHelper.getCustomerDbName(req.user), entityName);

            dbHelper.connect((error, connection) => {
                // validate entity here. If the validation does not succeed, we're going
                // to send a response like { status: 'failed', error: '' }
                entities.insert(connection, entity, (error, result) => {
                    if (error) {
                        throw error;
                    }
                    let newEntityKey = result.generated_keys[0];
                    // new we need to actually create the table for the entity being created
                    dbHelper.createTable(connection, dbHelper.getCustomerDbName(req.user), entityName, (error, result) => {
                        if (error) {
                            throw error;
                        }
                        res.send({status: 'success', generatedKey: newEntityKey});
                    });
                });
            });
        });

        // search
        router.route('/entity/:entity/search').get((req, res) => {
            var entityName = req.params.entity;
            var entity = req.body;
            let entities = dalHelper.getDalForEntity(dbHelper.getCustomerDbName(req.user), entityName);
            res.send([{}]);
        });

    }
}

export default new EntityServerApi();