import { Schema, Document, model, models } from "mongoose";

export interface IBlog extends Document {
  id: number;
  title: string;
  image: string;
  bodyContent: string;
}

const BlogSchema = new Schema<IBlog>(
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
    image: {
      type: String,
      required: true,
    },
    bodyContent: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default models.Blog || model<IBlog>("Blog", BlogSchema);
