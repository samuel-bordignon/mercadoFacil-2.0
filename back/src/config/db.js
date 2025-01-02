const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres', // your username
    host: 'localhost', // your host
    database: 'MercadoFacil', // your database
    password: 'KWlu3155',
    port: 5432,
});

module.exports = pool;
