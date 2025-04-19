const express = require('express');
const router = express.Router();
const { authenticateToken, checkAdmin } = require('../middleware/authMiddleware');
const {
	uploadBook,
	updateBook,
	deleteBook,
} = require('../controllers/bookController');
const {
	getAllUsers,
	deleteUser,
	updateUserRole,
} = require('../controllers/adminController');

const {
	getAllCustomers,
	updateCustomerStatus,
} = require('../controllers/customerController');
const {
	getAllOrders,
	getOrderById,
	updateOrder,
	updateOrderStatus,
} = require('../controllers/orderController');

const {
	getAllUserPermissions,
	updateUserPermissions,
} = require('../controllers/adminController');
const { uploadMultiple } = require('../controllers/uploadController');
// const {
// 	getAllMaterials,
// 	updateMaterial,
// } = require('../controllers/adminController');

// Áp dụng middleware cho tất cả các route admin
router.use(authenticateToken, checkAdmin);

// Quản lý sách
router.post('/books',uploadMultiple, uploadBook);
router.put('/books/:id', updateBook);
router.delete('/books/:id', deleteBook);

// Quản lý người dùng
router.get('/users', getAllUsers);
router.delete('/users/:id', deleteUser);
router.put('/users/:id/role', updateUserRole);

// Quản lý khách hàng
router.get('/customers', getAllCustomers);
router.put('/customers/:id/status', updateCustomerStatus);

// Quản lý đơn hàng
router.get('/orders', getAllOrders);
router.get('/orders/:id', getOrderById);
router.put('/orders/:id', updateOrder);
router.patch('/orders/:id/status', updateOrderStatus);

// // Quản lý tài khoản
// router.get('/accounts', getAllAccounts);
// router.put('/accounts/:id/role', updateUserRole);

// Quản lý quyền
router.get('/permissions', getAllUserPermissions);
router.put('/permissions/:id', updateUserPermissions);

// // Quản lý tài liệu
// router.get('/materials', getAllMaterials);
// router.put('/materials/:id', updateMaterial);

module.exports = router;
