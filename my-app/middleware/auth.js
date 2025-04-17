const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { sendError } = require('../utils/responseUtils');

const authenticateToken = async (req, res, next) => {
	try {
		const authHeader = req.headers.authorization;
		const token = authHeader && authHeader.split(' ')[1];

		if (!token) {
			return sendError(res, 'Access denied. No token provided.', 401);
		}

		const decoded = jwt.verify(token, process.env.JWT_SECRET);
		const user = await User.findById(decoded.userId).select('-password');

		if (!user) {
			return sendError(res, 'Invalid token. User not found.', 401);
		}

		req.user = user;
		next();
	} catch (error) {
		return sendError(res, 'Invalid token', 401);
	}
};

const checkAdmin = async (req, res, next) => {
	if (!req.user || !req.user.isAdmin()) {
		return sendError(res, 'Access denied. Admin rights required.', 403);
	}
	next();
};

const checkPermission = permission => async (req, res, next) => {
	if (!req.user || !req.user.hasPermission(permission)) {
		return sendError(
			res,
			`Access denied. Required permission: ${permission}`,
			403,
		);
	}
	next();
};

module.exports = { authenticateToken, checkAdmin, checkPermission };
