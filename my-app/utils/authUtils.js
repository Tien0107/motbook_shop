const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

require('dotenv').config();

const hashPassword = async password => {
	return await bcrypt.hash(password, 10);
};

const comparePasswords = async (password, hashedPassword) => {
	return await bcrypt.compare(password, hashedPassword);
};

const generateToken = userData => {
	return jwt.sign(
		{ userId: userData._id || userData.userId, email: userData.email },
		process.env.JWT_SECRET,
		{ expiresIn: '1h' },
	);
};

module.exports = {
	hashPassword,
	comparePasswords,
	generateToken,
};
