import r from 'rethinkdb';
import _ from 'underscore';
import async from 'async';
import rc from '../rethinkDb/constants.js';

class UsersDal {

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
     * @param googleId
     * @param next
     */
    filter(connection, filter, next) {
        r.db(rc.DB_GEARZ_GLOBAL)
            .table(rc.TABLE_USERS)
            .filter(filter)
            .run(connection, next);
    }
}

export default new UsersDal();