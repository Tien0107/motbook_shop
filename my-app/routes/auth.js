const express = require('express');
const router = express.Router();
const {
	signup,
	login,
	logout,
	refreshToken,
} = require('../controllers/authController');

router.post('/register', signup);
router.post('/login', login);
router.post('/logout', logout);
router.post('/refresh-token', refreshToken);

module.exports = router;
