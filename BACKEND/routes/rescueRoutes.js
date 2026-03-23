const express = require("express");
const router = express.Router();
const Rescue = require("../models/Rescue");

// POST rescue
router.post("/", async (req, res) => {
    try {
        const rescue = new Rescue(req.body);
        await rescue.save();
        res.json(rescue);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// GET all rescues
router.get("/", async (req, res) => {
    const rescues = await Rescue.find();
    res.json(rescues);
});

module.exports = router;