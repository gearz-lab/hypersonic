import EntityDal from '../../../lib/dal/EntityDal.js';
import db from '../../../lib/database/dbHelper.js';
import rc from '../../../lib/database/constants.js';


export default {
    setup(router) {

        router.route('/entity/:entity/new/').post(function (req, res) {
            let entities = new EntityDal({dbName: db.getCustomerDbName(req.user)});
            var entityName = req.params.currentEntity;
            var entity = req.body;
            db.connect((error, connection) => {
                // validate entity here. If the validation does not succeed, we're going
                // to send a response like { status: 'failed', error: '' }
                entities.insert(connection, entityName, entity, (error, next) => {
                    if (error) {
                        throw error;
                    }
                    res.send({status: 'success', generatedKey: next.generated_keys[0]});
                });
            });
        });

    }
}