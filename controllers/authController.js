// Import the express-async-handler module to handle asynchronous errors in Express
const asyncHandler = require('express-async-handler');

// Import the User model
const User = require('../models/user');

// Import the generateToken function for creating JWT tokens
const generateToken = require('../config/auth');

// Controller function to register a new user
const registerUser = asyncHandler(async (req, res) => {
    // Extract name, email, and password from the request body
    const { name, email, password } = req.body;

    // Check if a user with the given email already exists
    const userExists = await User.findOne({ email });

    // If user exists, respond with a 400 status code and an error message
    if (userExists) {
        res.status(400);
        throw new Error('User already exists');
    }

    // Create a new user with the provided name, email, and password
    const user = await User.create({
        name,
        email,
        password,
    });

    // If the user is successfully created, respond with the user data and a JWT token
    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id),
        });
    } else {
        // If user creation fails, respond with a 400 status code and an error message
        res.status(400);
        throw new Error('Invalid user data');
    }
});

// Controller function to authenticate a user
const authUser = asyncHandler(async (req, res) => {
    // Extract email and password from the request body
    const { email, password } = req.body;

    // Find the user with the given email
    const user = await User.findOne({ email });

    // If user is found and the password matches, respond with the user data and a JWT token
    if (user && (await user.matchPassword(password))) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id),
        });
    } else {
        // If authentication fails, respond with a 401 status code and an error message
        res.status(401);
        throw new Error('Invalid email or password');
    }
});

// Export the controller functions
module.exports = { registerUser, authUser };
