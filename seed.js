const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config();
const Product = require('./models/products');
async function seedDatabase() {
  try {
    // Connect to MongoDB
    // await mongoose.connect(process.env.MONGODB_URI, {
    //   useNewUrlParser: true,
    //   useUnifiedTopology: true,
    // });


    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // Clear existing data from the collection (optional)
    await Product.deleteMany({});

    // Sample product data
    const products = [
      { name: 'Product 1', price: 10, category: 'Category A' },
      { name: 'Product 2', price: 20, category: 'Category B' },
      { name: 'Product 3', price: 15, category: 'Category A' },
      { name: 'Product 4', price: 10, category: 'Category A' },
      { name: 'Product 5', price: 200, category: 'Category B' },
      { name: 'Product 6', price: 150, category: 'Category A' },
      { name: 'Product 7', price: 1000, category: 'Category A' },
      { name: 'Product 8', price: 2000, category: 'Category B' },
      { name: 'Product 9', price: 105, category: 'Category A' },
      // Add more products as needed
    ];

    // Insert sample data into the collection
    await Product.insertMany(products);

    console.log('Database seeding completed successfully.');
    mongoose.connection.close();
  } catch (err) {
    console.error('Error seeding database:', err);
  }
}

seedDatabase();
