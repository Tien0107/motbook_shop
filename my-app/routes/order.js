const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middleware/authMiddleware');
const {
	getAllOrders,
	getOrderById,
	createOrder,
	updateOrder,
	updateOrderStatus,
} = require('../controllers/orderController');

router.use(authenticateToken);

router.get('/', getAllOrders);
router.get('/:id', getOrderById);
router.post('/', createOrder);
router.put('/:id', updateOrder);
router.patch('/:id/status', updateOrderStatus);

module.exports = router;
