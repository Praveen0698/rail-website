import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  roll: string;
  zone: string;
  name: string;
  fatherName: string;
  postApplied: string;
  controlNo: string;
  dob: Date;
  result: string;
}

const UserSchema = new Schema<IUser>(
  {
    roll: { type: String, required: true },
    zone: { type: String, required: true },
    name: { type: String, required: true },
    fatherName: { type: String, required: true },
    postApplied: { type: String, required: true },
    controlNo: { type: String, required: true },
    dob: { type: Date, required: true },
    result: { type: String, default: "pending" },
  },
  { timestamps: true }
);

export default mongoose.models.User ||
  mongoose.model<IUser>("User", UserSchema);