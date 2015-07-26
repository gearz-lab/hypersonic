import chai from 'chai';
import rh from "../src/lib/rethinkDb/rethinkHelpers.js";
import rc from "../src/lib/rethinkDb/rethinkConstants.js";
import UserDal from "../src/lib/dal/UserDal.js";
import DbTestSession from "./DbTestSession.js";
import constants from "./testConstants.js";
import googleProfileSample from "./resources/googleProfileSample.js";

const assert = chai.assert;
let users = new UserDal({dbName: constants.DB_TESTS});

describe('BaseDal', function() {

    let testSession = new DbTestSession();
    testSession.setupSession(before, beforeEach, after, afterEach, [rc.TABLE_USERS]);

    it('Create and filter', (done) => {
        users.upsert(testSession.connection, {
            displayName: 'André Pena',
            photo: 'pic134'
        }, (error) => {
            if(error) {
                throw error;
            }
            users.filter(testSession.connection, { photo: 'pic134'}, (error, result) => {
                if(error) {
                    throw error;
                }
                assert.strictEqual(result.length, 1);
                done();
            });
        });
    });

});