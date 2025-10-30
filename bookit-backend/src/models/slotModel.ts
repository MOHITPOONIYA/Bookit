import { Document, model, Schema } from 'mongoose';
import { IExperience } from './experienceModel';

export interface ISlot extends Document {
  experience: IExperience['_id']; // Reference to Experience
  date: string; // "2025-10-22"
  time: string; // "09:00 am"
  totalSpots: number;
  spotsLeft: number;
}

const slotSchema = new Schema<ISlot>({
  experience: { type: Schema.Types.ObjectId, ref: 'Experience', required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
  totalSpots: { type: Number, required: true, default: 10 },
  spotsLeft: { type: Number, required: true, default: 10 },
});

export const Slot = model<ISlot>('Slot', slotSchema);