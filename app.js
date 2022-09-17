const express = require('express');

const expressConfig = require('./config/express');
const connectDB = require('./config/database');
const routes = require('./routes');
const { config } = require('./config/index');

const app = express();

expressConfig(app);

const PORT = process.env.PORT || config.PORT;
// Start Server

app.listen(PORT, '172.26.51.170', () => {
  connectDB();
  // Routes
  routes(app);
  console.log(`Server running 🤖 at http://localhost:${PORT}/`);
});

module.exports = app;
