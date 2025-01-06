import { Router } from 'express';
import { createOrder, getOrders, getOrderById } from '../controllers/order.controller.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = Router();

router.post('/', authMiddleware, createOrder);
router.get('/', authMiddleware, getOrders);
router.get('/:id', authMiddleware, getOrderById);

export default router;