const express = require('express');
const router = express.Router();
const {authenticateToken} = require('../middleware/auth');
const {
	uploadBook,
	getAllBooks,
	updateBook,
	deleteBook,
	getBookById,
} = require('../controllers/bookController');

router.get('/all', getAllBooks);
router.post('/upload', authenticateToken, uploadBook);
router.get('/', getAllBooks);
router.patch('/:id', authenticateToken, updateBook);
router.delete('/:id', authenticateToken, deleteBook);
router.get('/:id', getBookById);

module.exports = router;
