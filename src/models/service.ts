import { Schema, Document, model, models } from "mongoose";

export interface IService extends Document {
  id: number;
  title: string;
  description: string;
  mainImage: string;
}

const ServiceSchema = new Schema<IService>(
  {
    id: {
      type: Number,
      required: true,
      unique: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    mainImage: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default models.Service || model<IService>("Service", ServiceSchema);
