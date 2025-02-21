const express = require("express");
const QRCode = require("qrcode");
const Employee = require("../models/Employee");

const router = express.Router();

// Register Employee & Generate QR Code
router.post("/register", async (req, res) => {
  try {
    const { name, bloodGroup, emergencyContacts, medicalHistory } = req.body;

    // Save Employee Data
    const employee = new Employee({ name, bloodGroup, emergencyContacts, medicalHistory });
    await employee.save();

    // Generate QR Code
    const qrCodeURL = await QRCode.toDataURL(`https://yourdomain.com/employee/${employee._id}`);
    employee.qrCode = qrCodeURL;
    await employee.save();

    res.status(201).json({ message: "Employee Registered!", qrCode: qrCodeURL });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Get Employee by ID (for QR Code Scanning)
router.get("/:id", async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee) return res.status(404).json({ message: "Employee Not Found" });

    res.json(employee);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
