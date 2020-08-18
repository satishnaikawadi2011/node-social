const express = require('express');
const { signup, login, addUserDetails, getAuthenticatedUser } = require('../controllers/user-controller');
const auth = require('../middlewares/auth');

const router = express.Router();

// @route  api/user/signup
// @access Public
// @desc   Creating new user
router.post('/signup', signup);

// @route  api/user/login
// @access Public
// @desc   logging in existing user
router.post('/login', login);

// @route  api/user/details
// @access Private
// @desc   adding user details
router.post('/details', auth, addUserDetails);

// @route  api/user/data
// @access Private
// @desc   fetching all required user data
router.get('/data', auth, getAuthenticatedUser);

module.exports = router;
