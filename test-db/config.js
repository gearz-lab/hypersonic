const TEST_DB_NAME = '__TESTS__';
const POSTGRES_PASSWORD = '52Ag98d5'; // be careful!
const POSTGRES_PORT = 5433;

export default {
    defaultConnectionString: `postgres://postgres:${POSTGRES_PASSWORD}@localhost:${POSTGRES_PORT}/postgres`,
    testDbConnectionString: `postgres://postgres:${POSTGRES_PASSWORD}@localhost:${POSTGRES_PORT}/${TEST_DB_NAME}`,
    testDatabaseName: TEST_DB_NAME
};