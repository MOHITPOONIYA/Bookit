import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { Experience } from './models/experienceModel';
import { Slot } from './models/slotModel';
import { Promo } from './models/promoModel';
import { Booking } from './models/bookingModel'; // To clear old bookings

// Load .env variables
dotenv.config();

// --- Sample Data ---
const sampleExperiences = [
  {
    name: 'Kayaking',
    description: 'Curated small-group experience. Certified guide. Safety first with gear included.',
    location: 'Udupi',
    price: 999,
    imageUrl: 'https://i.ibb.co/TBXpTnjs/Screenshot-2025-10-30-044012.png'
  },
  {
    name: 'Nandi Hills Sunrise',
    description: 'Curated small-group experience. Certified guide. Safety first with gear included.',
    location: 'Bangalore',
    price: 899,
    imageUrl: 'https://i.ibb.co/JWDWnnT5/Screenshot-2025-10-30-044629.png'
  },
  {
    name: 'Coffee Trail',
    description: 'Curated small-group experience. Certified guide. Safety first with gear included.',
    location: 'Coorg',
    price: 1299,
    imageUrl: 'https://i.ibb.co/Y452v4SP/Screenshot-2025-10-30-045027.png'
  },
  {
    name: 'Kayaking',
    description: 'Curated small-group experience. Certified guide. Safety first with gear included.',
    location: 'Udupi, Karnataka',
    price: 999,
    imageUrl: 'https://i.ibb.co/8DmthhH1/Screenshot-2025-10-30-044100.png'
  },
  {
    name: 'Nandi Hills Sunrise',
    description: 'Curated small-group experience. Certified guide. Safety first with gear included.',
    location: 'Bangalore',
    price: 899,
    imageUrl: 'https://i.ibb.co/8gQfcJ8W/Screenshot-2025-10-30-044659.png'
  },
  {
    name: 'Boat Cruise',
    description: 'Curated small-group experience. Certified guide. Safety first with gear included.',
    location: 'Sunderban',
    price: 999,
    imageUrl: 'https://i.ibb.co/XZWk89nM/Screenshot-2025-10-30-045317.png'
  },
  {
    name: 'Bunjee Jumping',
    description: 'Curated small-group experience. Certified guide. Safety first with gear included.',
    location: 'Sunderban', // Note: Your Figma shows Manali, but data is Sunderban
    price: 999,
    imageUrl: 'https://i.ibb.co/Xkfn11cc/Screenshot-2025-10-30-045402.png'
  },
  {
    name: 'Coffee Trail',
    description: 'Curated small-group experience. Certified guide. Safety first with gear included.',
    location: 'Coorg',
    price: 1299,
    imageUrl: 'https://i.ibb.co/WvYDBmQ0/Screenshot-2025-10-30-045056.png'
  },
];

const samplePromos = [
  {
    code: 'SAVE10',
    type: 'percentage',
    value: 10,
    isActive: true
  },
  {
    code: 'FLAT100',
    type: 'fixed',
    value: 100,
    isActive: true
  }
];

// --- Seed Script Logic ---

const connectDB = async () => {
  if (!process.env.MONGO_URI) {
    console.error('MONGO_URI is not defined in .env file');
    process.exit(1);
  }
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB Connected for seeding...');
  } catch (err: any) {
    console.error(err.message);
    process.exit(1);
  }
};

const deleteData = async () => {
  try {
    // Clear all collections
    await Experience.deleteMany();
    await Slot.deleteMany();
    await Promo.deleteMany();
    await Booking.deleteMany();
    console.log('Data Destroyed!');
  } catch (err: any) {
    console.error(err.message);
  }
};

/**
 * NEW, DYNAMIC IMPORT FUNCTION
 * This function loops over every experience and adds slots to it.
 */
