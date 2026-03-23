const mongoose = require("mongoose");

const rescueSchema = new mongoose.Schema({
    name: String,
    phone: String,
    location: String,
    description: String
});

module.exports = mongoose.model("Rescue", rescueSchema);