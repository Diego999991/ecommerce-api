const express = require('express');
const router = express.Router();
const {
  createOrder,
  getUserOrders,
  getOrderById,
  getAllOrders,
  updateOrderStatus
} = require('../controllers/order.controller');
const { authMiddleware, adminMiddleware } = require('../middlewares/auth.middleware');

// Todas as rotas exigem autenticação
router.use(authMiddleware);

// Rotas do usuário
router.post('/', createOrder);
router.get('/my-orders', getUserOrders);
router.get('/:id', getOrderById);

// Rotas admin (precisa estar no final para não conflitar)
router.get('/', adminMiddleware, getAllOrders);
router.patch('/:id/status', adminMiddleware, updateOrderStatus);

module.exports = router;