var dbUtils = require('../src/server/lib/database/dbUtils');

var knex = require('knex')({
    client: 'pg',
    connection: 'postgres://postgres:52Ag98d5@localhost:5433/CRM'
});

dbUtils.setupDb(knex)
    .then(() => {
       knex.destroy();
    });