import chai from 'chai';
import rh from "../src/lib/rethinkDb/rethinkHelpers.js";
import rc from "../src/lib/rethinkDb/rethinkConstants.js";
import UserGoogleDal from "../src/lib/dal/UserGoogleDal.js";
import DbTestSession from "./DbTestSession.js";
import constants from "./testConstants.js";
import googleProfileSample from "./resources/googleProfileSample.js";

const assert = chai.assert;
let users = new UserGoogleDal({dbName: constants.DB_TESTS});

describe('UserGoogleDalSpec', function() {

    let testSession = new DbTestSession();
    testSession.setupSession(before, after, [rc.TABLE_USERS]);

    it('Create from Google profile', (done) => {
        users.createFromGoogleProfile(testSession.connection, googleProfileSample, (error) => {
            if(error) {
                throw error;
            }
            users.filter(testSession.connection, { email: 'andrerpena@gmail.com'}, (error, result) => {
                if(error) {
                    throw error;
                }
                assert.strictEqual(result.length, 1);
                done();
            });
        })
    });
});