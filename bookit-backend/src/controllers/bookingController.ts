import { Request, Response } from 'express';
import { Booking } from '../models/bookingModel';
import { Slot } from '../models/slotModel';
import { Experience } from '../models/experienceModel';
import { Promo } from '../models/promoModel';
import crypto from 'crypto'; // For generating a unique ref ID

// Simple tax rate (e.g., 5%)
const TAX_RATE = 0.05;

// POST /api/bookings
export const createBooking = async (req: Request, res: Response) => {
  try {
    const { slotId, quantity, name, email, promoCode } = req.body;

    // --- 1. Validation ---
    if (!slotId || !quantity || !name || !email) {
      return res.status(400).json({ message: 'Missing required fields' });
    }
    const numQuantity = Number(quantity);
    if (numQuantity <= 0) {
      return res.status(400).json({ message: 'Quantity must be positive' });
    }

    // --- 2. Atomic Slot Update (The Core Logic) ---
    // We find the slot AND check for spots AND decrement in one atomic operation.
    const updatedSlot = await Slot.findOneAndUpdate(
      {
        _id: slotId,
        spotsLeft: { $gte: numQuantity } // Find ONLY if spotsLeft >= quantity
      },
      {
        $inc: { spotsLeft: -numQuantity } // Atomically decrement spotsLeft
      },
      {
        new: true // Return the *updated* document
      }
    );

    // --- 3. Handle Failure (Sold Out) ---
    // If updatedSlot is null, it means the query failed.
    // Either the slot ID was wrong OR spotsLeft was < numQuantity.
    if (!updatedSlot) {
      return res.status(400).json({ 
        message: 'Failed to book. Slot not found or not enough spots available.' 
      });
    }

    // --- 4. Get Price & Promo Details ---
    const experience = await Experience.findById(updatedSlot.experience);
    if (!experience) {
      return res.status(404).json({ message: 'Associated experience not found' });
    }

    let discount = 0;
    const subtotal = experience.price * numQuantity;

    if (promoCode) {
      const promo = await Promo.findOne({ code: promoCode, isActive: true });
      if (promo) {
        if (promo.type === 'percentage') {
          discount = subtotal * (promo.value / 100);
        } else {
          discount = promo.value;
        }
      }
      // Note: You might want to return an error if the promoCode is invalid
    }

    // --- 5. Calculate Final Price ---
    const taxes = (subtotal - discount) * TAX_RATE;
    const total = subtotal - discount + taxes;

    // --- 6. Create the Booking ---
    const newBooking = new Booking({
      experience: experience._id,
      slot: updatedSlot._id,
      user: { name, email },
      quantity: numQuantity,
      subtotal: subtotal,
      taxes: taxes,
      discount: discount,
      total: total,
      promoCode: promoCode,
      bookingRef: crypto.randomBytes(4).toString('hex').toUpperCase() // e.g., "HUF56&SO"
    });

    await newBooking.save();

    // --- 7. Send Confirmation ---
    res.status(201).json({
      message: 'Booking confirmed!',
      booking: newBooking
    });

  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};