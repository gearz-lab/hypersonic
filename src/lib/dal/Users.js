import r from 'rethinkdb';
import _ from 'underscore';
import async from 'async';
import rc from '../rethinkDb/rethinkConstants.js';

class UserDal {

    constructor(options) {
        this.options = _.extend({
            dbName: rc.DB_GEARZ_GLOBAL,
            tableName: rc.TABLE_USERS
        }, options);
    }

    /**
     * Creates a user
     * @param connection
     * @param userName
     * @param pictureUrl
     * @param next
     */
    create(connection, user, next) {
        r.db(this.options.dbName)
            .table(this.options.tableName)
            .insert({
                name: user.userName,
                pictureUrl: user.pictureUrl
            })
            .run(connection, next);
    }

    /**
     * Finds a user by the google id
     * @param connection
     * @param filter
     * @param next
     */
    filterCursor(connection, filter, next) {
        r.db(this.options.dbName)
            .table(this.options.tableName)
            .filter(filter)
            .run(connection, next);
    }

    /**
     * Finds a user by the google id
     * @param connection
     * @param filter
     * @param next
     */
    filter(connection, filter, next) {
        r.db(this.options.dbName)
            .table(this.options.tableName)
            .filter(filter)
            .run(connection, (error, result) => {
                if(error) {
                    next(error);
                }
                result.toArray((error, result) => {
                    if(error) {
                        next(error);
                    }
                    next(null, result);
                });
            });
    }
}

export default UserDal;