import { Document, model, Schema } from 'mongoose';

// Interface for the Experience document
export interface IExperience extends Document {
  name: string;
  description: string;
  location: string;
  price: number;
  imageUrl: string;
}

const experienceSchema = new Schema<IExperience>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  location: { type: String, required: true },
  price: { type: Number, required: true },
  imageUrl: { type: String, required: true },
}, { timestamps: true });

export const Experience = model<IExperience>('Experience', experienceSchema);