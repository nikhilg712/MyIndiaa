const express = require('express');
const { registerUser, authUser } = require('../controllers/authController');
const { validate } = require('../middleware/validateInput');
const { body } = require('express-validator');

const router = express.Router();

router.post('/register', [
    body('name').not().isEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Enter a valid email'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
], validate, registerUser);

router.post('/login', [
    body('email').isEmail().withMessage('Enter a valid email'),
    body('password').exists().withMessage('Password is required')
], validate, authUser);

module.exports = router;
