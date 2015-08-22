import EntityDal from '../../../lib/dal/EntityDal.js';
import db from '../../../lib/database/dbHelper.js';
import rc from '../../../lib/database/constants.js';
let entities = new EntityDal();

export default {
    setup(router) {

        router.route('/entity/:entity/new/').post(function(req, res) {
            var entityName = req.params.entity;
            var entity = req.body;
            db.connect((error, connection) => {
               entities.insert(connection, entityName, entity, (error) => {
                   if(error) {
                       throw error;
                   }
                   res.send(entity);
               });
            });
        });

    }
}