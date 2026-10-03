import mongoose from "mongoose";

const quoteSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },

    companyName: {
      type: String,
      trim: true,
      default: "",
    },

    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },

    phone: {
      type: String,
      required: true,
      trim: true,
    },

    product: {
      type: String,
      required: true,
      trim: true,
    },

    quantity: {
      type: Number,
      min: 1,
      default: 1,
    },

    details: {
      type: String,
      default: "",
    },

    status: {
      type: String,
      enum: ["Pending", "Viewed", "Completed"],
      default: "Pending",
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("Quote", quoteSchema);
