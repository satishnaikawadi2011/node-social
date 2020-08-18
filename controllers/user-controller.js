const User = require('../models/user');
const bcrypt = require('bcryptjs');
const handleUserValidation = require('../utils/userValidationErrors');
const { generateToken } = require('../utils/generate-token');
const HttpError = require('../models/http-error');
const Like = require('../models/like');
const Notification = require('../models/notification');

const signup = async (req, res) => {
	const { username, email, password } = req.body;
	try {
		const user = await User.create({ email, password, username });
		const token = generateToken({ id: user._id, username: user.username });
		res.status(201).json({ token });
	} catch (err) {
		const errors = handleUserValidation(err);
		res.status(400).json({ errors });
	}
};

const login = async (req, res, next) => {
	const { email, password } = req.body;
	try {
		const user = await User.findOne({ email });
		if (!user) {
			const error = new HttpError('No user with this email !', 404);
			return next(error);
		}
		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch) {
			const error = new HttpError('Incorrect password , try again !', 404);
			return next(error);
		}
		const token = generateToken({ id: user._id, username: user.username });
		res.status(200).json({ token });
	} catch (err) {
		const error = new HttpError('Something went wrong , please try again !', 500);
		return next(error);
	}
};

const addUserDetails = async (req, res, next) => {
	// console.log(req.user);
	const { bio, mobile, website, gender, location } = req.body;
	try {
		const user = await User.findById(req.user._id, async function(err, doc) {
			doc.userDetails = {
				website  :
					website ? website :
					'',
				bio      :
					bio ? bio :
					'',
				mobile   :
					mobile ? mobile :
					'',
				gender   :
					gender ? gender :
					'',
				location :
					location ? location :
					''
			};
			await doc.save();
		});

		res.status(201).json({ message: 'User details added successfully !' });
	} catch (err) {
		console.log(err);
		const error = new HttpError('Something went wrong , please try again !', 500);
		return next(error);
	}
};

const getAuthenticatedUser = async (req, res, next) => {
	try {
		const credentials = await User.findById(req.user._id);
		const likes = await Like.find({ username: req.user.username });
		const notifications = await Notification.find({ recipient: req.user.username });
		const userData = {
			credentials,
			likes         : [
				...likes
			],
			notifications : [
				...notifications
			]
		};
		res.status(200).json({ userData });
	} catch (err) {
		console.log(err);
		const error = new HttpError('Something went wrong , please try again !', 500);
		return next(error);
	}
};

exports.signup = signup;
exports.login = login;
exports.addUserDetails = addUserDetails;
exports.getAuthenticatedUser = getAuthenticatedUser;
