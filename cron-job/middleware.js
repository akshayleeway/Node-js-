// middleware.js
const jwt = require('jsonwebtoken');
const secretKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTIzLCJ1c2VybmFtZSI6InNhbXBsZXVzZXIiLCJpYXQiOjE2OTA4NzI5NDgsImV4cCI6MTY5MDg3NjU0OH0.5s9rlX-FVcLr8IgNRFc2m6HcMQzdL7uwrFi98Y_AUYk'; // Replace this with your actual secret key

function authenticateToken(req, res, next) {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized: Token not found.' });
  }

  jwt.verify(token, secretKey, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Forbidden: Invalid token.' });
    }

    req.user = user;
    next();
  });
}

module.exports = authenticateToken;
