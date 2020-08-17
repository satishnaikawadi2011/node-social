const jwt = require('jsonwebtoken');
const User = require('../models/user');
const HttpError = require('../models/http-error');

const auth = async (req, res, next) => {
	if (req.method === 'OPTIONS') {
		return next();
	}

	try {
		const token = req.headers.authorization.split(' ')[1];
		const decoded = jwt.verify(token, process.env.JWT_SECRET);
		const user = await User.findOne({ _id: decoded.id });

		if (!user) {
			throw new Error('Authentication failed !');
		}

		req.token = token;
		req.user = user;
		next();
	} catch (e) {
		const error = new HttpError('Authentication failed ,please authenticate !', 500);
		return next(error);
	}
};

module.exports = auth;
