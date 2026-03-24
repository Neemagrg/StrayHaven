const express = require('express');
const router = express.Router();

// Add new event
router.post('/', (req, res) => {
    const { title, description, date, location } = req.body;
    const db = req.db;

    const query = "INSERT INTO event (title, description, date, location) VALUES (?, ?, ?, ?)";
    db.query(query, [title, description, date, location], (err, result) => {
        if (err) return res.status(500).send("Database error");
        res.send("Event added successfully");
    });
});

// Get all events
router.get('/', (req, res) => {
    const db = req.db;
    db.query("SELECT * FROM event", (err, results) => {
        if (err) return res.status(500).send("Database error");
        res.json(results);
    });
});

module.exports = router;