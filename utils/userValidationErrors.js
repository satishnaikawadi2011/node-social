const handleValidationErrors = (err) => {
	let errors = { email: '', password: '', username: '' };
	console.log(err);
	if (err.code === 11000) {
		if (Object.keys(err.keyPattern).includes('email')) {
			errors.email = 'This email is already in use !';
			return errors;
		}

		if (Object.keys(err.keyPattern).includes('username')) {
			errors.username = 'This username is already taken , try another one !';
			return errors;
		}
	}

	if (err.message.includes('user validation failed')) {
		Object.values(err.errors).forEach(({ properties }) => {
			errors[properties.path] = properties.message;
		});
	}
	return errors;
};

module.exports = handleValidationErrors;
