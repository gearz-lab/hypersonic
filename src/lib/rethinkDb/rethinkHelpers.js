import r from 'rethinkdb';
import _ from 'underscore';
import async from 'async';
import rc from './constants.js';

class RethinkHelpers {

    /**
     * Connects to RethinkDB
     * @param next
     */
    connect(next) {
        r.connect({host: 'localhost', port: 28015}, next);
    }

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
}

export default new RethinkHelpers();