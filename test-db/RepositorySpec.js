import chai from 'chai';
import setupSession from './DbTestSession';
import { ENTITY } from '../src/server/lib/repositories/Repository';

const assert = chai.assert;

describe('RepositorySpec', function () {
    var db = null;
    setupSession(before, after, $db => {
        db = $db;
    });
    it('save, find and delete', done => {
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
    it('save with custom handlers', done => {
        let repo = db.getRepository('contact');
        let handler = repo.findHandler('save', undefined, ENTITY, true);
        assert.isFunction(handler);
        repo.save({
            name: 'Andre',
            email: 'andrerpena@gmail.com'
        }, undefined, ENTITY)
            .then(m => {
                assert.strictEqual(m.name, 'Andre2');
                repo.load({ email: 'andrerpena@gmail.com'})
                    .then(m => {
                        assert.strictEqual(m.name, 'Andre2');
                        done();
                    })
                    .catch(done);
            })
            .catch(done);
    })
});