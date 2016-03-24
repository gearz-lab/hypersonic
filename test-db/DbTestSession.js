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
            .then(() => {
                testUtils.createTestDb(rootKnex)
                    .then(() => {
                        knex = testUtils.createTestDbKnex();
                        db = new Db({}, knex);
                        callback(db);
                        dbUtils.setupDb(knex)
                            .then(() => {
                                done();
                            })
                            .catch((ex) => {
                                knex.destroy();
                                done(ex);
                            });
                    })
                    .catch(function (error) {
                        done(error);
                    });
            })
            .catch((error) => {
                done(error);
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