import chai from 'chai';
import setupSession from './DbTestSession';
import googleProfileSample from "./resources/googleProfileSample.js";

const assert = chai.assert;

describe('RepositorySpec', function () {
    var db = null;
    let repo = null;

    setupSession(before, after, $db => {
        db = $db;
        repo = db.getRepository('user');
    });

    it('createFromGoogleProfile', done => {
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
    });

    describe('findOrCreateFromGoogleProfile', () => {
        it('when the user did not exist yet', done => {
            repo.find({email: 'andrerpena@gmail.com'})
                .then(u => {
                    assert.isNull(u);
                    repo.findOrCreateFromGoogleProfile(googleProfileSample)
                        .then(u => {
                            assert.strictEqual(u.email, 'andrerpena@gmail.com');
                            repo.delete(u)
                                .then(() => done())
                                .catch(done);
                        })
                        .catch(done);
                })
                .catch(done);
        });
        it('when a user with the same e-mail address already existed', done => {
            repo.insert({
                name: 'andre',
                email: 'andrerpena@gmail.com'
            })
                .then(() => {
                   repo.findOrCreateFromGoogleProfile(googleProfileSample)
                       .then(u => {
                           assert.strictEqual(u.email, 'andrerpena@gmail.com');
                           assert.ok(u.oauthProfiles.google);
                           repo.delete(u)
                               .then(() => done())
                               .catch(done);
                       })
                       .catch(done);
                })
                .catch(done);
        });
    });
});