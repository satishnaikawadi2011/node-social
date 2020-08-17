const express = require('express');
const { signup, login } = require('../controllers/user-controller');

const router = express.Router();

// @route  api/user/signup
// @access Public
// @desc   Creating new user
router.post('/signup', signup);

// @route  api/user/login
// @access Public
// @desc   logging in existing user
router.post('/login', login);

module.exports = router;
