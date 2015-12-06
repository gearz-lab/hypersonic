import rh from "../src/server/lib/database/dbHelper.js";
import constants from "./testConstants.js";

class DbTestSession {

    constructor() {
        this.connection = {};
    }

    /**
     * Sets up a test session
     * @param before
     * @param beforeEach
     * @param after
     * @param afterEach
     * @param tables - The needed tables for this test session
     */
    setupSession(before, beforeEach, after, afterEach, tables) {

        // calls 'before', creating a connection and a test database
        before((done) => {
            rh.connect((error, conn) => {
                if(error) {
                    throw error;
                }

                if(!this.connection) {
                    throw Error('Could not connect');
                }

                this.connection = conn;
                rh.createDb(this.connection, constants.DB_TESTS, (error) => {
                    // the database has been created
                    if(error) {
                        throw error;
                    }
                    if(tables) {
                        // if we should create tables, then let's create them
                        rh.createTables(this.connection, constants.DB_TESTS, tables, (error) => {
                            if(error) {
                                throw error;
                            }
                            done();
                        })
                    }
                    else{
                        // in this case we should not create tables
                        done();
                    }
                });
            });
        });

        beforeEach((done) => {
           rh.clearTables(this.connection, constants.DB_TESTS, tables, (error) => {
               if(error) {
                   throw error;
               }
               done();
           })
        });

        // calls 'after', closing the connection
        after((done) => {
            rh.dropDb(this.connection, constants.DB_TESTS, (error) => {
                if(error) {
                    throw error;
                }
                this.connection.close();
                done();
            })
        });
    }
}

export default DbTestSession;