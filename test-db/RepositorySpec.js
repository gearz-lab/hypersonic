import chai from 'chai';
import dbUtils from '../src/server/lib/database/dbUtils';

import Db from '../src/server/lib/database/db';
import testUtils from './testUtils';

const assert = chai.assert;

describe('RepositorySpec', function () {

    let rootKnex = testUtils.createDefaultKnex();
    let knex = null;
    var db = null;

    before((done) => {
        testUtils.dropTestDbIfExists(rootKnex)
            .then(() => {
                testUtils.createTestDb(rootKnex)
                    .then(() => {
                        knex = testUtils.createTestDbKnex();
                        db = new Db({}, knex);
                        dbUtils.setupDb(knex)
                            .then(() => {
                                done();
                            })
                            .catch((ex) => {
                                knex.destroy();
                                done(ex);
                            });
                    })
                    .catch(function (error) {
                        done(error);
                    });
            })
            .catch((error) => {
                done(error);
            });
    });

    after((done) => {
        knex.destroy();
        testUtils.dropTestDb(rootKnex)
            .then(() => {
                rootKnex.destroy();
                done();
            })
            .catch((error) => {
                done(error);
            });
    });

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