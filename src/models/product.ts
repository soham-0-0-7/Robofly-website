import { Schema, Document, model, models } from "mongoose";

export interface IProduct extends Document {
  id: number;
  title: string;
  description: string;
  mainImage: string;
}

const ProductSchema = new Schema<IProduct>(
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

export default models.Product || model<IProduct>("Product", ProductSchema);
