const mongoose = require("mongoose");

const EmployeeSchema = new mongoose.Schema({
  name: String,
  bloodGroup: String,
  emergencyContacts: [{ name: String, phone: String }],
  medicalHistory: String,
  qrCode: String, // Stores generated QR code URL
});

module.exports = mongoose.model("Employee", EmployeeSchema);
