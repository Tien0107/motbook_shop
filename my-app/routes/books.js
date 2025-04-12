const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/auth');
const { uploadBook, getAllBooks, updateBook, deleteBook, getBookById } = require('../controllers/bookController');

router.post('/upload', authenticateToken, async (req, res) => {
  const client = req.app.locals.db;
  await uploadBook(req, res, client);
});

router.get('/', async (req, res) => {
  const client = req.app.locals.db;
  await getAllBooks(req, res, client);
});

router.patch('/:id', authenticateToken, async (req, res) => {
  const client = req.app.locals.db;
  await updateBook(req, res, client);
});

router.delete('/:id', authenticateToken, async (req, res) => {
  const client = req.app.locals.db;
  await deleteBook(req, res, client);
});

router.get('/:id', async (req, res) => {
  const client = req.app.locals.db;
  await getBookById(req, res, client);
});

module.exports = router;