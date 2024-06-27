// Import the express-rate-limit package
const rateLimit = require('express-rate-limit');

// Create a rate limiter middleware
const limiter = rateLimit({
    // Time window for rate limiting in milliseconds (10 minutes)
    windowMs: 10 * 60 * 1000, // 10 minutes

    // Maximum number of requests allowed per IP address per windowMs
    max: 100, // limit each IP to 100 requests per windowMs

    // Message to be sent when the rate limit is exceeded
    message: 'Too many requests from this IP, please try again later.'
});

// Export the limiter middleware to be used in the application
module.exports = { limiter };
