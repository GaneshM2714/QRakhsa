// config/db.js
const mongoose = require('mongoose');
const config = require('./config'); // Assuming you have a config.js for environment variables

const connectDB = async () => {
  try {
    await mongoose.connect(config.mongoURI, {  // Use your MongoDB URI from config
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('MongoDB Connected...');
  } catch (err) {
    console.error('MongoDB connection error:', err);
    // Exit process with failure
    process.exit(1); // Or handle the error differently, like retrying the connection
  }
};

module.exports = connectDB;