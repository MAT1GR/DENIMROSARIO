import { Request, Response } from 'express';
import { db } from '../lib/database.js';

export const handleSubscribe = async (req: Request, res: Response) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ message: 'Email es requerido' });
  }

  try {
    const result = await db.subscribers.addSubscriber(email);
    if (result.changes > 0) {
      res.status(201).json({ message: 'Suscripción exitosa.' });
    } else {
      // This could happen if the email already exists and the INSERT OR IGNORE statement does nothing
      res.status(200).json({ message: 'Este email ya estaba suscripto.' });
    }
  } catch (error: any) {
    // Check for unique constraint error explicitly
    if (error.code === 'SQLITE_CONSTRAINT_UNIQUE') {
        return res.status(200).json({ message: 'Este email ya estaba suscripto.' });
    }
    console.error('Subscription error:', error);
    res.status(500).json({ message: 'Error interno del servidor al procesar la suscripción.' });
  }
};

export const getSubscribers = async (req: Request, res: Response) => {
    // SECURITY NOTE: This endpoint is not protected. The existing application architecture
    // does not seem to have a backend authentication middleware. Access control is handled
    // by obscurity (only admin panel calls this). This should be improved in the future.
    try {
        const subscribers = await db.subscribers.getAllSubscribers();
        res.json(subscribers);
    } catch (error) {
        console.error("Error fetching subscribers:", error);
        res.status(500).json({ message: 'Error al obtener los suscriptores' });
    }
};
