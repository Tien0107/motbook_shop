const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middleware/auth');
const {
	getAllCustomers,
	getCustomerById,
	updateCustomerStatus,
	getCustomerHistory,
} = require('../controllers/customerController');

// All routes require authentication and admin permissions
router.use(authenticateToken);

// Admin-only customer management routes
router.get('/', getAllCustomers);
router.get('/:id', getCustomerById);
router.patch('/:id/status', updateCustomerStatus);
router.get('/:id/history', getCustomerHistory);

module.exports = router;
