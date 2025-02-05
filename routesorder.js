const express = require('express');
const db = require('../server').db;

const router = express.Router();

// Place an order
router.post('/', (req, res) => {
    const { userId, total } = req.body;
    db.query('INSERT INTO orders (user_id, total) VALUES (?, ?)', [userId, total], (err, result) => {
        if (err) return res.status(500).json({ error: 'Error placing order' });
        res.status(201).json({ message: 'Order placed successfully' });
    });
});

// Get orders for a user
router.get('/:userId', (req, res) => {
    const { userId } = req.params;
    db.query('SELECT * FROM orders WHERE user_id = ?', [userId], (err, results) => {
        if (err) return res.status(500).json({ error: 'Error fetching orders' });
        res.json(results);
    });
});

module.exports = router;