const importData = async () => {
  try {
    // 1. Insert Experiences
    const createdExperiences = await Experience.insertMany(sampleExperiences);
    console.log('Experiences Imported!');

    // 2. Insert Promos
    await Promo.insertMany(samplePromos);
    console.log('Promos Imported!');

    // 3. Create slots for ALL experiences
    const allSlots: any[] = []; // Array to hold all slots

    // Loop over each experience you just created
    for (const exp of createdExperiences) {
      
      // --- SPECIAL LOGIC FOR THE "KAYAKING" (Udupi) from your design ---
      // This will add the exact slots from your Figma image
      if (exp.name === 'Kayaking' && exp.location === 'Udupi') {
        console.log(`Adding DESIGN-SPECIFIC slots for: ${exp.name} (${exp.location})`);
        const designSlots = [
          { experience: exp._id, date: 'Oct 22', time: '09:00 am', totalSpots: 10, spotsLeft: 2 },
          { experience: exp._id, date: 'Oct 22', time: '07:00 am', totalSpots: 4, spotsLeft: 4 },
          { experience: exp._id, date: 'Oct 22', time: '11:00 am', totalSpots: 10, spotsLeft: 5 },
          { experience: exp._id, date: 'Oct 22', time: '01:00 pm', totalSpots: 10, spotsLeft: 0 }, // Sold out
          { experience: exp._id, date: 'Oct 23', time: '09:00 am', totalSpots: 10, spotsLeft: 10 },
          { experience: exp._id, date: 'Oct 23', time: '11:00 am', totalSpots: 10, spotsLeft: 10 },
          { experience: exp._id, date: 'Oct 23', time: '07:00 am', totalSpots: 10, spotsLeft: 10 },
          { experience: exp._id, date: 'Oct 24', time: '07:00 am', totalSpots: 4, spotsLeft: 4 },
          { experience: exp._id, date: 'Oct 24', time: '11:00 am', totalSpots: 10, spotsLeft: 5 },
          { experience: exp._id, date: 'Oct 24', time: '09:00 am', totalSpots: 10, spotsLeft: 2 },
          { experience: exp._id, date: 'Oct 24', time: '01:00 pm', totalSpots: 10, spotsLeft: 0 },
          { experience: exp._id, date: 'Oct 25', time: '07:00 am', totalSpots: 4, spotsLeft: 4 },
          { experience: exp._id, date: 'Oct 25', time: '09:00 am', totalSpots: 10, spotsLeft: 2 },
          { experience: exp._id, date: 'Oct 25', time: '11:00 am', totalSpots: 10, spotsLeft: 5 },
          { experience: exp._id, date: 'Oct 25', time: '01:00 pm', totalSpots: 10, spotsLeft: 0 },
          { experience: exp._id, date: 'Oct 26', time: '07:00 am', totalSpots: 4, spotsLeft: 4 },
          { experience: exp._id, date: 'Oct 26', time: '09:00 am', totalSpots: 10, spotsLeft: 2 },
          { experience: exp._id, date: 'Oct 26', time: '11:00 am', totalSpots: 10, spotsLeft: 5 },
          { experience: exp._id, date: 'Oct 26', time: '01:00 pm', totalSpots: 10, spotsLeft: 0 }
        ];
        allSlots.push(...designSlots);
      } else {
        // --- GENERIC SLOTS FOR ALL OTHER EXPERIENCES ---
        console.log(`Adding GENERIC slots for: ${exp.name} (${exp.location})`);
        const genericSlots = [
          { experience: exp._id, date: 'Oct 22', time: '07:00 am', totalSpots: 4, spotsLeft: 4 },
          { experience: exp._id, date: 'Oct 22', time: '09:00 am', totalSpots: 10, spotsLeft: 2 },
          { experience: exp._id, date: 'Oct 22', time: '11:00 am', totalSpots: 10, spotsLeft: 5 },
          { experience: exp._id, date: 'Oct 22', time: '01:00 pm', totalSpots: 10, spotsLeft: 0 }, // Sold out
          { experience: exp._id, date: 'Oct 23', time: '09:00 am', totalSpots: 10, spotsLeft: 10 },
          { experience: exp._id, date: 'Oct 23', time: '11:00 am', totalSpots: 10, spotsLeft: 10 },
          { experience: exp._id, date: 'Oct 23', time: '07:00 am', totalSpots: 10, spotsLeft: 10 },
          { experience: exp._id, date: 'Oct 24', time: '07:00 am', totalSpots: 4, spotsLeft: 4 },
          { experience: exp._id, date: 'Oct 24', time: '09:00 am', totalSpots: 10, spotsLeft: 2 },
          { experience: exp._id, date: 'Oct 24', time: '11:00 am', totalSpots: 10, spotsLeft: 5 },
          { experience: exp._id, date: 'Oct 24', time: '01:00 pm', totalSpots: 10, spotsLeft: 0 },
          { experience: exp._id, date: 'Oct 25', time: '07:00 am', totalSpots: 4, spotsLeft: 4 },
          { experience: exp._id, date: 'Oct 25', time: '09:00 am', totalSpots: 10, spotsLeft: 2 },
          { experience: exp._id, date: 'Oct 25', time: '11:00 am', totalSpots: 10, spotsLeft: 5 },
          { experience: exp._id, date: 'Oct 25', time: '01:00 pm', totalSpots: 10, spotsLeft: 0 },
          { experience: exp._id, date: 'Oct 26', time: '07:00 am', totalSpots: 4, spotsLeft: 4 },
          { experience: exp._id, date: 'Oct 26', time: '09:00 am', totalSpots: 10, spotsLeft: 2 },
          { experience: exp._id, date: 'Oct 26', time: '11:00 am', totalSpots: 10, spotsLeft: 5 },
          { experience: exp._id, date: 'Oct 26', time: '01:00 pm', totalSpots: 10, spotsLeft: 0 }
        ];
        allSlots.push(...genericSlots);
      }
    }

    // Insert all collected slots into the database in one go
    await Slot.insertMany(allSlots);
    console.log('All Slots Imported!');

  } catch (err: any) {
    console.error(err.message);
  }
};

// --- Run Script ---
const runSeed = async () => {
  await connectDB();
  
  if (process.argv[2] === '-d') {
    await deleteData();
  } else {
    await deleteData(); // Always clear first
    await importData();
  }
  
  mongoose.connection.close();
  process.exit();
};

runSeed();