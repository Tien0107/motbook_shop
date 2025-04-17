const User = require('../models/User');
const cloudinary = require('../config/cloudinary');
const { sendSuccess, sendError } = require('../utils/responseUtils');

// Get user's own profile
const getProfile = async (req, res) => {
	try {
		const userId = req.user._id;
		const user = await User.findById(userId).select('-password');
		return sendSuccess(res, user);
	} catch (error) {
		return sendError(res, 'Error fetching profile');
	}
};

// Update user's own profile
const updateProfile = async (req, res) => {
	try {
		const userId = req.user._id;
		const updateData = req.body;
		const currentUser = await User.findById(userId);

		if (!currentUser) {
			return sendError(res, 'User not found', 404);
		}

		// Handle avatar update
		if (
			updateData.avatar &&
			currentUser.avatar &&
			currentUser.avatar.public_id
		) {
			try {
				await cloudinary.uploader.destroy(currentUser.avatar.public_id);
			} catch (error) {
				console.error('Error deleting old avatar:', error);
			}
		}

		// Prevent updating sensitive fields
		const {
			password,
			role,
			status,
			permissions,
			...safeUpdateData
		} = updateData;

		const updatedUser = await User.findByIdAndUpdate(userId, safeUpdateData, {
			new: true,
		}).select('-password');

		return sendSuccess(res, updatedUser, 'Profile updated successfully');
	} catch (error) {
		console.error('Update profile error:', error);
		return sendError(res, 'Error updating profile');
	}
};

// Get user's order history
const getOrderHistory = async (req, res) => {
	try {
		const userId = req.user._id;
		const orders = await Order.find({ user: userId })
			.sort({ createdAt: -1 })
			.populate('books.book', 'title price');

		return sendSuccess(res, orders);
	} catch (error) {
		return sendError(res, 'Error fetching order history');
	}
};

module.exports = {
	getProfile,
	updateProfile,
	getOrderHistory,
};
