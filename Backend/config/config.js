// config/config.js
require('dotenv').config(); // Load environment variables from .env file

module.exports = {
  mongoURI: process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/your_database_name', // MongoDB connection URI
  port: process.env.PORT || 5000, // Server port
  jwtSecret: process.env.JWT_SECRET || 'your_jwt_secret', // JWT secret key (for authentication)
};