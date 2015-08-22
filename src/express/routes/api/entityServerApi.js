import EntityDal from '../../../lib/dal/EntityDal.js.js';
import db from '../../../lib/database/dbHelper.js';
let entities = new EntityDal();

export default {
    setup(router) {

        router.route('/entity/:entity/new/').post(function(req, res) {
            //var entityName = req.params.entity;
            //db.connect((connection) => {
            //    entities.insert(connection, entityName, )
            //});
        });

    }
}