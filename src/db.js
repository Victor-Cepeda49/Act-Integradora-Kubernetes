const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '', 
  database: 'colegio',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

const closePool = async () => {
  await pool.end();
};

module.exports = {
  pool,
  closePool
};