import EntityDal from '../../../lib/dal/EntityDal.js';
import db from '../../../lib/database/dbHelper.js';
import rc from '../../../lib/database/constants.js';


export default {
    setup(router) {

        router.route('/entity/:entity/new/').post(function(req, res) {
            let entities = new EntityDal({dbName: db.getCustomerDbName(req.user)});
            var entityName = req.params.entity;
            var entity = req.body;
            db.connect((error, connection) => {
               entities.insert(connection, entityName, entity, (error, next) => {
                   if(error) {
                       throw error;
                   }
                   res.send(next.generated_keys[0]);
               });
            });
        });

    }
}