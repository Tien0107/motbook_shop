const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middleware/authMiddleware');
const {
	uploadBook,
	getAllBooks,
	updateBook,
	deleteBook,
	getBookById,
	searchBooks,
} = require('../controllers/bookController');

router.get('/all', getAllBooks);
router.get('/search', searchBooks);
router.post('/upload', authenticateToken, uploadBook);
router.get('/', getAllBooks);
router.patch('/:id', authenticateToken, updateBook);
router.delete('/:id', authenticateToken, deleteBook);
router.get('/:id', getBookById);

module.exports = router;
