import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    shortDescription: {
      type: String,
      required: true,
    },

    menuDescription: {
      type: String,
      default: "",
    },

    heroDescription: {
      type: String,
      required: true,
    },

    sectionTitle: {
      type: String,
      default: "",
    },

    sectionDescription: {
      type: String,
      default: "",
    },

    checklist: {
      type: [String],
      default: [],
    },

    productCategory: {
      type: String,
      default: "",
    },

    icon: {
      type: String,
      default: "",
    },

    heroImage: {
      type: String,
      default: "",
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

const Service = mongoose.model("Service", serviceSchema);

export default Service;
