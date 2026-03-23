const express = require("express");
const router = express.Router();
const Event = require("../models/Event");

// GET events
router.get("/", async (req, res) => {
    const events = await Event.find();
    res.json(events);
});

// POST event
router.post("/", async (req, res) => {
    try {
        const event = new Event(req.body);
        await event.save();
        res.json(event);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;