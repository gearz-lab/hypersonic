import chai from 'chai';
import dbUtils from '../src/server/lib/database/dbUtils';

import Db from '../src/server/lib/database/db';
import testUtils from './testUtils';
import setupSession from './DbTestSession';

const assert = chai.assert;

describe('RepositorySpec', function () {
    var db = null;
    setupSession(before, after, $db => { db = $db; });
    it('insert', (done) => {
        let userRepository = db.getRepository('user');
        userRepository.insert({
                name: 'andre',
                email: 'andrerpena@gmail.com'
            })
            .then(() => {
                userRepository.find({email: 'andrerpena@gmail.com'})
                    .then((user) => {
                        assert.isOk(user);
                        assert.strictEqual(user.name, 'andre');
                        done();
                    })
                    .catch(done)
            })
            .catch(done);
    });
});