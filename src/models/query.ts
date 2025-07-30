import { Schema, Document, model, models } from "mongoose";

export interface IQuery extends Document {
  querytype: string;
  name: string;
  email: string;
  phone: string;
  status: string;
  data: object; // Use object instead of any
}

const QuerySchema = new Schema<IQuery>({
  querytype: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  status: {type: String, required: true },
  data: { type: Object, required: true }, // Use Object instead of Schema.Types.Mixed
}, { timestamps: true });

export default models.Query || model<IQuery>("Query", QuerySchema);