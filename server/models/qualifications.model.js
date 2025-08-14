import mongoose from "mongoose";

const QualificationSchema = new mongoose.Schema(
  {
    title: { type: String, trim: true, required: true },
    firstname: { type: String, trim: true, required: true },
    lastname: { type: String, trim: true, required: true },
    email: { type: String, trim: true, lowercase: true, required: true },
    completion: { type: Date, required: true },
    description: { type: String, trim: true, required: true }
  },
  { timestamps: true }
);

export default mongoose.models.Qualification || mongoose.model("Qualification", QualificationSchema);
