import chai from 'chai';
import rh from "../src/lib/rethinkDb/rethinkHelpers.js";
import rc from "../src/lib/rethinkDb/rethinkConstants.js";
import UserDal from "../src/lib/dal/Users.js";
import DbTestSession from "./DbTestSession.js";
import constants from "./testConstants.js";

const assert = chai.assert;
let users = new UserDal({dbName: constants.DB_TESTS});

describe('BaseDal', function() {

    let testSession = new DbTestSession();
    testSession.setupSession(before, after, [rc.TABLE_USERS]);

    it('create and filter', (done) => {

        users.create(testSession.connection, {
            userName: 'andrerpena',
            pictureUrl: 'pic134'
        }, (error, result) => {
            if(error) {
                throw error;
            }
            users.filter(testSession.connection, { pictureUrl: 'pic134'}, (error, result) => {
                if(error) {
                    throw error;
                }
                assert.strictEqual(result.length, 1);
                done();
            })
        });

    });
});