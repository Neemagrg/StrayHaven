import express from "express";

const router = express.Router();


router.get("/", (req, res) => {
  res.send("Auth route working");
});


router.post("/register", (req, res) => {
  const { username, email, password } = req.body;

  
  if (!username || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  res.status(201).json({
    message: "✅ User registered (placeholder)",
    user: { username, email }
  });
});


router.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password required" });
  }

  
  res.json({
    message: "✅ Login successful (placeholder)",
    user: { email }
  });
});

export default router;