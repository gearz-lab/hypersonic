import chai from 'chai';
import DbTestSession from './DbTestSession';
import testUtils from './testUtils';
import dbUtils from '../src/server/lib/database/dbUtils';
import Db from '../src/server/lib/database/db';

const assert = chai.assert;

describe('RepositorySpec', function () {
    let testSession = new DbTestSession();
    testSession.setupSession(before, beforeEach, after, afterEach);
    it('insert', (done) => {

        var knex = testUtils.createTestDbKnex();
        dbUtils.setupDb(knex)
            .then(() => {
                var db = new Db({}, knex);
                let userRepository = db.getRepository('user');

                userRepository.insert({
                        name: 'andre',
                        email: 'andrerpena@gmail.com'
                    })
                    .then((user) => {
                        console.log(user);
                        user.save({
                            email: 'bola'
                        })
                            .then((user) => {
                                console.log(user);
                                knex.destroy();
                                done();
                            });
                    }).catch((ex) => {
                    knex.destroy();
                    done();
                });
            });
    });
});