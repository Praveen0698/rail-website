import mongoose from "mongoose";

const assignmentSchema = new mongoose.Schema({
  title: { type: String, required: true },
  startTime: { type: Date, required: true },
  durationMinutes: { type: Number, required: true },

  questionIds: [{ type: mongoose.Schema.Types.ObjectId, ref: "Question" }],

  // ✅ FIXED USERS (store full object)
  users: [
    {
      _id: { type: String }, // store as string (from frontend)
      name: { type: String, required: true },
      rollNo: { type: String, required: true },
      designation: { type: String },
    },
  ],

  createdAt: { type: Date, default: Date.now },
  marks: { type: Number, default: 1 },
});

export default mongoose.models.Assignment ||
  mongoose.model("Assignment", assignmentSchema);
