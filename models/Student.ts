import mongoose, { Schema, Document, Model } from "mongoose";

export interface IStudent extends Document {
  rollNo: string;
  name: string;
  dob: Date;
}

const StudentSchema: Schema<IStudent> = new Schema(
  {
    rollNo: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    dob: { type: Date, required: true },
  },
  { timestamps: true },
);

const Student: Model<IStudent> =
  mongoose.models.Student || mongoose.model<IStudent>("Student", StudentSchema);

export default Student;
