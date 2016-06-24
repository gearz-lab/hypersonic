import chai from 'chai';
import setupSession from './DbTestSession';
import {ENTITY} from '../src/server/lib/repositories/Repository';

const assert = chai.assert;
describe('RepositorySpec', function () {
    var dataContext = null;
    setupSession(before, after, $dataContext => {
        dataContext = $dataContext;
    });
    it('save, find and delete', done => {
        let repo = dataContext.getRepository('user');
        let userId;

        repo.save({
            name: 'andre',
            email: 'andrerpena@gmail.com'
        })
            .then((object) => repo.load(object.id))
            .then(user => {
                assert.isOk(user);
                assert.strictEqual(user.name, 'andre');
                assert.strictEqual(user.email, 'andrerpena@gmail.com');
                userId = user.id;
                return repo.delete([user.id]);
            })
            .then(() => repo.load(userId))
            .then(m => {
                assert.isUndefined(m);
                done();
            })
            .catch(done);
    });
    it('save with custom handlers', done => {
        let repo = dataContext.getRepository('contact');
        let handler = repo.findHandler('save', undefined, ENTITY, true);
        assert.isFunction(handler);
        repo.save({
            name: 'Andre',
            email: 'andrerpena@gmail.com'
        }, undefined, ENTITY)
            .then(m => {
                assert.strictEqual(m.name, 'Andre2');
                return repo.load(m.id)
            })
            .then(m => {
                assert.strictEqual(m.name, 'Andre2');
                done();
            })
            .catch(done);
    });
});