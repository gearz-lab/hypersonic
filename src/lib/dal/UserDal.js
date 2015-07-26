import r from 'rethinkdb';
import _ from 'underscore';
import async from 'async';
import rc from '../rethinkDb/rethinkConstants.js';
import BaseDal from './BaseDal.js';

class UserDal extends BaseDal {

    constructor(options) {
        super(_.extend({
            dbName: rc.DB_GEARZ_GLOBAL,
            tableName: rc.TABLE_USERS
        }, options));
    }

    /**
     * Creates a user from the given Google Profile
     * @param connection
     * @param profile
     * @param next
     */
    createFromGoogleProfile(connection, profile, next) {
        let user = {
            name: profile.name,
            displayName: profile.displayName,
            photo: profile.photos[0].value,
            email: profile.emails[0].value,
            extenalProfiles: {
                google: {
                    id: profile.id,
                    raw: profile
                }
            }
        };
        this.create(connection, user, next);
    }
}

export default UserDal;