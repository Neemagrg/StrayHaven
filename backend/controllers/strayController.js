import db from "../config/db.js";

// Add Report
export const addReport = (req, res) => {
  const { location, description, urgency, contact } = req.body;

  if (!location || !description || !urgency || !contact) {
    return res.status(400).json({ message: "All fields required" });
  }

  const sql = `
    INSERT INTO stray_reports (location, description, urgency, contact)
    VALUES (?, ?, ?, ?)
  `;

  db.query(sql, [location, description, urgency, contact], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Database error" });
    }

    res.status(201).json({
      message: "✅ Report submitted",
      reportId: result.insertId
    });// Return the ID of the newly created report for reference
  });
};

// Get Reports
export const getReports = (req, res) => {
  const sql = "SELECT * FROM stray_reports ORDER BY date_reported DESC";

  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json({ message: "Database error" });
    }

    res.json(results);
  });
};