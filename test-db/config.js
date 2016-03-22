const TEST_DB_NAME = '__tests__';

// Postgres settings
const POSTGRES_USER = 'postgres'; // be careful!
const POSTGRES_PASSWORD = '52Ag98d5'; // be careful!
const POSTGRES_HOST = 'localhost';
const POSTGRES_PORT = 5433;

export default {
    defaultConnectionString: `postgres://${POSTGRES_USER}:${POSTGRES_PASSWORD}@${POSTGRES_HOST}:${POSTGRES_PORT}/postgres`,
    testDbConnectionString: `postgres://${POSTGRES_USER}:${POSTGRES_PASSWORD}@${POSTGRES_HOST}:${POSTGRES_PORT}/${TEST_DB_NAME}`,
    testDatabaseName: TEST_DB_NAME
};