const Order = require('../models/Order');
const User = require('../models/User');
const Book = require('../models/Book');
const { sendSuccess, sendError } = require('../utils/responseUtils');

// Get dashboard overview - Admin only
const getDashboardStats = async (req, res) => {
  try {
    if (!req.user.hasPermission('view_analytics')) {
      return sendError(res, 'Permission denied', 403);
    }

    const totalOrders = await Order.countDocuments();
    const totalCustomers = await User.countDocuments({ role: 'customer' });
    const totalBooks = await Book.countDocuments();
    const totalRevenue = await Order.aggregate([
      { $match: { status: 'delivered' } },
      { $group: { _id: null, total: { $sum: '$totalAmount' } } }
    ]);

    return sendSuccess(res, {
      totalOrders,
      totalCustomers,
      totalBooks,
      totalRevenue: totalRevenue[0]?.total || 0
    });
  } catch (error) {
    return sendError(res, 'Error fetching dashboard statistics');
  }
};

// Get sales analytics - Admin only
const getSalesAnalytics = async (req, res) => {
  try {
    if (!req.user.hasPermission('view_analytics')) {
      return sendError(res, 'Permission denied', 403);
    }

    const { period = 'monthly' } = req.query;
    const now = new Date();
    let dateGroup;

    switch (period) {
      case 'daily':
        dateGroup = { $dayOfMonth: '$createdAt' };
        break;
      case 'weekly':
        dateGroup = { $week: '$createdAt' };
        break;
      case 'monthly':
        dateGroup = { $month: '$createdAt' };
        break;
      default:
        return sendError(res, 'Invalid period specified', 400);
    }

    const salesData = await Order.aggregate([
      {
        $match: {
          createdAt: { 
            $gte: new Date(now.getFullYear(), now.getMonth() - 1, 1) 
          }
        }
      },
      {
        $group: {
          _id: dateGroup,
          totalSales: { $sum: '$totalAmount' },
          orderCount: { $sum: 1 }
        }
      },
      { $sort: { _id: 1 } }
    ]);

    return sendSuccess(res, salesData);
  } catch (error) {
    return sendError(res, 'Error fetching sales analytics');
  }
};

// Get customer analytics - Admin only
const getCustomerAnalytics = async (req, res) => {
  try {
    if (!req.user.hasPermission('view_analytics')) {
      return sendError(res, 'Permission denied', 403);
    }

    const customerStats = await User.aggregate([
      { $match: { role: 'customer' } },
      {
        $group: {
          _id: null,
          totalCustomers: { $sum: 1 },
          avgOrdersPerCustomer: { $avg: '$orderCount' },
          avgSpentPerCustomer: { $avg: '$totalSpent' },
          topSpenders: {
            $push: {
              $cond: [
                { $gt: ['$totalSpent', 0] },
                { id: '$_id', name: '$name', totalSpent: '$totalSpent' },
                null
              ]
            }
          }
        }
      },
      { 
        $project: {
          _id: 0,
          totalCustomers: 1,
          avgOrdersPerCustomer: 1,
          avgSpentPerCustomer: 1,
          topSpenders: {
            $slice: [
              {
                $sortArray: {
                  input: {
                    $filter: {
                      input: '$topSpenders',
                      cond: { $ne: ['$$this', null] }
                    }
                  },
                  sortBy: { totalSpent: -1 }
                }
              },
              5
            ]
          }
        }
      }
    ]);

    return sendSuccess(res, customerStats[0] || {});
  } catch (error) {
    return sendError(res, 'Error fetching customer analytics');
  }
};

// Get product analytics - Admin only
const getProductAnalytics = async (req, res) => {
  try {
    if (!req.user.hasPermission('view_analytics')) {
      return sendError(res, 'Permission denied', 403);
    }

    const productStats = await Order.aggregate([
      { $unwind: '$books' },
      {
        $group: {
          _id: '$books.book',
          totalSold: { $sum: '$books.quantity' },
          totalRevenue: { 
            $sum: { $multiply: ['$books.quantity', '$books.price'] }
          }
        }
      },
      { $sort: { totalSold: -1 } },
      { $limit: 10 },
      {
        $lookup: {
          from: 'books',
          localField: '_id',
          foreignField: '_id',
          as: 'bookDetails'
        }
      },
      {
        $project: {
          _id: 1,
          totalSold: 1,
          totalRevenue: 1,
          title: { $arrayElemAt: ['$bookDetails.title', 0] },
          author: { $arrayElemAt: ['$bookDetails.author', 0] }
        }
      }
    ]);

    return sendSuccess(res, productStats);
  } catch (error) {
    return sendError(res, 'Error fetching product analytics');
  }
};

module.exports = {
  getDashboardStats,
  getSalesAnalytics,
  getCustomerAnalytics,
  getProductAnalytics
};