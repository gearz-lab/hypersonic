var knex = require('knex')({
    client: 'pg',
    connection: 'postgres://postgres:ph4r40h@localhost:5433/postgres'
});

var dbName = 'fuck2';

function dropDatabase(databaseName) {
    return function() {
        return knex.raw(`drop database if exists ${databaseName}`);
    }
}

function createDatabase(databaseName) {
    return function() {
        return knex.raw(`create database ${databaseName}`);
    }
}

dropDatabase(dbName)()
    .then(createDatabase(dbName))
    .then(function() {
        knex.destroy();
        var knex2 = require('knex')({
            client: 'pg',
            connection: 'postgres://postgres:ph4r40h@localhost:5433/fuck2'
        });
        knex2.schema.createTable('user', function(table) {
            table.increments();
            table.string('name');
            table.timestamps();
            table.json('json');
        }).then(() => {
            knex2.destroy();
        });
    });