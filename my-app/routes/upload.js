const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middleware/authMiddleware');
const {
	handleSingleUpload,
	handleMultipleUpload,
	deleteImage,
} = require('../controllers/uploadController');

// All upload routes require authentication
router.use(authenticateToken);

// Avatar upload - single image
router.post('/avatar', handleSingleUpload);

// Product images upload - multiple images
router.post('/product', handleMultipleUpload);

// Delete image
router.delete('/image', deleteImage);

module.exports = router;
