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
    testSession.setupSession(before, after, [rc.TABLE_USERS]);

    it('Create and filter', (done) => {
        users.create(testSession.connection, {
            name: 'andrerpena',
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