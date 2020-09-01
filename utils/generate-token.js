const jwt = require('jsonwebtoken');

const generateToken = (data) => {
	const token = jwt.sign(
		{ ...data, exp: Math.floor(Date.now() / 1000) + 60 * 60, addTime: 2 * 60 * 60 },
		process.env.JWT_SECRET
	);
	return token;
};

exports.generateToken = generateToken;
