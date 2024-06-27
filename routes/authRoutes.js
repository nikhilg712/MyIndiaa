const express = require('express');
const { registerUser, authUser } = require('../controllers/authController'); // Import controller functions
const { validate } = require('../middleware/validateInput'); // Import validation middleware
const { body } = require('express-validator'); // Import Express Validator's 'body' function

const router = express.Router(); // Create a new router instance

// Route for user registration
router.post('/register', [
    // Validation middleware for 'register' route
    body('name').not().isEmpty().withMessage('Name is required'), // Name must not be empty
    body('email').isEmail().withMessage('Enter a valid email'), // Email must be a valid email format
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long') // Password must be at least 6 characters long
], validate, registerUser); // Use 'validate' middleware to check validations and 'registerUser' controller function to handle registration

// Route for user login
router.post('/login', [
    // Validation middleware for 'login' route
    body('email').isEmail().withMessage('Enter a valid email'), // Email must be a valid email format
    body('password').exists().withMessage('Password is required') // Password must exist
], validate, authUser); // Use 'validate' middleware to check validations and 'authUser' controller function to handle authentication

module.exports = router; // Export the router for use in other files
