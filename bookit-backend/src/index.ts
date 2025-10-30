import express, { Express, Request, Response } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import apiRoutes from "./routes/api"; // Import your main router

// Load environment variables from .env file
dotenv.config();

const app: Express = express();

// 1. Middleware
app.use(cors()); // Allow cross-origin requests
app.use(express.json()); // Parse incoming JSON bodies

// 2. Database Connection
const uri = process.env.MONGO_URI;

if (!uri) {
  console.error('MONGO_URI is not defined. Please check your .env file.');
  process.exit(1); // Exit the process with an error code
}

mongoose.connect(uri)
  .then(() => console.log('MongoDB connected successfully.'))
  .catch(err => console.error('MongoDB connection error:', err));

// 3. API Routes
// All routes from api.ts will be prefixed with /api
app.use('/api', apiRoutes);

// 4. Root Route (Optional: for testing)
app.get('/', (req: Request, res: Response) => {
  res.send('BookIt API is running...');
});

// 5. Start Server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`[server]: Server is running on http://localhost:${port}`);
});