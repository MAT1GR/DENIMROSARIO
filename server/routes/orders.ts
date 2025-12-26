import { Router } from 'express';
import { getAllOrders, updateOrderStatus, getCustomerOrders, createOrder, getOrderById, cancelIfExpired, confirmPayment } from '../controllers/orderController.js';
import { authenticateToken } from '../middleware/authMiddleware.js';

const router = Router();

router.post('/', createOrder);
router.get('/', authenticateToken, getAllOrders);
router.get('/:id', getOrderById);
router.get('/customer/:id', getCustomerOrders);
router.put('/:id/status', authenticateToken, updateOrderStatus);
router.post('/:id/confirm-payment', confirmPayment);
router.post('/:id/cancel-if-expired', cancelIfExpired);

export default router;