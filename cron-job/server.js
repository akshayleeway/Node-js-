// server.js
const express = require('express');
const app = express();
const authenticateToken = require('./middleware');

app.use(express.json());

// Your other routes and middleware can go here

app.listen(8000, () => {
  console.log('Server is running on http://localhost:8000');
});
