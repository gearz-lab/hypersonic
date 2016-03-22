import chai from 'chai';
import DbTestSession from './DbTestSession';
import testUtils from './testUtils';
import Db from '../src/server/lib/database/db';
import config from './config';

const assert = chai.assert;

describe('UserRepository', function () {
    let testSession = new DbTestSession();
    testSession.setupSession(before, beforeEach, after, afterEach);
    it('Create and filter', (done) => {

        var knex = testUtils.createTestDbKnex();
        testUtils.setupTestDb(knex)
            .then(() => {
                var db = new Db({}, knex);
                let User = db.getModel('user');
                User.forge({name: 'Andre'}).save()
                    .then(() => {
                        knex.destroy();
                        done();
                    });
            });

    });
    it('Create and find', (done) => {
        done();
    });
});