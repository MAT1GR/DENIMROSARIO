import { Router } from 'express';
import { login, changePassword } from '../controllers/authController.js'; // Se importa changePassword
import { authenticateToken } from '../middleware/authMiddleware.js';

const router = Router();

router.post('/login', login);
router.post('/change-password', authenticateToken, changePassword); // Se añade la nueva ruta

export default router;