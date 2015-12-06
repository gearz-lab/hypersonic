import chai from 'chai';
import rh from "../src/server/lib/database/dbHelper.js";
import rc from "../src/server/lib/database/constants.js";
import UserDal from "../src/server/lib/repositories/UserRepository.js";
import DbTestSession from "./DbTestSession.js";
import constants from "./testConstants.js";
import googleProfileSample from "./resources/googleProfileSample.js";

const assert = chai.assert;
let users = new UserDal({dbName: constants.DB_TESTS});

describe('UserRepository', function() {

    let testSession = new DbTestSession();
    testSession.setupSession(before, beforeEach, after, afterEach, [rc.TABLE_USERS]);

    it('Create and filter', (done) => {
        users.insert(testSession.connection, {
            displayName: 'André Pena',
            photo: 'pic134'
        }, (error) => {
            if(error) {
                throw error;
            }
            users.filter(testSession.connection, { photo: 'pic134'}, (error, users) => {
                if(error) {
                    throw error;
                }
                assert.strictEqual(users.length, 1);
                done();
            });
        });
    });

    it('Create and find', (done) => {
        users.insert(testSession.connection, {
            id: 'b446822f-8057-4124-8337-01c78209cf70',
            displayName: 'André Pena',
            photo: 'pic134'
        }, (error) => {
            if(error) {
                throw error;
            }
            users.find(testSession.connection, 'b446822f-8057-4124-8337-01c78209cf70', (error, user) => {
                if(error) {
                    throw error;
                }
                assert.strictEqual(user.id, 'b446822f-8057-4124-8337-01c78209cf70');
                assert.strictEqual(user.displayName, 'André Pena');
                done();
            });
        });
    });

});