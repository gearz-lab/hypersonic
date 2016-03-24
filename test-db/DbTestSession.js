import testUtils from './testUtils';

class DbTestSession {

    /**
     * Sets up a test session
     * @param before
     * @param beforeEach
     * @param after
     * @param afterEach
     */
    setupSession(before, beforeEach, after, afterEach) {

        var knex = testUtils.createDefaultKnex();

        before((done) => {
            testUtils.dropTestDb(knex)
                .then(function () {
                    done();
                })
                .catch(function (error) {
                    done(error);
                });
        });

        after((done) => {
            knex.destroy();
            done();
        });

        // calls 'before', creating a connection and a test database
        beforeEach((done) => {
            testUtils.createTestDb(knex)
                .then(function () {
                    done();
                })
                .catch(function (error) {
                    done(error);
                });
        });

        // calls 'after', closing the connection
        afterEach((done) => {
            testUtils.dropTestDb(knex)
                .then(function () {
                    done();
                })
                .catch(function (error) {
                    done(error);
                });
        });

    }
}

export default DbTestSession;