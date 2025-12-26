import { Request, Response } from 'express';
import { db } from '../lib/database.js';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-default-secret-key-change-me';

export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ message: 'Usuario y contraseña son requeridos' });
  }
  try {
    const user = await db.auth.authenticateAdmin(username, password);
    
    if (user) {
      const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, { expiresIn: '24h' });
      res.json({ user, token });
    } else {
      res.status(401).json({ message: 'Credenciales inválidas' });
    }
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

export const changePassword = async (req: Request, res: Response) => {
  const { username, oldPassword, newPassword } = req.body;

  if (!username || !oldPassword || !newPassword) {
    return res.status(400).json({ message: 'Todos los campos son requeridos' });
  }

  try {
    const success = await db.auth.changeAdminPassword(username, oldPassword, newPassword);
    
    if (success) {
      res.json({ message: 'Contraseña actualizada con éxito' });
    } else {
      res.status(401).json({ message: 'La contraseña actual es incorrecta' });
    }
  } catch (error) {
    console.error('Error al cambiar la contraseña:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};