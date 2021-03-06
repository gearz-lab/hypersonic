import testUtils from './testUtils'
import DataContext from '../src/server/lib/database/DataContext';

/**
 * Sets up a test session
 * @param before
 * @param after
 */
export default function setupSession(before, after, beforeEach, afterEach, callback) {

    let knex = testUtils.createTestDbKnex();
    let massive = null;
    var dataContext = null;

    before((done) => {
        try {
            massive = testUtils.createTestDbMassiveConnection();
            dataContext = new DataContext(testUtils.getTestAppConfig(), massive);
            callback(dataContext);
            done();
        }
        catch (ex) {
            if (knex) knex.destroy();
            if (massive) massive.end();
            done(ex);
        }
    }
    );

    beforeEach((done) => {
        testUtils.truncateData(knex)
            .then(() => done());
    });

    after((done) => {
        done();
    });
};