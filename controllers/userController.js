// Import the express-async-handler module to handle asynchronous errors in Express
const asyncHandler = require('express-async-handler');

// Import the User model
const User = require('../models/user');

// Import the function to generate a JWT token
const generateToken = require('../config/auth');

// Controller function to get the profile of the logged-in user
const getUserProfile = asyncHandler(async (req, res) => {
    // Find the user by the ID stored in the request object (set by authentication middleware)
    const user = await User.findById(req.user._id);

    // If the user is found, respond with the user data
    if (user) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
        });
    } else {
        // If the user is not found, respond with a 404 status code and an error message
        res.status(404);
        throw new Error('User not found');
    }
});

// Controller function to update the profile of the logged-in user
const updateUserProfile = asyncHandler(async (req, res) => {
    // Find the user by the ID stored in the request object (set by authentication middleware)
    const user = await User.findById(req.user._id);

    // If the user is found, update the user details
    if (user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        // If a new password is provided, update the password
        if (req.body.password) {
            user.password = req.body.password;
        }

        // Save the updated user to the database
        const updatedUser = await user.save();

        // Respond with the updated user data and a new token
        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            token: generateToken(updatedUser._id),
        });
    } else {
        // If the user is not found, respond with a 404 status code and an error message
        res.status(404);
        throw new Error('User not found');
    }
});

// Controller function to get a list of all users (for admin purposes)
const getUsers = asyncHandler(async (req, res) => {
    // Fetch all users from the database
    const users = await User.find({});
    // Respond with the list of users
    res.json(users);
});

// Controller function to delete a user by ID (for admin purposes)
const deleteUser = asyncHandler(async (req, res) => {
    // Find the user by ID from the request parameters
    const user = await User.findById(req.params.id);

    // If the user is found, remove it from the database
    if (user) {
        await user.remove();
        // Respond with a success message
        res.json({ message: 'User removed' });
    } else {
        // If the user is not found, respond with a 404 status code and an error message
        res.status(404);
        throw new Error('User not found');
    }
});

// Export the controller functions
module.exports = { getUserProfile, updateUserProfile, getUsers, deleteUser };
