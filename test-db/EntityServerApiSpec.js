import chai from 'chai';
import DbTestSession from "./DbTestSession.js";
import constants from "./testConstants.js";
import repositories from '../src/server/lib/repositories/repositoryProvider';
import entityServerApi from '../src/server/api/entityServerApi';

const assert = chai.assert;
let contacts = repositories.getRepository(constants.DB_TESTS, 'contact');

describe('EntityServerApi', function () {

    let testSession = new DbTestSession();
    testSession.setupSession(before, beforeEach, after, afterEach, ["contact"]);

    it('getEntityById', (done) => {
        contacts.insert(testSession.connection, {
            id: 1,
            name: 'Andre'
        }, (error) => {
            assert.notOk(error);
            entityServerApi.getEntityById(constants.DB_TESTS, 'contact', 1, (error, entity) => {
                assert.notOk(error);
                assert.strictEqual(entity.id, 1);
                assert.strictEqual(entity.name, 'Andre');
                done();
            });
        });
    });

    it('postNewEntity', (done) => {
        entityServerApi.postNewEntity(constants.DB_TESTS, 'contact', { name: 'Andre'}, (error, result) => {
            assert.strictEqual(result.status, 'success');
            assert.ok(result.generatedKey);
            done();
        });
    });

});