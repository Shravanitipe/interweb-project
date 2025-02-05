const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../server').db;

const router = express.Router();

// Register user
router.post('/register', (req, res) => {
    const { username, email, password } = req.body;
    bcrypt.hash(password, 10, (err, hashedPassword) => {
        if (err) return res.status(500).json({ error: 'Error hashing password' });
        db.query('INSERT INTO users (username, email, password) VALUES (?, ?, ?)', [username, email, hashedPassword], (err, result) => {
            if (err) return res.status(500).json({ error: 'Error saving user' });
            res.status(201).json({ message: 'User registered successfully' });
        });
    });
});

// Login user
router.post('/login', (req, res) => {
    const { email, password } = req.body;
    db.query('SELECT * FROM users WHERE email = ?', [email], (err, results) => {
        if (err || results.length === 0) return res.status(400).json({ error: 'User not found' });

        const user = results[0];
        bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err || !isMatch) return res.status(400).json({ error: 'Invalid credentials' });

            const token = jwt.sign({ userId: user.id }, 'your_jwt_secret');
            res.json({ message: 'Login successful', token });
        });
    });
});

module.exports = router;
