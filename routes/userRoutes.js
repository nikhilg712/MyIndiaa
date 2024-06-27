const express = require('express');
const { getUserProfile, updateUserProfile, getUsers, deleteUser } = require('../controllers/userController'); // Import user controller functions
const { protect } = require('../middleware/authMiddleware'); // Import authentication middleware

const router = express.Router(); // Create a new router instance

// Route to get and update user profile
router.route('/profile')
    .get(protect, getUserProfile) // GET endpoint to get the logged-in user's profile, protected route
    .put(protect, updateUserProfile); // PUT endpoint to update the logged-in user's profile, protected route

// Route to get all users and delete a user
router.route('/')
    .get(protect, getUsers) // GET endpoint to get all users, protected route
    .delete(protect, deleteUser); // DELETE endpoint to delete a user, protected route

module.exports = router; // Export the router for use in other files
