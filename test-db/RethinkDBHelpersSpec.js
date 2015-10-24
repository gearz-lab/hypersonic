import chai from 'chai';
import rh from "../src/server/lib/database/dbHelper.js";
const assert = chai.assert;

describe('RethinkDB', function() {
    describe('connect', function() {
        it('successfully', (done) => {
            rh.connect((error, connection) => {
                assert.ok(connection);
                connection.close();
                done();
            });
        });
    });

});