const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const Admin = require("../models/Admin");
const Employee = require("../models/Employee");
const authMiddleware = require("../middleware/auth");
const SOSAlert = require("../models/SOSAlert");

const router = express.Router();

// Register Admin (One-time setup)
router.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if admin exists
    const existingAdmin = await Admin.findOne({ username });
    if (existingAdmin) return res.status(400).json({ message: "Admin already exists" });

    const admin = new Admin({ username, password });
    await admin.save();
    res.json({ message: "Admin registered successfully!" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Admin Login
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const admin = await Admin.findOne({ username });

    if (!admin || !(await bcrypt.compare(password, admin.password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
    res.json({ message: "Login successful", token });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/employees", authMiddleware, async (req, res) => {
    try {
      const employees = await Employee.find();
      res.json(employees);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

  router.get("/sos-alerts", authMiddleware, async (req, res) => {
    try {
      const alerts = await SOSAlert.find().sort({ timestamp: -1 });
      res.json(alerts);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

  router.delete("/employee/:id", authMiddleware, async (req, res) => {
    try {
      await Employee.findByIdAndDelete(req.params.id);
      res.json({ message: "Employee deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

module.exports = router;
