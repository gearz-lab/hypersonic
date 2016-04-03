require('babel-register');
var dbUtils = require('../../src/server/lib/database/dbUtils');
var faker = require('Faker');

var knex = require('knex')({
    client: 'pg',
    connection: 'postgres://postgres:52Ag98d5@localhost:5433/CRM'
});

var rows = [];
for(var i = 0; i < 20000; i++)
{
    rows.push({
        name: faker.Name.findName(),
        email: faker.Internet.email()
    });
}

knex.batchInsert('contact', rows)
    .then(() => {
        knex.destroy();
    });

