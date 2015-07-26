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
    testSession.setupSession(before, beforeEach, after, afterEach, [rc.TABLE_USERS]);

    it('createFromGoogleProfile', (done) => {
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

    it('updateUserFromGoogleProfile', (done) => {
        users.insert(testSession.connection, {
            email: 'andrerpena@gmail.com'
        }, () => {
            // finds the user by e-mail
            users.findByEmail(testSession.connection, 'andrerpena@gmail.com', (error, user) => {
                // updates the user based on the google profile
                users.updateUserFromGoogleProfile(testSession.connection, user, googleProfileSample, (error) => {
                    // now gets the user again to see if it's updated in the database
                    users.findByEmail(testSession.connection, 'andrerpena@gmail.com', (error, user) => {
                        assert.strictEqual(user.displayName, 'André Pena');
                        done();
                    });
                });
            });
        })
    });
});