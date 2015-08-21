import UserDal from '../../../lib/dal/UserDal.js';
import db from '../../../lib/database/dbHelper.js';
let users = new UserDal();

export default {
    setup(router) {

        router.route('/entity/:entity/new/').post(function(req, res) {

        });

    }
}