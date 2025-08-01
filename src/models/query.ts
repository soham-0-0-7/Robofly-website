import { Schema, Document, model, models } from "mongoose";

export interface IQuery extends Document {
  querytype: string;
  name: string;
  email: string;
  phone: string;
  status: string;
  data: object;
  createdAt: Date;
}

const QuerySchema = new Schema<IQuery>(
  {
    querytype: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    status: { type: String, required: true },
    data: { type: Object, required: true },
    createdAt: { type: Date, default: Date.now, expires: "30d" }, // TTL: auto-delete after 30 days
  },
  {
    timestamps: false, // Disable auto-timestamps because we define `createdAt` manually
  }
);

export default models.Query || model<IQuery>("Query", QuerySchema);
