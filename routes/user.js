const express = require('express');
const {
	signup,
	login,
	addUserDetails,
	getAuthenticatedUser,
	getUserDetails,
	markNotificationsAsRead,
	uploadImage
} = require('../controllers/user-controller');
const fileUpload = require('../middlewares/file-upload');
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

// @route  api/user/details
// @access Private
// @desc   fetching user details with his screams
router.get('/details', auth, getUserDetails);

// @route  api/user/notifications
// @access Private
// @desc   mark notifications as read
router.post('/notifications', auth, markNotificationsAsRead);

// @route  api/user/upload
// @access Private
// @desc   upload user image
router.post(
	'/upload',
	[
		auth,
		fileUpload.single('image')
	],
	uploadImage
);

module.exports = router;
