// Import the jsonwebtoken package
const jwt = require('jsonwebtoken');

// Function to generate a JSON Web Token (JWT)
const generateToken = (id) => {
    // Generate a token using the user's ID, a secret key, and an expiration time of 30 days
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d', // Token expires in 30 days
    });
};

// Export the generateToken function so it can be used in other parts of the application
module.exports = generateToken;
