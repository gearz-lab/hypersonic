import r from 'rethinkdb';
import _ from 'underscore';
import async from 'async';
import rc from './constants.js';

class DbHelper {

    /**
     * Connects to RethinkDB
     * @param next
     */
    connect(connection) {
        r.connect({host: 'localhost', port: 28015}, connection);
    }

    /**
     * Creates the given database if it doesn't exist yet
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
                r.dbCreate(dbName).run(connection, next);
            }
            else {
                // if the db already exists
                next(null);
            }
        });
    }

    /**
     * Deletes the given database if it exists
     * @param connection
     * @param dbName
     * @param next
     */
    dropDb(connection, dbName, next) {
        r.dbList().run(connection, (error, result) => {
            if(error) {
                next(error);
            }
            if(_.contains(result, dbName)) {
                //  if the db doesn't exist already
                r.dbDrop(dbName).run(connection, next);
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
                r.db(dbName).tableCreate(tableName).run(connection, next);
            }
            else {
                // if the table already exists
                next(null);
            }
        });
    }

    /**
     * Creates each given table if they don't exist
     * @param connection
     * @param dbName
     * @param tableNames
     * @param next
     */
    createTables(connection, dbName, tableNames, next) {
        // creates one task for creating a table for each table that has been passed in
        let tasks = _.map(tableNames, (tableName) => (cb) => this.createTable(connection, dbName, tableName, cb ));
        async.parallel(tasks, next);
    }

    /**
     * Deletes all data in the given table
     * @param connection
     * @param dbName
     * @param tableName
     * @param next
     */
    clearTable(connection, dbName, tableName, next) {
        r.db(dbName).table(tableName).delete().run(connection, next);
    }


    /**
     * Deletes all data in the given tables
     * @param connection
     * @param dbName
     * @param tableNames
     * @param next
     */
    clearTables(connection, dbName, tableNames, next) {
        // creates one task for clearing a table for each table that has been passed in
        let tasks = _.map(tableNames, (tableName) => (cb) => this.clearTable(connection, dbName, tableName, cb ));
        async.parallel(tasks, next);
    }
}

export default new DbHelper();