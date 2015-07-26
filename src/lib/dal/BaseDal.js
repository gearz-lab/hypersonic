import r from 'rethinkdb';
import _ from 'underscore';
import async from 'async';
import rc from '../rethinkDb/rethinkConstants.js';

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
     * Creates a user
     * @param connection
     * @param userName
     * @param pictureUrl
     * @param next
     */
    create(connection, object, next) {
        r.db(this.options.dbName)
            .table(this.options.tableName)
            .insert(this.formatObject(object))
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
    }
}

export default BaseDal;