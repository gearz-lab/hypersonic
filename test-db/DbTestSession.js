import config from './config';
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

        var knex = require('knex')({
            client: 'pg',
            connection: config.defaultConnectionString
        });

        // calls 'before', creating a connection and a test database
        before((done) => {
            testUtils.createTestDb(knex)
                .then(function() {
                    done();
                })
                .catch(function(error) {
                    done(error);
                });
        });

        // calls 'after', closing the connection
        after((done) => {
            testUtils.dropTestDb(knex)
                .then(function() {
                    done();
                })
                .catch(function(error) {
                    done(error);
                });
        });
    }
}

export default DbTestSession;