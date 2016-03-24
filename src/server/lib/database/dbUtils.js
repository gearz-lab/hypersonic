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
            table.string('name').unique();
            table.string('displayName');
            table.string('email').unique();
            table.string('photo');
            table.json('oauthProfiles');
        });
    }
}