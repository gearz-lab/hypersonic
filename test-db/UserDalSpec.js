import chai from 'chai';
import DbTestSession from './DbTestSession';
import testUtils from './testUtils';
import dbUtils from '../src/server/lib/database/dbUtils';
import Db from '../src/server/lib/database/db';

const assert = chai.assert;

describe('UserRepository', function () {
    let testSession = new DbTestSession();
    testSession.setupSession(before, beforeEach, after, afterEach);
    it('Create and filter', (done) => {

        var knex = testUtils.createTestDbKnex();
        dbUtils.setupDb(knex)
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