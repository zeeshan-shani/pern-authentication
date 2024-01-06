// db.js
const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'CRUD',  // Change this to the name of your database
  password: '12345678',
  port: 5432, // default PostgreSQL port
});

module.exports = pool;
