import mongoose from "mongoose";

const ContactSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      trim: true,
      required: [true, "firstname is required"],
      minlength: 1,
      maxlength: 100,
    },
    lastname: {
      type: String,
      trim: true,
      required: [true, "lastname is required"],
      minlength: 1,
      maxlength: 100,
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      required: [true, "email is required"],
      // simple email format check (lightweight)
      match: [/^\S+@\S+\.\S+$/, "email is invalid"],
    },
  },
  { timestamps: true }
);

// Avoid OverwriteModelError on hot-reload (nodemon)
export default mongoose.models.Contact || mongoose.model("Contact", ContactSchema);
