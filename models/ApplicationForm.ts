/* models/ApplicationForm.ts */

import mongoose, { Schema, Document } from "mongoose";

export interface IApplicationForm extends Document {
  name: string;
  fatherName: string;
  designation: string;
  dob: string;
  bloodGroup: string;
  address: string;
  photo: string; // base64
  signature: string; // base64
}

const ApplicationFormSchema = new Schema<IApplicationForm>(
  {
    name: { type: String, required: true },
    fatherName: { type: String, required: true },
    designation: { type: String, required: true },
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
