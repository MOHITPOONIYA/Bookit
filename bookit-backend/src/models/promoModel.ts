import { Document, model, Schema } from 'mongoose';

export interface IPromo extends Document {
  code: string; // "SAVE10" or "FLAT100"
  type: 'percentage' | 'fixed';
  value: number;
  isActive: boolean;
}

const promoSchema = new Schema<IPromo>({
  code: { type: String, required: true, unique: true },
  type: { type: String, enum: ['percentage', 'fixed'], required: true },
  value: { type: Number, required: true },
  isActive: { type: Boolean, default: true },
});

export const Promo = model<IPromo>('Promo', promoSchema);