import { Request, Response } from 'express';
import { Promo } from '../models/promoModel';

// POST /api/promo/validate
export const validatePromo = async (req: Request, res: Response) => {
  try {
    const { code } = req.body;
    if (!code) {
      return res.status(400).json({ message: 'Promo code is required' });
    }

    const promo = await Promo.findOne({ code: code, isActive: true });

    if (!promo) {
      return res.status(404).json({ message: 'Invalid or expired promo code' });
    }

    // Return promo details for the frontend to use
    res.status(200).json({
      message: 'Promo code applied!',
      code: promo.code,
      type: promo.type,
      value: promo.value
    });

  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};