import r from 'rethinkdb';
import _ from 'underscore';
import async from 'async';
import rc from '../database/constants.js';
import objectHelper from '../helpers/objectHelper.js';
import dbHelper from '../database/dbHelper.js';

class EntityDal {


    constructor(options) {
        this.options = options;
    }

    /**
     * Upserts a table
     * @param tableName
     * @param next
     */
    upsertTable(connection, tableName, next) {
        dbHelper.createTable(connection, this.options.dbName, tableName, (error) => {
           if(error) {
               throw error;
           }
            next();
        });
    }

    /**
     * Creates an object
     * @param connection
     * @param tableName
     * @param object
     * @param next
     */
    insert(connection, tableName, object, next) {
        this.upsertTable(connection, tableName, () => {
            r.db(this.options.dbName)
                .table(tableName)
                .insert(object, { conflict: 'error' })
                .run(connection, next);
        });
    }

    /**
     * Creates or updates an object
     * @param connection
     * @param tableName
     * @param object
     * @param next
     */
    upsert(connection, tableName, object, next) {
        this.upsertTable(connection, tableName, () => {
            r.db(this.options.dbName)
                .table(tableName)
                .insert(object, { conflict: 'update' })
                .run(connection, next);
        });
    }

    /**
     * Finds an object by the google id
     * @param connection
     * @param tableName
     * @param filter
     * @param next
     */
    filterCursor(connection, tableName, filter, next) {
        this.upsertTable(connection, tableName, () => {
            r.db(this.options.dbName)
                .table(tableName)
                .filter(filter)
                .run(connection, next);
        });
    }

    /**
     * Finds an object by id
     * @param connection
     * @param tableName
     * @param id
     * @param next
     */
    find(connection, tableName, id, next) {
        this.upsertTable(connection, tableName, () => {
            r.db(this.options.dbName)
                .table(tableName)
                .get(id)
                .run(connection, next);
        });
    }

    /**
     * Finds an object by the given search
     * @param connection
     * @param tableName
     * @param filter
     * @param next
     */
    filter(connection, tableName, filter, next) {
        this.upsertTable(connection, tableName, () => {
            r.db(this.options.dbName)
                .table(tableName)
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
        });

    }
}

export default EntityDal;