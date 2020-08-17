const jwt = require('jsonwebtoken');

const generateToken = (data) => {
	const token = jwt.sign({ ...data }, process.env.JWT_SECRET, { expiresIn: '2h' });
	return token;
};

exports.generateToken = generateToken;
