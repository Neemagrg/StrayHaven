const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const rescueRoutes = require("./routes/rescueRoutes");
const eventRoutes = require("./routes/eventRoutes");

const app = express();

app.use(cors());
app.use(express.json());

// routes
app.use("/api/rescue", rescueRoutes);
app.use("/api/events", eventRoutes);

// DB connect
mongoose.connect("mongodb://127.0.0.1:27017/strayhaven")
.then(() => console.log("MongoDB connected"))
.catch(err => console.log(err));

// server
app.listen(5000, () => console.log("Server running on port 5000"));