const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'MercadoFacil',
    password: 'senai',
    port: 5432,
});

module.exports = pool;
