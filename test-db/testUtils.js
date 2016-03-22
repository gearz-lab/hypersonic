import config from './config';
import createKnex from 'knex';

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
     * Creates the given database
     * @param knex
     * @returns {Function}
     */
    createTestDb(knex) {
        return knex.raw(`create database ${config.testDatabaseName}`);
    },

    /**
     * Sets up a test database
     */
    setupTestDb: function (knex) {
        return knex.schema.createTable('user', function (table) {
            table.increments();
            table.string('name');
            table.timestamps();
            table.json('json');
        });
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