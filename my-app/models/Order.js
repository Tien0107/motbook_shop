const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true,
	},
	books: [
		{
			book: {
				type: mongoose.Schema.Types.ObjectId,
				ref: 'Book',
				required: true,
			},
			quantity: {
				type: Number,
				required: true,
				min: [1, 'Số lượng phải lớn hơn 0'],
			},
			price: {
				type: Number,
				required: true,
			},
		},
	],
	totalAmount: {
		type: Number,
		required: true,
	},
	status: {
		type: String,
		enum: ['pending', 'confirmed', 'shipped', 'delivered', 'cancelled'],
		default: 'pending',
	},
	shippingAddress: {
		street: String,
		city: String,
		state: String,
		zipCode: String,
		country: String,
	},
	paymentMethod: {
		type: String,
		required: true,
	},
	paymentStatus: {
		type: String,
		enum: ['pending', 'completed', 'failed'],
		default: 'pending',
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
	updatedAt: {
		type: Date,
		default: Date.now,
	},
});

module.exports = mongoose.model('Order', orderSchema);
