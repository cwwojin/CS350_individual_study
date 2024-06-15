const pg = require('pg');

const configs = {
    development: {
        host: process.env.POSTGRES_DEV_HOST,
        database: process.env.POSTGRES_DEV_DATABASE,
        username: process.env.POSTGRES_DEV_USERNAME,
        password: process.env.POSTGRES_DEV_PASSWORD,
        dialect: 'postgres',
    },
    test: {
        host: process.env.POSTGRES_TEST_HOST,
        database: process.env.POSTGRES_TEST_DATABASE,
        username: process.env.POSTGRES_TEST_USERNAME,
        password: process.env.POSTGRES_TEST_PASSWORD,
        dialect: 'postgres',
    },
    production: {
        host: process.env.POSTGRES_PROD_HOST,
        database: process.env.POSTGRES_PROD_DATABASE,
        username: process.env.POSTGRES_PROD_USERNAME,
        password: process.env.POSTGRES_PROD_PASSWORD,
        dialect: 'postgres',
    },
};
const config = configs[process.env.NODE_ENV];

const pool = new pg.Pool({
    host: config.host,
    user: config.username,
    password: config.password,
    database: config.database,
    port: 5432,
    max: 10,
});

module.exports = pool;