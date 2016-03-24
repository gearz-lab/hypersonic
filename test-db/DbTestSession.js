import testUtils from './testUtils'
import dbUtils from '../src/server/lib/database/dbUtils';

/**
 * Sets up a test session
 * @param before
 * @param after
 */
export default function setupSession(before, after) {
    var knex = testUtils.createDefaultKnex();

    before((done) => {
        testUtils.dropTestDbIfExists(knex)
            .then(() => {
                testUtils.createTestDb(knex)
                    .then(() => {
                        let testDbKnex = testUtils.createTestDbKnex();
                        dbUtils.setupDb(testDbKnex)
                            .then(() => {
                                testDbKnex.destroy();
                                done();
                            })
                            .catch((ex) => {
                                testDbKnex.destroy();
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
        testUtils.dropTestDb(knex)
            .then(() => {
                knex.destroy();
                done();
            })
            .catch((error) => {
                done(error);
            });
    });
};