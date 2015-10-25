/* @flow */

import r from 'rethinkdb';
import _ from 'underscore';
import async from 'async';

class BaseDal<T> {
    options:any;

    constructor(options:any) {
        this.options = options;
    }

    /**
     * Formats the given object. This should be overriden.
     * @param object
     * @returns {*}
     */
    formatObject(object:any):any {
        return object;
    }

    /**
     * Creates an object
     * @param connection
     * @param userName
     * @param pictureUrl
     * @param next
     */
    insert(connection:Connection, object:T, next:defaultCallback):void {
        r.db(this.options.dbName)
            .table(this.options.tableName)
            .insert(this.formatObject(object), {conflict: 'error'})
            .run(connection, next);
    }

    /**
     * Creates or updates an object
     * @param connection
     * @param userName
     * @param pictureUrl
     * @param next
     */
    upsert(connection:Connection, object:T, next:defaultCallback):void {
        r.db(this.options.dbName)
            .table(this.options.tableName)
            .insert(this.formatObject(object), {conflict: 'update'})
            .run(connection, next);
    }

    /**
     * Creates or updates an object
     * @param connection
     * @param userName
     * @param pictureUrl
     * @param next
     */
    replace(connection:Connection, id:string, object:T, next:defaultCallback):void {
        r.db(this.options.dbName)
            .table(this.options.tableName)
            .get(id)
            .replace(this.formatObject(object))
            .run(connection, next);
    }

    /**
     * Finds a user by the google id
     * @param connection
     * @param filter
     * @param next
     */
    filterCursor(connection:Connection, filter:any, next:defaultCallback):void {
        r.db(this.options.dbName)
            .table(this.options.tableName)
            .filter(filter)
            .run(connection, next);
    }

    /**
     * Finds a user by id
     * @param connection
     * @param id
     */
    find(connection:Connection, id:any, next:defaultCallback):void {
        r.db(this.options.dbName)
            .table(this.options.tableName)
            .get(id)
            .run(connection, next);
    }

    /**
     * Returns entities that match the filter
     * @param connection
     * @param filter
     * @param next
     */
    filter(connection:Connection, filter:any, next:defaultCallback):void {
        r.db(this.options.dbName)
            .table(this.options.tableName)
            .filter(filter)
            .run(connection, (error, result) => {
                if (error) {
                    next(error);
                }
                result.toArray((error, result) => {
                    if (error) {
                        next(error);
                    }
                    next(null, result);
                });
            });
    }

    /**
     * Returns all entities
     * @param connection
     * @param next
     */
    list(connection:Connection, next: defaultCallback): void {
        r.db(this.options.dbName)
            .table(this.options.tableName)
            .run(connection, (error, result) => {
                if (error) {
                    next(error);
                }
                result.toArray((error, result) => {
                    if (error) {
                        next(error);
                    }
                    next(null, result);
                });
            });
    }
}

export default BaseDal;