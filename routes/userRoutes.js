const express = require('express');
const { getUserProfile, updateUserProfile, getUsers, deleteUser } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.route('/profile').get(protect, getUserProfile).put(protect, updateUserProfile);
router.route('/').get(protect, getUsers).delete(protect, deleteUser);

module.exports = router;
