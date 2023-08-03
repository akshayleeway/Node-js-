const jwt = require('jsonwebtoken');

const secretKey = '9bfe60120bff251210dc7c9181508f138d08c899d58375b3d837293330727b587d467170df859a64211d796b2ff290fda4b56f64fcf37f694c14a237c59b7cfb'; // Replace this with your actual secret key

const sampleUserData = { id: 11, username: 'gagan' };

const token = jwt.sign(sampleUserData, secretKey, { expiresIn: '1h' });

console.log('Sample JWT Token:', token);
