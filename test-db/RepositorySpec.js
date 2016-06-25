import chai from 'chai';
import setupSession from './DbTestSession';
import {BASE, ENTITY, LAYOUT} from '../src/server/lib/repositories/Repository';

const assert = chai.assert;
describe('RepositorySpec', function () {
    var dataContext = null;
    setupSession(before, after, beforeEach, afterEach, $dataContext => {
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
                return repo.delete(user.id);
            })
            .then(() => repo.load(userId))
            .then(m => {
                assert.isUndefined(m);
                done();
            })
            .catch(done);
    });

    it('save and search', done => {
        let repo = dataContext.getRepository('contact');
        let userId;

        repo.save({
            name: 'andre',
            email: 'andrerpena@gmail.com'
        })
            .then((user) => {
                userId = user.id
            })
            .then(() => repo.search('andre', 1, undefined, LAYOUT))
            .then(({count, pages, rows}) => {
                assert.equal(count, 1);
                assert.equal(pages, 1);
                assert.equal(rows.length, 1);
            })
            .then(() => repo.delete(userId, undefined, ENTITY))
            .then(() => done())
            .catch(done);
    });

    it('save with custom handlers', done => {
        let repo = dataContext.getRepository('contact');

        let handler = repo.findHandler('save', undefined, ENTITY, true);
        assert.isFunction(handler);

        handler = repo.findHandler('load', undefined, BASE, true);
        assert.isFunction(handler);

        handler = repo.findHandler('delete', undefined, BASE, true);
        assert.isFunction(handler);

        repo.save({
            name: 'Andre',
            email: 'andrerpena@gmail.com'
        }, undefined, ENTITY)
            .then(m => {
                assert.strictEqual(m.name, 'Andre2');
                return repo.load(m.id, undefined, ENTITY)
            })
            .then(m => {
                assert.strictEqual(m.name, 'Andre2');
                return repo.delete(m.id, undefined, ENTITY);
            })
            .then(() => done())
            .catch(done);
    });
});
