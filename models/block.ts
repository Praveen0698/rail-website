import mongoose, { Schema, Document } from "mongoose";

export interface IBlock extends Document {
  isBlocked: boolean;
}

const BlockSchema = new Schema<IBlock>(
  {
    isBlocked: { type: Boolean, default: false },
  },
  { timestamps: true },
);

export default mongoose.models.Block ||
  mongoose.model<IBlock>("Block", BlockSchema);
