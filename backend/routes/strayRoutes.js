import express from "express";
import { addReport, getReports } from "../controllers/strayController.js"; // ✅ MUST HAVE .js

const router = express.Router();

router.post("/report", addReport);
router.get("/reports", getReports);

export default router;