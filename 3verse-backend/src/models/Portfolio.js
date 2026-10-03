import mongoose from "mongoose";

const portfolioSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      default: "",
      trim: true,
    },

    industry: {
      type: String,
      default: "",
      trim: true,
    },
    showTitle: {
      type: Boolean,
      default: false,
    },

    showIndustry: {
      type: Boolean,
      default: false,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    result: {
      type: String,
      required: true,
      trim: true,
    },

    images: [
      {
        type: String,
        required: true,
      },
    ],

    displayOrder: {
      type: Number,
      default: 0,
    },

    isFeatured: {
      type: Boolean,
      default: false,
    },

    isPublished: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("Portfolio", portfolioSchema);
