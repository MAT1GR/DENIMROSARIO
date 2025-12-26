import { Router } from 'express';
import { getAllCustomers, getCustomerById } from '../controllers/customerController.js';
import { getCustomerOrders } from '../controllers/orderController.js';
import { authenticateToken } from '../middleware/authMiddleware.js';

const router = Router();

router.get('/', authenticateToken, getAllCustomers);
router.get('/:id', authenticateToken, getCustomerById);
router.get('/:id/orders', authenticateToken, getCustomerOrders);

export default router;