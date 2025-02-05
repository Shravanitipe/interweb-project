router.get('/view-customers', (req, res) => {
    db.query('SELECT * FROM users', (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Database error' });
        }
        return res.json(result);
    });
});
