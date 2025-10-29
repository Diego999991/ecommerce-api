const express = require('express');
const router = express.Router();
const { register, login, getProfile } = require('../controllers/auth.controller');
const { authMiddleware } = require('../middlewares/auth.middleware');

// Rotas públicas
router.post('/register', register);
router.post('/login', login);

// Rotas protegidas (precisa estar logado)
router.get('/profile', authMiddleware, getProfile);

module.exports = router;