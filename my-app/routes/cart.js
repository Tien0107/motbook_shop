const express = require('express');
const {
    getCartByUserId,
    addToCart,
    removeFromCart,
    clearCart,
    updateQuantity // ✅ Thêm ở đây
} = require('../controllers/cartController.js');
const { authenticateToken } = require('../middleware/authMiddleware.js');

const router = express.Router();

// router.use(authenticateToken);

// GET /api/cart/:userId
router.get('/:userId', getCartByUserId);

// POST /api/cart/add
router.post('/add', addToCart);

// ✅ PUT /api/cart/update-quantity
router.put('/update-quantity', updateQuantity);

// DELETE /api/cart/remove
router.delete('/remove', removeFromCart);

// DELETE /api/cart/clear/:userId
router.delete('/clear/:userId', clearCart);

module.exports = router;
