import mongoose from "mongoose";

const scheduleSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },

    preferredDate: {
      type: Date,
      required: true,
    },

    consultationType: {
      type: String,
      enum: ["In-Person Meeting", "Phone Call"],
      required: true,
    },

    location: {
      type: String,
      trim: true,
      default: "",
    },

    phoneNumber: {
      type: String,
      trim: true,
      default: "",
    },

    status: {
      type: String,
      enum: ["Pending", "Confirmed", "Completed", "Cancelled"],
      default: "Pending",
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("Schedule", scheduleSchema);
