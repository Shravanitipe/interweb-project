const express = require('express');
const db = require('../server').db;

const router = express.Router();

// Get all products
router.get('/', (req, res) => {
    db.query('SELECT * FROM products', (err, results) => {
        if (err) return res.status(500).json({ error: 'Error fetching products' });
        res.json(results);
    });
});

// Add product (Admin)
router.post('/add', (req, res) => {
    const { name, description, price, image_url } = req.body;
    db.query('INSERT INTO products (name, description, price, image_url) VALUES (?, ?, ?, ?)', [name, description, price, image_url], (err, result) => {
        if (err) return res.status(500).json({ error: 'Error adding product' });
        res.status(201).json({ message: 'Product added successfully' });
    });
});

module.exports = router;
