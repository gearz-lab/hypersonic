import chai from 'chai';
import DbTestSession from './DbTestSession';
import testUtils from './testUtils';

const assert = chai.assert;

describe('UserRepository', function () {
    let testSession = new DbTestSession();
    testSession.setupSession(before, beforeEach, after, afterEach);
    it('Create and filter', (done) => {

        var knex = testUtils.createTestDbKnex();
        testUtils.setupTestDb(knex).then(function () {
            knex.destroy();
            done();
        });

    });
    it('Create and find', (done) => {
        done();
    });
});