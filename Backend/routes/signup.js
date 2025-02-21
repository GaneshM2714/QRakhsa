// models/User.js
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true // Remove whitespace from beginning and end
  },
  department: {
    type: String,
    required: true,
    trim: true
  },
  bloodType: {
    type: String,
    required: true,
    trim: true,
    uppercase: true // Store blood type in uppercase for consistency
  },
  medicalConditions: [{ // Array of strings for medical conditions
    type: String,
    trim: true
  }],
  emergencyContacts: [{ // Array of emergency contact objects
    name: {
      type: String,
      required: true,
      trim: true
    },
    phone: {
      type: String,
      required: true,
      trim: true
    }
  }],
  password: {
    type: String,
    required: true
  }
});

// Hash the password before saving the user
UserSchema.pre('save', async function(next) {
  if (!this.isModified('password')) { // Only hash the password if it's newly created or modified
    return next();
  }

  try {
    const salt = await bcrypt.genSalt(10); // Generate salt (recommended salt rounds: 10-12)
    this.password = await bcrypt.hash(this.password, salt); // Hash the password with the salt
    next();
  } catch (error) {
    next(error); // Pass any error to the next middleware
  }
});

// Method to compare password for login/authentication (we won't use it directly for signup, but good practice to include in User model)
UserSchema.methods.comparePassword = async function(candidatePassword) {
  try {
    return await bcrypt.compare(candidatePassword, this.password); // Compare candidate password with the hashed password
  } catch (error) {
    throw new Error(error);
  }
};

const User = mongoose.model('User', UserSchema); // 'User' model will correspond to 'users' collection in MongoDB (mongoose automatically pluralizes)

module.exports = User;