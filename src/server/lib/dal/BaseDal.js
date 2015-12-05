import r from 'rethinkdb';
import _ from 'underscore';
import async from 'async';

class BaseDal {

    constructor(options) {
        this.options = options;
    }

    /**
     * Formats the given object. This should be overriden.
     * @param object
     * @returns {*}
     */
    formatObject(object) {
        return object;
    }

    /**
     * Creates an object
     * @param connection
     * @param object
     * @param next
     */
    insert(connection, object, next) {
        r.db(this.options.dbName)
            .table(this.options.tableName)
            .insert(this.formatObject(object), {conflict: 'error'})
            .run(connection, next);
    }

    /**
     * Updates a given object
     * @param connection
     * @param id
     * @param updatedObject
     * @param next
     */
    update(connection, id, updatedObject, next) {
        r.db(this.options.dbName)
            .table(this.options.tableName)
            .get(id)
            .update(updatedObject)
            .run(connection, next);
    }

    /**
     * Creates or updates an object
     * @param connection
     * @param object
     * @param next
     */
    upsert(connection, object, next) {
        r.db(this.options.dbName)
            .table(this.options.tableName)
            .insert(this.formatObject(object), {conflict: 'update'})
            .run(connection, next);
    }

    /**
     * Creates or updates an object
     * @param connection
     * @param id
     * @param object
     * @param next
     */
    replace(connection:Connection, id, object, next):void {
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
    filterCursor(connection, filter, next) {
        r.db(this.options.dbName)
            .table(this.options.tableName)
            .filter(filter)
            .run(connection, next);
    }

    /**
     * Finds a user by id
     * @param connection
     * @param id
     * @param next
     */
    find(connection, id, next) {
        r.db(this.options.dbName)
            .table(this.options.tableName)
            .get(id)
            .run(connection, next);
    }

    /**
     * Finds a user by the google id
     * @param connection
     * @param filter
     * @param next
     */
    filter(connection, filter, next) {
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
    list(connection, next):void {
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