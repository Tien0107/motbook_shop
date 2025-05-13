const express = require('express');
const router = express.Router();
const { authenticateToken, checkAdmin } = require('../middleware/authMiddleware');
const {
	getDashboardStats,
	getSalesAnalytics,
	getCustomerAnalytics,
	getProductAnalytics,
} = require('../controllers/analyticsController');

// Protect all analytics routes and require admin access
router.use(authenticateToken, checkAdmin);

router.get('/', (req, res) => {
	res.send('Order');
});
router.get('/dashboard', getDashboardStats);
router.get('/sales', getSalesAnalytics);
router.get('/customers', getCustomerAnalytics);
router.get('/products', getProductAnalytics);

module.exports = router;
