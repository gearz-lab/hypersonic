import r from 'rethinkdb';
import _ from 'underscore';
import async from 'async';
import rc from '../database/constants.js';
import Repository from './Repository.js';
import objectHelper from '../../../common/lib/helpers/objectHelper.js';

class UserRepository extends Repository {

    constructor(options) {
        super(_.extend({
            dbName: rc.DB_DEFAULT,
            tableName: rc.TABLE_USERS
        }, options));
    }

    /**
     * Finds a user by e-mail. If the user does not exist, returns undefined
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
                if(result.length > 1) {
                    next('Found more than one user with the same e-mail');
                }
                next(null, result.length > 0 ? result[0] : undefined);
            }
        });
    }

    /**
     * Authenticates the g
     * @param connection
     * @param email
     * @param password
     */
    authenticate(connection, email, password) {
        return true;
    }

}

export default UserRepository;