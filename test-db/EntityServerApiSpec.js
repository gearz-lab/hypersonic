import chai from 'chai';
import rh from "../src/server/lib/database/dbHelper.js";
import rc from "../src/server/lib/database/constants.js";
import EntityDal from "../src/server/lib/repositories/EntityRepository.js";
import DbTestSession from "./DbTestSession.js";
import constants from "./testConstants.js";
import dalHelper from '../src/server/lib/database/dalHelper';
import entityServerApi from '../src/server/api/entityServerApi';

const assert = chai.assert;
let contacts = dalHelper.getDalForEntity(constants.DB_TESTS, 'contact');

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