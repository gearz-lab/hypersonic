import r from 'rethinkdb';
import _ from 'underscore';
import async from 'async';
import rc from '../rethinkDb/constants.js';

class UserDal {

    /**
     * Creates a user
     * @param connection
     * @param userName
     * @param pictureUrl
     * @param next
     */
    create(connection, user, next) {
        r.db(rc.DB_GEARZ_GLOBAL)
            .table(rc.TABLE_USERS)
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
        r.db(rc.DB_GEARZ_GLOBAL)
            .table(rc.TABLE_USERS)
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
        r.db(rc.DB_GEARZ_GLOBAL)
            .table(rc.TABLE_USERS)
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

export default new UserDal();