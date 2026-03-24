import mongoose, { Document, Schema } from "mongoose";

export interface IAdmitCard extends Document {
  roll_no:  string;
  dob:      Date;
  card:     string;   // base64 data URL  →  "data:image/png;base64,..."
  cardType: string;   // mime type        →  "image/png" | "application/pdf"
  cardName: string;   // original filename
}

const AdmitCardSchema = new Schema<IAdmitCard>(
  {
    roll_no:  { type: String, required: true, unique: true, trim: true },
    dob:      { type: Date,   required: true },
    card:     { type: String, required: true },
    cardType: { type: String, required: true },
    cardName: { type: String, required: true },
  },
  { timestamps: true }
);

const AdmitCard =
  mongoose.models.AdmitCard ||
  mongoose.model<IAdmitCard>("AdmitCard", AdmitCardSchema);

export default AdmitCard;