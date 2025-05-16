const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
	title: {
		type: String,
		required: [true, 'Tiêu đề sách là bắt buộc'],
	},
	author: {
		type: String,
		required: [true, 'Tác giả là bắt buộc'],
	},
	category: {
		type: String,
	},
	price: {
		type: Number,
		required: [true, 'Giá sách là bắt buộc'],
		min: [0, 'Giá sách không thể âm'],
	},
	stock: {
		type: Number,
		default: 0,
	},
	images: [
		{
			url: String,
			public_id: String,
		},
	],
	description: {
		type: String,
		default: '',
	},
	publishYear: {
		type: Number,
		min: [1800, 'Năm xuất bản không hợp lệ'],
		max: [new Date().getFullYear(), 'Năm xuất bản không thể trong tương lai'],
	},
	category: {
		type: String,
		default: 'Khác',
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

// Update timestamp on save
bookSchema.pre('save', function(next) {
	this.updatedAt = Date.now();
	next();
});

module.exports = mongoose.model('Book', bookSchema);
