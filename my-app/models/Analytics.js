// const mongoose = require('mongoose');

// // Analytics Model (cho việc lưu trữ dữ liệu phân tích)
// const analyticsSchema = new mongoose.Schema({
// 	date: { type: Date, required: true },
// 	totalSales: { type: Number, default: 0 },
// 	totalOrders: { type: Number, default: 0 },
// 	totalCustomers: { type: Number, default: 0 },
// 	pendingOrders: { type: Number, default: 0 },
// 	dailyVisitors: { type: Number, default: 0 },
// 	monthlySales: [
// 		{
// 			month: Date,
// 			amount: Number,
// 		},
// 	],
// 	topProducts: [
// 		{
// 			productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Book' },
// 			name: String,
// 			sales: Number,
// 		},
// 	],
// 	recentTransactions: [
// 		{
// 			orderId: String,
// 			amount: Number,
// 			date: Date,
// 			status: String,
// 		},
// 	],
// });

// const Analytics = mongoose.model('Analytics', analyticsSchema);

// module.exports = Analytics;
