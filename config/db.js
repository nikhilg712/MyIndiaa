// Import the mongoose package
const mongoose = require('mongoose');

// Define an asynchronous function to connect to MongoDB
const connectDB = async () => {
    try {
        // Attempt to connect to MongoDB using the connection string from environment variables
        await mongoose.connect(process.env.MONGO_URI);
        // Log a success message if the connection is established
        console.log('MongoDB Connected...');
    } catch (err) {
        // If an error occurs, log the error message
        console.error(err.message);
        // Exit the process with failure
        process.exit(1);
    }
};

// Export the connectDB function so it can be used in other parts of the application
module.exports = connectDB;
