const User = require('../models/user');
const bcrypt = require('bcryptjs');
const handleUserValidation = require('../utils/userValidationErrors');
const { generateToken } = require('../utils/generate-token');
const HttpError = require('../models/http-error');

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

exports.signup = signup;
exports.login = login;
