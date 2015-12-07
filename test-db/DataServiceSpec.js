import chai from 'chai';
import DbTestSession from "./DbTestSession.js";
import constants from "./testConstants.js";
import repositories from '../src/server/lib/repositories/repositoryProvider';
import dataServices from '../src/server/lib/dataServices/dataServiceProvider';
import entityServerApi from '../src/server/api/entityServerApi';

const assert = chai.assert;

let contactsRepository = repositories.getRepository(constants.DB_TESTS, 'contact');
let contactsService = dataServices.getDataService(constants.DB_TESTS, 'contact');

describe('DataService', function () {

    let testSession = new DbTestSession();
    testSession.setupSession(before, beforeEach, after, afterEach, ["contact"]);

    it('load', (done) => {
        contactsRepository.insert(testSession.connection, {
            id: 1,
            name: 'Andre'
        }, (error) => {

            assert.notOk(error);
            contactsService.load(testSession.connection, 1, (error, entity) => {
                assert.notOk(error);
                assert.strictEqual(entity.id, 1);
                assert.strictEqual(entity.name, 'Andre');
                done();
            });

        });
    });
});