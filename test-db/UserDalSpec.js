import chai from 'chai';
import DbTestSession from './DbTestSession';

const assert = chai.assert;

describe('UserRepository', function() {
    let testSession = new DbTestSession();
    testSession.setupSession(before, beforeEach, after, afterEach);
    it('Create and filter', (done) => {
        done();
    });
    it('Create and find', (done) => {
        done();
    });
});