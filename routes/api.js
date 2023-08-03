// routes/api.js
const express = require('express');
const router = express.Router();
const Product = require('../models/products');

// Search, Sort, Pagination, and Selection API
router.get('/products', async (req, res) => {
  try {
    const { query, sortBy, sortOrder, page, limit, fields } = req.query;

    const searchQuery = query ? { name: { $regex: query, $options: 'i' } } : {};
    const sortOptions = {
      [sortBy || 'name']: sortOrder === 'desc' ? -1 : 1,
    };
    const skip = (parseInt(page) - 1) * parseInt(limit);
    const productCount = await Product.countDocuments(searchQuery);
    const products = await Product.find(searchQuery)
      .sort(sortOptions)
      .skip(skip)
      .limit(parseInt(limit))
      .select(fields || '');

    res.json({
      data: products,
      total: productCount,
      currentPage: parseInt(page),
    });
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;
