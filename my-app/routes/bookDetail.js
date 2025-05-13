const express = require('express');
const router = express.Router();
const {
  uploadBook,
  getAllBooks,
  updateBook,
  deleteBook,
  getBookById,
  searchBooks
} = require('../controllers/bookController');

// Public
router.get('/', getAllBooks);
router.get('/search', searchBooks);
router.get('/:id', getBookById); // ✅ Sửa lại đúng theo yêu cầu

// Admin
router.post('/', uploadBook);
router.put('/:id', updateBook);
router.delete('/:id', deleteBook);

module.exports = router;
