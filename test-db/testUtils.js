import config from './config';
import createKnex from 'knex';
import dbUtils from '../src/server/lib/database/dbUtils';

export default {
    /**
     * Drops the given database
     * @param knex
     * @returns {Function}
     */
    dropTestDb(knex) {
        return knex.raw(`drop database ${config.testDatabaseName}`);
    },

    /**
     * Drops the given database if exists
     * @param knex
     * @returns {Function}
     */
    dropTestDbIfExists(knex) {
        return knex.raw(`drop database if exists ${config.testDatabaseName}`);
    },

    /**
     * Creates the given database
     * @param knex
     * @returns {Function}
     */
    createTestDb(knex) {
        return knex.raw(`create database ${config.testDatabaseName}`);
    },

    /**
     * Creates a knex object with the postgres database so we can create and drop databases
     * @returns {*}
     */
    createDefaultKnex: function () {
        return createKnex({
            client: 'pg',
            connection: config.defaultConnectionString
        });
    },

    /**
     * Creates a knex object for the test database
     * @returns {*}
     */
    createTestDbKnex: function () {
        return createKnex({
            client: 'pg',
            connection: config.testDbConnectionString
        });
    }

}