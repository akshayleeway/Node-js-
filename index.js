// index.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});


console.log('Connecting to MongoDB', process.env.MONGODB_URI);

// Import API routes
const apiRoutes = require('./routes/api');

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/api', apiRoutes);

// Start the server
const port = process.env.PORT || 6000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
