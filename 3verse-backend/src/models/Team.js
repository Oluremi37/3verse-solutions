import mongoose from "mongoose";

const teamSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },

    position: {
      type: String,
      required: true,
      trim: true,
    },

    teamType: {
      type: String,
      enum: ["Managing Director", "Chief Technology Officer", "Management"],
      default: "Management",
    },
    bio: {
      type: String,
      trim: true,
      default: "",
    },

    image: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      enum: ["executive", "management"],
      default: "management",
    },

    displayOrder: {
      type: Number,
      default: 0,
    },

    linkedin: {
      type: String,
      default: "",
    },

    twitter: {
      type: String,
      default: "",
    },

    facebook: {
      type: String,
      default: "",
    },

    instagram: {
      type: String,
      default: "",
    },

    isPublished: {
      type: Boolean,
      default: true,
    },

    isPreview: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

const Team = mongoose.model("Team", teamSchema);

export default Team;
