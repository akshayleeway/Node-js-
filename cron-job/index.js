// Import required modules
const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const cron = require('node-cron');
const fs = require('fs');

// Initialize Express app
const app = express();
const port = 7000;

// Secret key for JWT token
const secretKey = '9bfe60120bff251210dc7c9181508f138d08c899d58375b3d837293330727b587d467170df859a64211d796b2ff290fda4b56f64fcf37f694c14a237c59b7cfb';

// Sample user data - In a real application, this data would come from a database
const users = [
  { id: 1, username: 'testuser', password: 'testpassword' }
];

// Middleware to validate JWT token
const validateToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];

  console.log('validate token', token);
  if (!token) {
    return res.status(401).json({ error: 'Authorization header missing' });
  }

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: 'Invalid token' });
    }
    req.user = decoded;
    next();
  });
};



// Simple function to log data with time into a file
const logDataToFile = (data) => {
  const currentTime = new Date().toISOString();
  const logText = `${currentTime}: ${data}\n`;
  fs.appendFile('log.txt', logText, (err) => {
    if (err) {
      console.error('Error writing to file:', err);
    }
  });
};

// Cron job to call the logDataToFile function every 1 minute
cron.schedule('* * * * *', () => {
  logDataToFile('Cron job executed successfully');
});

// API endpoint to test JWT token validation
app.get('/api/test', validateToken, (req, res) => {
  res.json({ message: 'Authorized access', user: req.user });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
