import mongoose from "mongoose";

const specificationSchema = new mongoose.Schema(
  {
    key: {
      type: String,
      trim: true,
    },
    value: {
      type: String,
      trim: true,
    },
  },
  { _id: false },
);

const productSchema = new mongoose.Schema(
  {
    name: {
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

    category: {
      type: String,
      required: true,
      trim: true,
    },

    brand: {
      type: String,
      default: "",
      trim: true,
    },

    thumbnail: {
      type: String,
      default: "",
    },

    gallery: [
      {
        type: String,
      },
    ],

    price: {
      type: Number,
      min: 0,
    },

    salePrice: {
      type: Number,
      default: 0,
      min: 0,
    },

    sku: {
      type: String,
      default: "",
      trim: true,
    },

    stock: {
      type: Number,
      default: 0,
      min: 0,
    },

    availabilityStatus: {
      type: String,
      enum: [
        "In Stock",
        "Out of Stock",
        "Available in 1 Week",
        "Available in 2 Weeks",
        "Available in 4 Weeks",
        "Pre-Order",
      ],
      default: "In Stock",
    },

    popularity: {
      type: Number,
      default: 50,
    },

    shortDescription: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
    },

    features: [
      {
        type: String,
        trim: true,
      },
    ],

    specifications: {
      type: [specificationSchema],
      default: [],
    },

    featured: {
      type: Boolean,
      default: false,
    },

    status: {
      type: String,
      enum: ["Active", "Inactive"],
      default: "Active",
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("Product", productSchema);
