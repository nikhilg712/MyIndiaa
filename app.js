// Import required packages and modules
const express = require('express');
const dotenv = require('dotenv'); // Load environment variables from .env file
const connectDB = require('./config/db'); // Database connection function
const logger = require('./config/logger'); // Custom logger middleware
const { errorHandler } = require('./middleware/errorHandler'); // Error handling middleware
const { limiter } = require('./middleware/rateLimiter'); // Rate limiting middleware
const helmet = require('helmet'); // Helmet for enhancing app security

// Load environment variables from .env file into process.env
dotenv.config();

// Connect to MongoDB database
connectDB();

// Initialize Express application
const app = express();

// Middleware setup
app.use(express.json()); // Parse JSON bodies in requests
app.use(logger); // Custom logger middleware for request logging
app.use(limiter); // Rate limiting middleware

// Security middleware using Helmet for setting HTTP headers
app.use(helmet());

// Routes
app.use('/api/auth', require('./routes/authRoutes')); // Authentication routes
app.use('/api/products', require('./routes/productRoutes')); // Product routes
app.use('/api/orders', require('./routes/orderRoutes')); // Order routes
app.use('/api/users', require('./routes/userRoutes')); // User routes

// Custom error handling middleware
app.use(errorHandler);

// Define port for server to listen on, defaulting to 5000 if not specified in environment variables
const PORT = process.env.PORT || 5000;

// Start the server and listen on specified port
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
