import r from 'rethinkdb';
import _ from 'underscore';

export default {
    /**
     * Creates a database if it doesn't exist yet
     * @param connection
     * @param next
     */
    createDb: (dbName, connection, next) => {
        r.dbList().run(connection, (error, result) => {
            if(error) {
                throw error;
            }
            if(!_.contains(result, dbName)) {
                r.dbCreate(dbName).run(connection, (error, result) => {
                    if(error) {
                        throw error;
                    }
                    next();
                });
            }
            else {
                next();
            }
        });
    },
    /**
     * Creates a table if it doesn't exist yet
     * @param dbName
     * @param tableName
     * @param connection
     * @param next
     */
    createTable: (dbName, tableName, connection, next) => {
        r.db(dbName).tableList().run(connection, (error, result) => {
            if(error) {
                throw error;
            }
            if(!_.contains(result, tableName)) {
                r.db(dbName).tableCreate(tableName).run(connection, (error, result) => {
                    if(error) {
                        throw error;
                    }
                    next();
                });
            }
            else {
                next();
            }
        });
    }
}