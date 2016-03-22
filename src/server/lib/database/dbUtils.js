export default {
    /**
     * Sets up an empty database
     * @param knex
     * @returns Promise
     */
    setupDb: function(knex) {
        return knex.schema.createTable('user', function(table) {
            table.increments();
            table.string('name');
            table.timestamps();
            table.json('json');
        });
    }
}