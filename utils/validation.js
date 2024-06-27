const { check, validationResult } = require('express-validator');

// Middleware to validate user input for registration and login
const validateUser = [
    // Validate that 'name' is not empty
    check('name', 'Name is required').not().isEmpty(),
    // Validate that 'email' is in a valid format
    check('email', 'Please include a valid email').isEmail(),
    // Validate that 'password' is at least 6 characters long
    check('password', 'Password must be 6 or more characters').isLength({ min: 6 }),
    // Custom middleware to check for validation errors
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            // If there are validation errors, respond with a 400 status and the errors array
            return res.status(400).json({ errors: errors.array() });
        }
        next(); // Proceed to the next middleware if no validation errors
    },
];

module.exports = { validateUser }; // Export the validateUser middleware array for use in other files
