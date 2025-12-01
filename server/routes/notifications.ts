import { Router } from 'express';
import { subscribeToDrop, getSubscribers } from '../controllers/notificationController.js';

const router = Router();

router.post('/drop', subscribeToDrop);
router.get('/', getSubscribers);

export default router;
