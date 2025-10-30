import { Document, model, Schema } from 'mongoose';
import { IExperience } from './experienceModel';
import { ISlot } from './slotModel';

export interface IBooking extends Document {
  experience: IExperience['_id'];
  slot: ISlot['_id'];
  user: {
    name: string;
    email: string;
  };
  quantity: number;
  subtotal: number;
  taxes: number;
  total: number;
  promoCode?: string;
  discount: number;
  bookingRef: string; // e.g., "HUF56&SO"
}

const bookingSchema = new Schema<IBooking>({
  experience: { type: Schema.Types.ObjectId, ref: 'Experience', required: true },
  slot: { type: Schema.Types.ObjectId, ref: 'Slot', required: true },
  user: {
    name: { type: String, required: true },
    email: { type: String, required: true },
  },
  quantity: { type: Number, required: true },
  subtotal: { type: Number, required: true },
  taxes: { type: Number, required: true },
  total: { type: Number, required: true },
  promoCode: { type: String },
  discount: { type: Number, default: 0 },
  bookingRef: { type: String, required: true, unique: true },
}, { timestamps: true });

export const Booking = model<IBooking>('Booking', bookingSchema);