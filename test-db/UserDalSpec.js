import chai from 'chai';
import rh from "../src/lib/rethinkDb/rethinkHelpers.js";
import users from "../src/lib/dal/users.js";
import DbTestSession from "./DbTestSession.js";
const assert = chai.assert;

describe('UserDal', function() {

    let testSession = new DbTestSession();
    testSession.setupSession(before, after);

    it('connect', (done) => {
        assert.ok(testSession.connection);
        done();
    });
});