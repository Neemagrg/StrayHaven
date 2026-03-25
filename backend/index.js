import express from "express";
import cors from "cors";
import strayRoutes from "./routes/strayRoutes.js";
import authRoutes from "./routes/authRoutes.js"; // Assuming authRoutes.js uses ES Modules

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/stray", strayRoutes);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});