import { Request, Response } from 'express';
import { Experience } from '../models/experienceModel';
import { Slot } from '../models/slotModel';

// GET /api/experiences
// Fetches all experiences for the home page
export const getAllExperiences = async (req: Request, res: Response) => {
  try {
    const experiences = await Experience.find();
    res.status(200).json(experiences);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

// GET /api/experiences/:id
// Fetches a single experience AND its available slots
export const getExperienceById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // 1. Find the experience
    const experience = await Experience.findById(id);

    if (!experience) {
      return res.status(404).json({ message: 'Experience not found' });
    }

    // 2. Find all slots for this experience that still have spots
    const slots = await Slot.find({ 
      experience: id,
      spotsLeft: { $gt: 0 } // Only return slots with availability
    }).sort({ date: 1, time: 1 }); // Sort them nicely

    // 3. Return both
    res.status(200).json({ experience, slots });

  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};