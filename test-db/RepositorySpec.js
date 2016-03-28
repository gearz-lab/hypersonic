import chai from 'chai';
import setupSession from './DbTestSession';

const assert = chai.assert;

describe('RepositorySpec', function () {
    var db = null;
    setupSession(before, after, $db => {
        db = $db;
    });
    it('save, find and delete', (done) => {
        let repo = db.getRepository('user');
        repo.save({
                name: 'andre',
                email: 'andrerpena@gmail.com'
            })
            .then(() => {
                repo.load({email: 'andrerpena@gmail.com'})
                    .then((user) => {
                        assert.isOk(user);
                        assert.strictEqual(user.name, 'andre');
                        assert.strictEqual(user.email, 'andrerpena@gmail.com');
                        repo.delete(user)
                            .then(() => {
                                // let's make sure the user no longer exists
                                repo.load({email: 'andrerpena@gmail.com'})
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