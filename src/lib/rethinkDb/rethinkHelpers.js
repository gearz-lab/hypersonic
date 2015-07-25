import r from 'rethinkdb';
import _ from 'underscore';
import async from 'async';
import rc from './constants.js';

class RethinkHelpers {

    /**
     * Creates a database if it doesn't exist yet
     * @param connection
     * @param next
     */
    createDb(connection, dbName, next) {
        r.dbList().run(connection, (error, result) => {
            if(error) {
                next(error);
            }
            if(!_.contains(result, dbName)) {
                //  if the db doesn't exist already
                r.dbCreate(dbName).run(connection, (error, result) => {
                    if(error) {
                        next(error);
                    }
                    next(null, result);
                });
            }
            else {
                // if the db already exists
                next(null);
            }
        });
    }

    /**
     * Creates a table if it doesn't exist yet
     * @param dbName
     * @param tableName
     * @param connection
     * @param next
     */
    createTable(connection, dbName, tableName, next) {
        r.db(dbName).tableList().run(connection, (error, result) => {
            if(error) {
                throw next(error);
            }
            if(!_.contains(result, tableName)) {
                //  if the table doesn't exist already
                r.db(dbName).tableCreate(tableName).run(connection, (error, result) => {
                    if(error) {
                        next(error);
                    }
                    next(null);
                });
            }
            else {
                // if the table already exists
                next(null);
            }
        });
    }

    /**
     * Creates a user
     * @param connection
     * @param userName
     * @param pictureUrl
     * @param next
     */
    createUser(connection, userName, pictureUrl, next) {
        r.db(rc.DB_GEARZ_GLOBAL).table(rc.TABLE_USERS).insert({
            name: userName,
            pictureUrl: pictureUrl
        }).run(connection, (error, result) => {
            if(error) {
                throw error;
            }
            next();
        });
    }
}

export default new RethinkHelpers();