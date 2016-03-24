export default {
    /**
     * Sets up an empty database
     * @param knex
     * @returns Promise
     */
    setupDb: function(knex) {
        return knex.schema.createTable('user', function(table) {
            table.increments();
            table.timestamps();
            table.string('name');
            table.string('displayName');
            table.string('email');
            table.json('oauthProfiles');
        });
    }
}