const Order = require('../models/Order');
const User = require('../models/User');
const { sendSuccess, sendError } = require('../utils/responseUtils');

// Get all orders - Admin only
const getAllOrders = async (req, res) => {
	try {
		if (!req.user.hasPermission('manage_orders')) {
			return sendError(res, 'Permission denied', 403);
		}
		const orders = await Order.find()
			.populate('user', 'name email phone address')
			.populate('books.book', 'title price');
		return sendSuccess(res, orders, 'Orders retrieved successfully');
	} catch (error) {
		return sendError(res, 'Error fetching orders');
	}
};

// Get order by ID - Admin or order owner
const getOrderById = async (req, res) => {
	try {
		const { id } = req.params;
		const order = await Order.findById(id)
			.populate('user', 'name email phone address')
			.populate('books.book', 'title price');

		if (!order) {
			return sendError(res, 'Order not found', 404);
		}

		// Check if user is admin or order owner
		if (
			!req.user.hasPermission('manage_orders') &&
			order.user._id.toString() !== req.user._id.toString()
		) {
			return sendError(res, 'Permission denied', 403);
		}

		return sendSuccess(res, order);
	} catch (error) {
		return sendError(res, 'Error fetching order');
	}
};

// Create new order
const createOrder = async (req, res) => {
	try {
		const { books, shippingAddress, paymentMethod } = req.body;

		// Calculate total amount
		let totalAmount = 0;
		for (const item of books) {
			const book = await Book.findById(item.book);
			if (!book) {
				return sendError(res, `Book ${item.book} not found`, 404);
			}
			totalAmount += book.price * item.quantity;
		}

		const order = new Order({
			user: req.user._id,
			books,
			totalAmount,
			shippingAddress,
			paymentMethod,
		});

		await order.save();

		// Update user's orderCount and totalSpent
		await User.findByIdAndUpdate(req.user._id, {
			$inc: {
				orderCount: 1,
				totalSpent: totalAmount,
			},
		});

		return sendSuccess(res, order, 'Order created successfully', 201);
	} catch (error) {
		return sendError(res, 'Error creating order');
	}
};

// Update order - Admin only
const updateOrder = async (req, res) => {
	try {
		if (!req.user.hasPermission('manage_orders')) {
			return sendError(res, 'Permission denied', 403);
		}

		const { id } = req.params;
		const order = await Order.findByIdAndUpdate(id, req.body, {
			new: true,
		}).populate('user', 'name email phone address');

		if (!order) {
			return sendError(res, 'Order not found', 404);
		}

		return sendSuccess(res, order, 'Order updated successfully');
	} catch (error) {
		return sendError(res, 'Error updating order');
	}
};

// Update order status - Admin only
const updateOrderStatus = async (req, res) => {
	try {
		if (!req.user.hasPermission('manage_orders')) {
			return sendError(res, 'Permission denied', 403);
		}

		const { id } = req.params;
		const { status } = req.body;

		if (
			!['pending', 'confirmed', 'shipped', 'delivered', 'cancelled'].includes(
				status,
			)
		) {
			return sendError(res, 'Invalid status', 400);
		}

		const order = await Order.findByIdAndUpdate(
			id,
			{ status },
			{ new: true },
		).populate('user', 'name email');

		if (!order) {
			return sendError(res, 'Order not found', 404);
		}

		return sendSuccess(res, order, 'Order status updated successfully');
	} catch (error) {
		return sendError(res, 'Error updating order status');
	}
};

module.exports = {
	getAllOrders,
	getOrderById,
	createOrder,
	updateOrder,
	updateOrderStatus,
};
