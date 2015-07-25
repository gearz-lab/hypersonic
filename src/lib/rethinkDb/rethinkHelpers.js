import r from 'rethinkdb';
import _ from 'underscore';

export default {
    /**
     * Creates the Gearz global db if it doesn't exist yet.
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
    }
}