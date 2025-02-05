router.get('/view-products', (req, res) => {
    db.query('SELECT * FROM products', (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Database error' });
        }
        return res.json(result);
    });
});
