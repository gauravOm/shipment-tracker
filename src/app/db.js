// require('dotenv').config();
// const pgp = require('pg-promise')();
// const db = pgp(process.env.DATABASE_URL);

// module.exports = db;

import { Pool } from 'pg';

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'shipment-tracker',
  password: '1234',
  port: 5432, 
});


export default pool;