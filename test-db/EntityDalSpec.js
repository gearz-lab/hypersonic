import chai from 'chai';
import rh from "../src/server/lib/database/dbHelper.js";
import rc from "../src/server/lib/database/constants.js";
import EntityDal from "../src/server/lib/repositories/EntityRepository.js";
import DbTestSession from "./DbTestSession.js";
import constants from "./testConstants.js";
import googleProfileSample from "./resources/googleProfileSample.js";

const assert = chai.assert;
let entities = new EntityDal(constants.DB_TESTS);

describe('EntityRepository', function() {

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

    it('Create, find and update', (done) => {
        // inserts the original entity
        entities.insert(testSession.connection, {
            id: 1,
            name: 'contacts',
            firstClass: true
        }, (error) => {
            if(error) {
                throw error;
            }
            // finds the entity we just inserted
            entities.find(testSession.connection, 1, (error, entity) => {
                if(error) {
                    throw error;
                }
                assert.strictEqual(entity.id, 1);
                assert.strictEqual(entity.name, 'contacts');

                // updates the entity
                entities.update(testSession.connection, 1, { name: 'contacts2' }, (error, success) => {

                    // finds the entity again after the update
                    entities.find(testSession.connection, 1, (error, entity) => {
                        if(error) {
                            throw error;
                        }
                        assert.strictEqual(entity.id, 1);
                        assert.strictEqual(entity.name, 'contacts2');
                        assert.strictEqual(entity.firstClass, true);

                        done();
                    });

                });

            });
        });
    });

});