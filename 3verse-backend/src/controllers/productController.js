import Product from "../models/Product.js";
import asyncHandler from "../utils/asyncHandler.js";
import APIFeatures from "../utils/apiFeatures.js";
import AppError from "../utils/AppError.js";

// Create Product
export const createProduct = asyncHandler(async (req, res) => {
  const productData = { ...req.body };

  // ---------- FEATURES ----------
  if (productData.features) {
    try {
      productData.features = JSON.parse(productData.features);
    } catch {
      productData.features = String(productData.features)
        .split(/\r?\n/)
        .map((item) => item.trim())
        .filter(Boolean);
    }
  }

  // ---------- GALLERY ----------
  if (productData.gallery) {
    try {
      productData.gallery = JSON.parse(productData.gallery);
    } catch {
      productData.gallery = [];
    }
  }

  // ---------- SPECIFICATIONS ----------
  if (productData.specifications) {
    try {
      productData.specifications = JSON.parse(productData.specifications);
    } catch {
      productData.specifications = [];
    }
  }

  // ---------- FEATURED ----------
  if (productData.featured !== undefined) {
    productData.featured =
      productData.featured === true || productData.featured === "true";
  }

  // ---------- POPULARITY ----------
  if (productData.popularity) {
    productData.popularity = Number(productData.popularity);
  }

  // ---------- IMAGE ----------
  if (req.file) {
    productData.thumbnail = req.file.path;
  }

  const product = await Product.create(productData);

  res.status(201).json({
    success: true,
    message: "Product created successfully.",
    product,
  });
});

// Get All Products
export const getProducts = asyncHandler(async (req, res) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;

  const features = new APIFeatures(Product.find(), req.query)
    .search(["name", "category", "brand", "sku", "status"])
    .filter()
    .sort()
    .paginate();

  const products = await features.query;

  const totalProducts = await Product.countDocuments();

  const active = await Product.countDocuments({
    status: "Active",
  });

  const inactive = await Product.countDocuments({
    status: "Inactive",
  });

  const inStock = await Product.countDocuments({
    stock: { $gt: 0 },
  });

  const outOfStock = await Product.countDocuments({
    stock: 0,
  });

  res.status(200).json({
    success: true,
    products,

    stats: {
      total: totalProducts,
      active,
      inactive,
      inStock,
      outOfStock,
    },

    pagination: {
      currentPage: page,
      totalPages: Math.ceil(totalProducts / limit),
      hasNextPage: page * limit < totalProducts,
      hasPrevPage: page > 1,
    },
  });
});

// Get Single Product
// Get Single Product
export const getProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    throw new AppError("Product not found.", 404);
  }

  res.status(200).json({
    success: true,
    product,
  });
});

// Get Product By Slug
export const getProductBySlug = asyncHandler(async (req, res) => {
  const product = await Product.findOne({
    slug: req.params.slug,
  });

  if (!product) {
    throw new AppError("Product not found.", 404);
  }

  res.status(200).json({
    success: true,
    product,
  });
});

// Update Product
export const updateProduct = asyncHandler(async (req, res) => {
  const updateData = { ...req.body };

  // ---------- FEATURES ----------
  if (updateData.features) {
    try {
      updateData.features = JSON.parse(updateData.features);
    } catch {
      updateData.features = String(updateData.features)
        .split(/\r?\n/)
        .map((item) => item.trim())
        .filter(Boolean);
    }
  }

  // ---------- GALLERY ----------
  if (updateData.gallery) {
    try {
      updateData.gallery = JSON.parse(updateData.gallery);
    } catch {
      updateData.gallery = [];
    }
  }

  // ---------- SPECIFICATIONS ----------
  if (updateData.specifications) {
    try {
      updateData.specifications = JSON.parse(updateData.specifications);
    } catch {
      updateData.specifications = [];
    }
  }

  // ---------- FEATURED ----------
  if (updateData.featured !== undefined) {
    updateData.featured =
      updateData.featured === true || updateData.featured === "true";
  }

  // ---------- POPULARITY ----------
  if (updateData.popularity) {
    updateData.popularity = Number(updateData.popularity);
  }

  // ---------- IMAGE ----------
  if (req.file) {
    updateData.thumbnail = req.file.path;
  }

  const product = await Product.findByIdAndUpdate(req.params.id, updateData, {
    new: true,
    runValidators: true,
  });

  if (!product) {
    throw new AppError("Product not found.", 404);
  }

  res.status(200).json({
    success: true,
    message: "Product updated successfully.",
    product,
  });
});

// Delete Product
export const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findByIdAndDelete(req.params.id);

  if (!product) {
    throw new AppError("Product not found.", 404);
  }

  res.status(200).json({
    success: true,
    message: "Product deleted successfully.",
  });
});
