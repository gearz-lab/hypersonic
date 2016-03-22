import config from './config';

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
    setupTestDb: function(knex) {
        return knex.schema.createTable('user', function(table) {
            table.increments();
            table.string('name');
            table.timestamps();
            table.json('json');
        });
    }

}