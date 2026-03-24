const express = require('express');
const router = express.Router();

// =============================
// ➕ Add a new rescue entry
// =============================
router.post('/', (req, res) => {
    const { name, phone, location, message } = req.body;
    const db = req.db;

    const query = `
        INSERT INTO rescue (name, phone, location, message)
        VALUES (?, ?, ?, ?)
    `;

    db.query(query, [name, phone, location, message], (err, result) => {
        if (err) {
            console.error("Insert Error:", err);
            return res.status(500).send("Database error");
        }
        res.send("Rescue submitted successfully");
    });
});


// =============================
// 📥 Get all rescue entries
// =============================
router.get('/', (req, res) => {
    const db = req.db;

    const query = "SELECT * FROM rescue";

    db.query(query, (err, results) => {
        if (err) {
            console.error("Fetch Error:", err);
            return res.status(500).send("Database error");
        }
        res.json(results);
    });
});


// =============================
// ❌ Delete a rescue entry
// =============================
router.delete('/:id', (req, res) => {
    const db = req.db;
    const id = req.params.id;

    const query = "DELETE FROM rescue WHERE id = ?";

    db.query(query, [id], (err, result) => {
        if (err) {
            console.error("Delete Error:", err);
            return res.status(500).send("Database error");
        }
        res.send("Rescue deleted successfully");
    });
});


// =============================
// ✏️ Update a rescue entry
// =============================
router.put('/:id', (req, res) => {
    const db = req.db;
    const id = req.params.id;
    const { name, phone, location, message } = req.body;

    const query = `
        UPDATE rescue 
        SET name = ?, phone = ?, location = ?, message = ?
        WHERE id = ?
    `;

    db.query(query, [name, phone, location, message, id], (err, result) => {
        if (err) {
            console.error("Update Error:", err);
            return res.status(500).send("Database error");
        }
        res.send("Rescue updated successfully");
    });
});

module.exports = router;