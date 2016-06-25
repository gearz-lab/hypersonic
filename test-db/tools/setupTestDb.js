import dbUtils from '../../src/server/lib/database/dbUtils';
import testUtils from '../testUtils';

var rootKnex = testUtils.createDefaultKnex();
var knex;

testUtils.createTestDb(rootKnex)
    .then(() => {
        knex = testUtils.createTestDbKnex();
    })
    .then(() => dbUtils.setupDb(knex))
    .then(() => testUtils.setupTestDb(knex))
    .then(() => rootKnex.destroy())
    .then(() => knex.destroy())
    .then(() => console.log('done'));