import chai from 'chai';
import rh from "../src/server/lib/database/dbHelper.js";
import rc from "../src/server/lib/database/constants.js";
import UserGoogleDal from "../src/server/lib/repositories/UserGoogleRepository.js";
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
                users.updateFromGoogleProfile(testSession.connection, user, googleProfileSample, (error) => {
                    // now gets the user again to see if it's updated in the database
                    users.findByEmail(testSession.connection, 'andrerpena@gmail.com', (error, user) => {
                        assert.strictEqual(user.displayName, 'André Pena');
                        done();
                    });
                });
            });
        });
    });

    it('updateUserFromGoogleProfile', (done) => {
        users.insert(testSession.connection, {
            email: 'andrerpena@gmail.com'
        }, () => {
            // finds the user by e-mail
            users.findByEmail(testSession.connection, 'andrerpena@gmail.com', (error, user) => {
                // updates the user based on the google profile
                users.updateFromGoogleProfile(testSession.connection, user, googleProfileSample, (error) => {
                    // now gets the user again to see if it's updated in the database
                    users.findByEmail(testSession.connection, 'andrerpena@gmail.com', (error, user) => {
                        assert.strictEqual(user.displayName, 'André Pena');
                        done();
                    });
                });
            });
        });
    });

    describe('findOrCreateFromGoogleProfile', () => {
        it('When the user did not exist yet', (done) => {
            users.findOrCreateFromGoogleProfile(testSession.connection, googleProfileSample, (error, user) => {
                assert.strictEqual(user.email, 'andrerpena@gmail.com');
                done();
            });
        });
        it('When a user with the same e-mail address already existed', (done) => {
            users.insert(testSession.connection, {
                email: 'andrerpena@gmail.com'
            }, () => {
                users.findOrCreateFromGoogleProfile(testSession.connection, googleProfileSample, (error, user) => {
                    assert.strictEqual(user.email, 'andrerpena@gmail.com');
                    assert.ok(user.externalProfiles.google);
                    // Gotta make sure there's only one user with the same e-mail
                    users.filter(testSession.connection, {email: 'andrerpena@gmail.com'}, (error, result) => {
                        assert.strictEqual(1, result.length);
                        done();
                    });
                });
            });
        });
    });
});