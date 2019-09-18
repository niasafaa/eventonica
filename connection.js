require('dotenv').config();
// require packages
const { Pool } = require('pg');

// create PostgreSQL connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: true
});

module.exports = pool;
