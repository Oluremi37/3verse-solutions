import express from "express";

import {
  createPortfolio,
  getPortfolios,
  getPortfolio,
  updatePortfolio,
  deletePortfolio,
} from "../controllers/portfolioController.js";

import { protect } from "../middleware/authMiddleware.js";
import authorize from "../middleware/authorize.js";
import validate from "../validation/validate.js";
import {
  createPortfolioValidation,
  updatePortfolioValidation,
} from "../validation/portfolioValidation.js";

import upload from "../middleware/uploadMiddleware.js";

const router = express.Router();

/**
 * Public Routes
 */
router.get("/", getPortfolios);

router.get("/:id", getPortfolio);

/**
 * Protected Routes
 */
router.post(
  "/",
  protect,
  authorize("admin", "super-admin"),
  upload.array("images", 20),
  createPortfolioValidation,
  validate,
  createPortfolio,
);

router.put(
  "/:id",
  protect,
  authorize("admin", "super-admin"),
  upload.array("images", 20),
  updatePortfolioValidation,
  validate,
  updatePortfolio,
);

router.delete(
  "/:id",
  protect,
  authorize("admin", "super-admin"),
  deletePortfolio,
);

export default router;
