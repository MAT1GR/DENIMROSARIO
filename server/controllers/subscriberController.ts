import { Request, Response } from 'express';
import { db } from '../lib/database.js';

export const handleSubscribe = async (req: Request, res: Response) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ message: 'Email es requerido' });
  }

  try {
    const success = await db.notifications.subscribe("Web Subscriber", email); // Use db.notifications and provide a name
    if (success) {
      res.status(201).json({ message: 'Suscripción exitosa.' });
    } else {
      // If success is false, it means the email already exists
      res.status(200).json({ message: 'Este email ya estaba suscripto.' });
    }
  } catch (error: any) {
    console.error('Subscription error:', error);
    res.status(500).json({ message: 'Error interno del servidor al procesar la suscripción.' });
  }
};

export const getSubscribers = async (req: Request, res: Response) => {
    // SECURITY NOTE: This endpoint is not protected. The existing application architecture
    // does not seem to have a backend authentication middleware. Access control is handled
    // by obscurity (only admin panel calls this). This should be improved in the future.
    try {
        const subscribers = await db.notifications.getAll(); // Use db.notifications.getAll()
        res.json(subscribers);
    } catch (error) {
        console.error("Error fetching subscribers:", error);
        res.status(500).json({ message: 'Error al obtener los suscriptores' });
    }
};
