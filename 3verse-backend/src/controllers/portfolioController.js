import Portfolio from "../models/Portfolio.js";
import APIFeatures from "../utils/apiFeatures.js";
import asyncHandler from "../utils/asyncHandler.js";
import AppError from "../utils/AppError.js";

/**
 * Create Portfolio
 */
export const createPortfolio = asyncHandler(async (req, res) => {
  const {
    title,
    industry,
    showTitle,
    showIndustry,
    description,
    result,
    displayOrder,
    isFeatured,
    isPublished,
  } = req.body;

  const images = req.files ? req.files.map((file) => file.path) : [];

  const portfolio = await Portfolio.create({
    title,
    industry,
    showTitle,
    showIndustry,
    description,
    result,
    images,
    displayOrder,
    isFeatured,
    isPublished,
  });

  res.status(201).json({
    success: true,
    message: "Portfolio created successfully.",
    portfolio,
  });
});

/**
 * Get All Portfolio
 */
export const getPortfolios = asyncHandler(async (req, res) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;

  const features = new APIFeatures(Portfolio.find(), req.query)
    .search(["title", "industry", "description"])
    .filter()
    .sort()
    .paginate();

  const portfolios = await features.query;

  const totalPortfolios = await Portfolio.countDocuments();

  res.status(200).json({
    success: true,
    count: portfolios.length,
    totalPortfolios,
    totalPages: Math.ceil(totalPortfolios / limit),
    currentPage: page,
    portfolios,
  });
});

/**
 * Get Single Portfolio
 */
export const getPortfolio = asyncHandler(async (req, res) => {
  const portfolio = await Portfolio.findById(req.params.id);

  if (!portfolio) {
    throw new AppError("Portfolio not found.", 404);
  }

  res.status(200).json({
    success: true,
    portfolio,
  });
});

/**
 * Update Portfolio
 */
export const updatePortfolio = asyncHandler(async (req, res) => {
  const portfolio = await Portfolio.findById(req.params.id);

  if (!portfolio) {
    throw new AppError("Portfolio not found.", 404);
  }

  const {
    title,
    industry,
    showTitle,
    showIndustry,
    description,
    result,
    displayOrder,
    isFeatured,
    isPublished,
  } = req.body;

if (title !== undefined) {
  portfolio.title = title;
}

if (industry !== undefined) {
  portfolio.industry = industry;
  }
  
  if (showTitle !== undefined) {
    portfolio.showTitle = showTitle;
  }

  if (showIndustry !== undefined) {
    portfolio.showIndustry = showIndustry;
  }

if (description !== undefined) {
  portfolio.description = description;
}

if (result !== undefined) {
  portfolio.result = result;
}

if (displayOrder !== undefined) {
  portfolio.displayOrder = displayOrder;
}

if (isFeatured !== undefined) {
  portfolio.isFeatured = isFeatured;
}

if (isPublished !== undefined) {
  portfolio.isPublished = isPublished;
}
  if (req.files && req.files.length > 0) {
    portfolio.images = req.files.map((file) => file.path);
  }

  await portfolio.save();

  res.status(200).json({
    success: true,
    message: "Portfolio updated successfully.",
    portfolio,
  });
});

/**
 * Delete Portfolio
 */
export const deletePortfolio = asyncHandler(async (req, res) => {
  const portfolio = await Portfolio.findById(req.params.id);

  if (!portfolio) {
    throw new AppError("Portfolio not found.", 404);
  }

  await portfolio.deleteOne();

  res.status(200).json({
    success: true,
    message: "Portfolio deleted successfully.",
  });
});
