import testUtils from './testUtils'
import dbUtils from '../src/server/lib/database/dbUtils';
import Db from '../src/server/lib/database/db';

/**
 * Sets up a test session
 * @param before
 * @param after
 */
export default function setupSession(before, after, callback) {

    let rootKnex = testUtils.createDefaultKnex();
    let knex = null;
    var db = null;

    before((done) => {
        testUtils.dropTestDbIfExists(rootKnex)
            .then(() => testUtils.createTestDb(rootKnex))
            .then(() => {
                knex = testUtils.createTestDbKnex();
                db = new Db(testUtils.getTestAppConfig(), knex);
                callback(db);
                return dbUtils.setupDb(knex);
            })
            .then(() => testUtils.setupTestDb(knex))
            .then(() => done())
            .catch((ex) => {
                if(knex) knex.destroy();
                done(ex);
            });
    });

    after((done) => {
        knex.destroy();
        testUtils.dropTestDb(rootKnex)
            .then(() => {
                rootKnex.destroy();
                done();
            })
            .catch((error) => {
                done(error);
            });
    });
};