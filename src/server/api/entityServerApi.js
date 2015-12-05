import EntityDal from '../lib/dal/EntityDal.js';
import dbHelper from '../lib/database/dbHelper.js';
import dalHelper from '../lib/database/dalHelper';
import rc from '../lib/database/constants.js';

export default {
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
            let entities = dalHelper.getDalForEntity(req.user, entityName);

            dbHelper.connect((error, connection) => {
                // validate entity here. If the validation does not succeed, we're going
                // to send a response like { status: 'failed', error: '' }
                entities.insert(connection, entity, (error, next) => {
                    if (error) {
                        throw error;
                    }
                    res.send({status: 'success', generatedKey: next.generated_keys[0]});
                });
            });
        });

        // search
        router.route('/entity/:entity/search').get((req, res) => {
            var entityName = req.params.entity;
            var entity = req.body;
            let entities = dalHelper.getDalForEntity(req.user, entityName);
            res.send([{}]);
        });
    }
}