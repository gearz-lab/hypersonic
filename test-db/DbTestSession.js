import testUtils from './testUtils'
import dbUtils from '../src/server/lib/database/dbUtils';
import DataContext from '../src/server/lib/database/DataContext';

/**
 * Sets up a test session
 * @param before
 * @param after
 */
export default function setupSession(before, after, callback) {

    let rootKnex = testUtils.createDefaultKnex();
    let knex = null;
    let massive = null;
    var dataContext = null;

    before((done) => {
            testUtils.dropTestDbIfExists(rootKnex)
                .then(() => testUtils.createTestDb(rootKnex))
                .then(() => {
                    knex = testUtils.createTestDbKnex();
                    return dbUtils.setupDb(knex);
                })
                .then(() => testUtils.setupTestDb(knex))
                .then(() => {
                    massive = testUtils.createTestDbMassiveConnection();
                    dataContext = new DataContext(testUtils.getTestAppConfig(), knex, massive);
                    callback(dataContext);
                    done();
                })
                .catch((ex) => {
                    if (knex) knex.destroy();
                    if (massive) massive.end();
                    done(ex);
                });
        }
    );

    after((done) => {
        massive.end();
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
}
;