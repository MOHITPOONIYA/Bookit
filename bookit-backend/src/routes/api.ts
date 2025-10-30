import { Router } from 'express';
import { getAllExperiences, getExperienceById } from '../controllers/experienceController';
import { createBooking } from '../controllers/bookingController';
import { validatePromo } from '../controllers/promoController';

const router = Router();

// --- Experience Routes ---
// GET /api/experiences - Return list of experiences (for Home Page)
router.get('/experiences', getAllExperiences);

// GET /api/experiences/:id - Return details and slot availability (for Details Page)
router.get('/experiences/:id', getExperienceById);

// --- Booking Route ---
// POST /api/bookings - Accept booking details (for Checkout Page)
router.post('/bookings', createBooking);

// --- Promo Route ---
// POST /api/promo/validate - Validate promo codes (for Checkout Page)
router.post('/promo/validate', validatePromo);

export default router;