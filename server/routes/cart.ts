import { Router } from 'express';
import { captureAbandonedCart } from '../controllers/cartController.js';

const router = Router();

router.post('/capture', captureAbandonedCart);

export default router;
