const express = require('express');
const config = require('./config');
const { initDb, getDbStatus } = require('./db');

const app = express();

// Initialize DB connection, but don't block server startup on failure.
initDb();

app.get('/', (req, res) => {
  const dbStatus = getDbStatus();

  res.json({
    message: 'Hello World',
    mysql: {
      connected: dbStatus.connected,
    },
    env: process.env
  });
});

app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ error: 'Internal Server Error' });
});

app.listen(config.port, () => {
  console.log(`Server listening on port ${config.port}`);
});

