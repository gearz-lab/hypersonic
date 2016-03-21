import config from './config';

class DbTestSession {

    /**
     * Drops the given database
     * @param knex
     * @param databaseName
     * @returns {Function}
     */
    dropDatabase(knex, databaseName) {
        return knex.raw(`drop database ${databaseName}`);
    }

    /**
     * Creates the given database
     * @param knex
     * @param databaseName
     * @returns {Function}
     */
    createDatabase(knex, databaseName) {
        return knex.raw(`create database ${databaseName}`);
    }

    /**
     * Sets up a test session
     * @param before
     * @param beforeEach
     * @param after
     * @param afterEach
     */
    setupSession(before, beforeEach, after, afterEach) {

        var knex = require('knex')({
            client: 'pg',
            connection: config.defaultConnectionString
        });

        // calls 'before', creating a connection and a test database
        before((done) => {
            this.createDatabase(knex, config.testDatabaseName)
                .then(function() {
                    done();
                })
                .catch(function(error) {
                    done(error);
                });
        });

        // calls 'after', closing the connection
        after((done) => {
            this.dropDatabase(knex, config.testDatabaseName)
                .then(function() {
                    done();
                })
                .catch(function(error) {
                    done(error);
                });
        });
    }
}

export default DbTestSession;