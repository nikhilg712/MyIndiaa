// Importing the validationResult function from express-validator
const { validationResult } = require('express-validator');

// Validation middleware function
const validate = (req, res, next) => {
    // Extract validation errors from the request
    const errors = validationResult(req);

    // Check if there are any validation errors
    if (!errors.isEmpty()) {
        // If errors exist, respond with a 400 Bad Request status and the errors as JSON
        return res.status(400).json({ errors: errors.array() });
    }

    // If no errors, proceed to the next middleware or route handler
    next();
};

// Exporting the validate middleware function for use in the application
module.exports = { validate };
