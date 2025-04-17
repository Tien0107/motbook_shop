const User = require('../models/User');
const { sendSuccess, sendError } = require('../utils/responseUtils');

// Get all customers - Admin only
const getAllCustomers = async (req, res) => {
	try {
		if (!req.user.hasPermission('manage_users')) {
			return sendError(res, 'Permission denied', 403);
		}
		const customers = await User.find({ role: 'customer' })
			.select('-password')
			.sort({ createdAt: -1 });
		return sendSuccess(res, customers);
	} catch (error) {
		return sendError(res, 'Error fetching customers');
	}
};

// Get customer by ID - Admin only
const getCustomerById = async (req, res) => {
	try {
		if (!req.user.hasPermission('manage_users')) {
			return sendError(res, 'Permission denied', 403);
		}
		const { id } = req.params;
		const customer = await User.findOne({ _id: id, role: 'customer' }).select(
			'-password',
		);

		if (!customer) {
			return sendError(res, 'Customer not found', 404);
		}
		return sendSuccess(res, customer);
	} catch (error) {
		return sendError(res, 'Error fetching customer');
	}
};

// Update customer status with history - Admin only
const updateCustomerStatus = async (req, res) => {
	try {
		if (!req.user.hasPermission('manage_users')) {
			return sendError(res, 'Permission denied', 403);
		}

		const { id } = req.params;
		const { status, reason } = req.body;

		if (!['active', 'suspended', 'banned', 'inactive'].includes(status)) {
			return sendError(res, 'Invalid status', 400);
		}

		if (!reason) {
			return sendError(res, 'Reason is required for status change', 400);
		}

		const customer = await User.findById(id);
		if (!customer) {
			return sendError(res, 'Customer not found', 404);
		}

		// Add status change to violations/history
		const statusChange = {
			type: 'status_change',
			date: new Date(),
			action: status,
			reason: reason,
			updatedBy: req.user._id,
		};

		// Update user status and add to violations history
		const updatedCustomer = await User.findOneAndUpdate(
			{ _id: id, role: 'customer' },
			{
				$set: { status },
				$push: { violations: statusChange },
			},
			{ new: true },
		).select('-password');

		return sendSuccess(
			res,
			updatedCustomer,
			'Customer status updated successfully',
		);
	} catch (error) {
		return sendError(res, 'Error updating customer status');
	}
};

// Get customer status history - Admin only
const getCustomerHistory = async (req, res) => {
	try {
		if (!req.user.hasPermission('manage_users')) {
			return sendError(res, 'Permission denied', 403);
		}

		const { id } = req.params;
		const customer = await User.findOne(
			{ _id: id, role: 'customer' },
			{ violations: 1, name: 1, email: 1, status: 1 },
		);

		if (!customer) {
			return sendError(res, 'Customer not found', 404);
		}

		return sendSuccess(res, {
			customer: {
				id: customer._id,
				name: customer.name,
				email: customer.email,
				status: customer.status,
			},
			statusHistory: customer.violations || [],
		});
	} catch (error) {
		return sendError(res, 'Error fetching customer history');
	}
};

module.exports = {
	getAllCustomers,
	getCustomerById,
	updateCustomerStatus,
	getCustomerHistory,
};
