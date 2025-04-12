const express = require('express');
const router = express.Router();
const { signup, login, logout } = require('../controllers/authController');

router.post('/signup', async (req, res) => {
  const client = req.app.locals.db;
  await signup(req, res, client);
});

router.post('/login', async (req, res) => {
  const client = req.app.locals.db;
  await login(req, res, client);
});

router.post('/logout', logout);

module.exports = router;