const mysql = require('mysql2/promise');
const config = require('./config');

let pool;
let isConnected = false;

async function initDb() {
  try {
    pool = mysql.createPool({
      host: config.mysql.host,
      port: config.mysql.port,
      user: config.mysql.user,
      password: config.mysql.password,
      database: config.mysql.database,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
    });

    // Test connection once at startup, but don't crash app on failure.
    await pool.query('SELECT 1');
    isConnected = true;
    console.log('MySQL connected successfully');
  } catch (err) {
    isConnected = false;
    console.error('MySQL connection failed (app will stay up):', err.message);
  }
}

function getDbStatus() {
  return {
    connected: isConnected,
  };
}

async function getPool() {
  if (!pool) {
    // Attempt lazy initialization if not yet done
    await initDb();
  }
  return pool;
}

module.exports = {
  initDb,
  getDbStatus,
  getPool,
};

