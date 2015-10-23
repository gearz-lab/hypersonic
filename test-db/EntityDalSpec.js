import chai from 'chai';
import rh from "../src/lib/database/dbHelper.js";
import rc from "../src/lib/database/constants.js";
import EntityDal from "../src/lib/dal/EntityDal.js";
import DbTestSession from "./DbTestSession.js";
import constants from "./testConstants.js";
import googleProfileSample from "./resources/googleProfileSample.js";

const assert = chai.assert;
let entities = new EntityDal({dbName: constants.DB_TESTS});

describe('EntityDalFlow', function() {

    let testSession = new DbTestSession();
    testSession.setupSession(before, beforeEach, after, afterEach);

    it('Create and filter', (done) => {
        entities.insert(testSession.connection, "contacts", {
            displayName: 'André Pena',
            photo: 'pic134'
        }, (error) => {
            if(error) {
                throw error;
            }
            entities.filter(testSession.connection, "contacts", { photo: 'pic134'}, (error, entities) => {
                if(error) {
                    throw error;
                }
                assert.strictEqual(entities.length, 1);
                done();
            });
        });
    });

    it('Create and find', (done) => {
        entities.insert(testSession.connection, "contacts", {
            id: 'b446822f-8057-4124-8337-01c78209cf70',
            displayName: 'André Pena',
            photo: 'pic134'
        }, (error) => {
            if(error) {
                throw error;
            }
            entities.find(testSession.connection, "contacts", 'b446822f-8057-4124-8337-01c78209cf70', (error, entities) => {
                if(error) {
                    throw error;
                }
                assert.strictEqual(entities.id, 'b446822f-8057-4124-8337-01c78209cf70');
                assert.strictEqual(entities.displayName, 'André Pena');
                done();
            });
        });
    });

});