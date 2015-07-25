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
            .run(connection, (error, result) => {
                if(error) {
                    next(error);
                }
                next(null, result);
            });
    }

    /**
     * Finds a user by the google id
     * @param connection
     * @param googleId
     * @param next
     */
    findByGoogleId(connection, googleId, next) {
        r.db(rc.DB_GEARZ_GLOBAL)
            .table(rc.TABLE_USERS)
            .filter({googleId: googleId})
            .run(connection, (error, result) => {
                if(error) {
                    next(error);
                }
                next(null, result);
            });
    }
}

export default new UsersDal();