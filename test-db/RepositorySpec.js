import chai from 'chai';
import setupSession from './DbTestSession';

const assert = chai.assert;

describe('RepositorySpec', function () {
    var db = null;
    setupSession(before, after, $db => { db = $db; });
    it('insert, find and delete', (done) => {
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
                        assert.strictEqual(user.email, 'andrerpena@gmail.com');
                        userRepository.delete(user)
                            .then(() => {
                                // let's make sure the user no longer exists
                                userRepository.find({email: 'andrerpena@gmail.com'})
                                    .then(m => {
                                       assert.isNull(m);
                                        done();
                                    })
                                    .catch(done);
                            })
                            .catch(done);
                    })
                    .catch(done)
            })
            .catch(done);
    });
});