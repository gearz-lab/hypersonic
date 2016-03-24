import chai from 'chai';
import setupSession from './DbTestSession';
import googleProfileSample from "./resources/googleProfileSample.js";

const assert = chai.assert;

describe('RepositorySpec', function () {
    var db = null;
    setupSession(before, after, $db => {
        db = $db;
    });
    it('createFromGoogleProfile', done => {
        let repo = db.getRepository('user');
        repo.createFromGoogleProfile(googleProfileSample)
            .then(u => {
                assert.isOk(u);
                // let's go to the database to see if the user has actually been added
                repo.find(u.id)
                    .then(u => {
                        assert.isOk(u);
                        assert.isOk(u.oauthProfiles);
                        assert.strictEqual(u.oauthProfiles.google.id, '109199054588840596357');
                        repo.delete(u)
                            .then(() => done())
                            .catch(done);
                    })
                    .catch(done);
            })
            .catch(done);
    });
    it('updateFromGoogleProfile', done => {
        let repo = db.getRepository('user');
        repo.insert({
            name: 'andre',
            email: 'andrerpena@gmail.com'
        })
            .then(u => {
                repo.updateFromGoogleProfile(u, googleProfileSample)
                    .then(u => {
                        assert.isOk(u);
                        assert.isOk(u.oauthProfiles);
                        assert.strictEqual(u.oauthProfiles.google.id, '109199054588840596357');
                        repo.delete(u)
                            .then(() => done())
                            .catch(done);
                    })
                    .catch(done);
            })
            .catch(done);
    })
});