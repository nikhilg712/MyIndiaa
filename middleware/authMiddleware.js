// Import the jsonwebtoken package for handling JWT tokens
const jwt = require('jsonwebtoken');
// Import the User model for interacting with the user collection in the database
const User = require('../models/user');

// Middleware function to protect routes by verifying the JWT token
const protect = async (req, res, next) => {
    let token;

    // Check if the authorization header is present and starts with 'Bearer'
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // Extract the token from the authorization header
            token = req.headers.authorization.split(' ')[1];
            // Verify the token using the JWT secret
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            // Find the user by the ID stored in the token (excluding the password field)
            req.user = await User.findById(decoded.id).select('-password');
            // Call the next middleware function in the stack
            next();
        } catch (error) {
            // If token verification fails, respond with a 401 status code and an error message
            res.status(401).json({ message: 'Not authorized, token failed' });
        }
    }

    // If no token is present, respond with a 401 status code and an error message
    if (!token) {
        res.status(401).json({ message: 'Not authorized, no token' });
    }
};

// Export the protect middleware function
module.exports = { protect };
