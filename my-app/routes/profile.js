const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middleware/authMiddleware');
const {
	getProfile,
	updateProfile,
	getOrderHistory,
} = require('../controllers/profileController');

// All profile routes require authentication
router.use(authenticateToken);

// Profile routes
router.get('/', getProfile);
router.put('/update', updateProfile);
router.get('/orders', getOrderHistory);

module.exports = router;
