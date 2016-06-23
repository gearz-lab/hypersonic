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
    var dataContext = null;

    before((done) => {
        testUtils.dropTestDbIfExists(rootKnex)
            .then(() => testUtils.createTestDb(rootKnex))
            .then(() => {
                knex = testUtils.createTestDbKnex();
                dataContext = new DataContext(testUtils.getTestAppConfig(), knex);
                callback(dataContext);
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