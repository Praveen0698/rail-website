/* models/ApplicationForm.ts */

import mongoose, { Schema, Document } from "mongoose";

export interface IApplicationForm extends Document {
  rollNumber: string;
  name: string;
  fatherName: string;
  designation: string;
  group: string;
  zone: string;
  dob: string;
  bloodGroup: string;
  address: string;
  photo: string;
  signature: string;
}

const ApplicationFormSchema = new Schema<IApplicationForm>(
  {
    rollNumber: { type: String, required: true },
    name: { type: String, required: true },
    fatherName: { type: String, required: true },
    designation: { type: String, required: true },
    zone: { type: String },
    group: { type: String },
    dob: { type: String, required: true },
    bloodGroup: { type: String, required: true },
    address: { type: String, required: true },

    photo: { type: String, required: true }, // base64
    signature: { type: String, required: true }, // base64
  },
  { timestamps: true },
);

export default mongoose.models.ApplicationForm ||
  mongoose.model<IApplicationForm>("ApplicationForm", ApplicationFormSchema);
