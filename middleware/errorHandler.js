// Error handling middleware function
const errorHandler = (err, req, res, next) => {
    // Set the status code to 500 (Internal Server Error) if the current status code is 200 (OK)
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    
    // Set the response status to the determined status code
    res.status(statusCode);
    
    // Send a JSON response containing the error message and stack trace (if not in production)
    res.json({
        message: err.message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack,
    });
};

// Export the error handling middleware function
module.exports = { errorHandler };
