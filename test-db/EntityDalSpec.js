import chai from 'chai';
import rh from "../src/server/lib/database/dbHelper.js";
import rc from "../src/server/lib/database/constants.js";
import EntityDal from "../src/server/lib/dal/EntityDal.js";
import DbTestSession from "./DbTestSession.js";
import constants from "./testConstants.js";
import googleProfileSample from "./resources/googleProfileSample.js";

const assert = chai.assert;
let entities = new EntityDal(constants.DB_TESTS);

describe('EntityDal', function() {

    let testSession = new DbTestSession();
    testSession.setupSession(before, beforeEach, after, afterEach, ["entity"]);

    it('Create and filter', (done) => {
        entities.insert(testSession.connection, {
            name: 'contacts',
            firstClass: true
        }, (error) => {
            if(error) {
                throw error;
            }
            entities.filter(testSession.connection, { firstClass: true}, (error, entities) => {
                if(error) {
                    throw error;
                }
                assert.strictEqual(entities.length, 1);
                done();
            });
        });
    });

    it('Create and find', (done) => {
        entities.insert(testSession.connection, {
            id: 'b446822f-8057-4124-8337-01c78209cf70',
            name: 'contacts',
            firstClass: true
        }, (error) => {
            if(error) {
                throw error;
            }
            entities.find(testSession.connection, 'b446822f-8057-4124-8337-01c78209cf70', (error, entities) => {
                if(error) {
                    throw error;
                }
                assert.strictEqual(entities.id, 'b446822f-8057-4124-8337-01c78209cf70');
                assert.strictEqual(entities.name, 'contacts');
                done();
            });
        });
    });

});