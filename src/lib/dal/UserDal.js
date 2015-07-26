import r from 'rethinkdb';
import _ from 'underscore';
import async from 'async';
import rc from '../rethinkDb/rethinkConstants.js';
import BaseDal from './BaseDal.js';
import objectHelper from '../helpers/objectHelper.js';

class UserDal extends BaseDal {

    constructor(options) {
        super(_.extend({
            dbName: rc.DB_GEARZ_GLOBAL,
            tableName: rc.TABLE_USERS
        }, options));
    }

    /**
     * Finds a user by e-mail
     * @param connection
     * @param email
     * @param next
     */
    findByEmail(connection, email, next) {
        this.filter(connection, { email: email}, (error, result) => {
            if(error) {
                next(error);
            }
            else {
                next(null, result[0]);
            }
        });
    }

}

export default UserDal;