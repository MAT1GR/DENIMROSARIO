import { Request, Response } from 'express';
import { db } from '../lib/database.js';


export const subscribeToDrop = async (req: Request, res: Response) => {
  const { name, phone } = req.body;
  console.log('[Notification] Subscribe request received:', { name, phone });

  if (!phone) {
    return res.status(400).json({ message: 'El número de WhatsApp es requerido.' });
  }

  const subscriberName = name || 'Suscriptor';

  try {
    const success = await db.notifications.subscribe(subscriberName, phone);
    console.log('[Notification] Subscription result:', success ? 'Success' : 'Already subscribed');
    if (success) {
      res.status(201).json({ message: '¡Gracias por suscribirte! Te avisaremos.' });
    } else {
      res.status(200).json({ message: 'Ya estás suscripto.' });
    }
  } catch (error: any) {
    console.error("Error subscribing to drop:", error);
    res.status(500).json({ message: 'Error al procesar la suscripción.' });
  }
};

export const getSubscribers = async (req: Request, res: Response) => {
  // SECURITY NOTE: This endpoint is not protected. The existing application architecture
  // does not seem to have a backend authentication middleware. Access control is handled
  // by obscurity (only admin panel calls this). This should be improved in the future.
  try {
      const subscribers = await db.notifications.getAll();
      res.json(subscribers);
  } catch (error) {
      console.error("Error fetching subscribers:", error);
      res.status(500).json({ message: 'Error al obtener los suscriptores' });
  }
};
