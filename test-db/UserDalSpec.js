import chai from 'chai';
import rh from "../src/lib/rethinkDb/rethinkHelpers.js";
import users from "../src/lib/dal/users.js";
import DbTestSession from "./DbTestSession.js";
const assert = chai.assert;

describe('UserDal', function() {

    let testSession = new DbTestSession();
    testSession.setupSession(before, after);

    it('create and filter', (done) => {

        users.create(testSession.connection, {
            userName: 'andrerpena',
            pictureUrl: 'pic134'
        }, () => {
            users.filter(testSession.connection, { pictureUrl: 'pic134'}, (error, result) => {
                assert.strictEqual(result.length, 1);
                done();
            })
        });

    });
});