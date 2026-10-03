import express from "express";
import {
  createQuote,
  getQuotes,
  getQuote,
  updateQuote,
  deleteQuote,
} from "../controllers/quoteController.js";

import { protect } from "../middleware/authMiddleware.js";
import authorize from "../middleware/authorize.js";
import validate from "../validation/validate.js";

import {
  createQuoteValidation,
  updateQuoteValidation,
} from "../validation/quoteValidation.js";
const router = express.Router();

// Public Route (Website)
// Public Route
router.post(
  "/",
  createQuoteValidation,
  validate,
  createQuote
);

// Admin Routes
router.get(
  "/",
  protect,
  authorize("admin", "super-admin"),
  getQuotes
);

router.get(
  "/:id",
  protect,
  authorize("admin", "super-admin"),
  getQuote
);

router.put(
  "/:id",
  protect,
  authorize("admin", "super-admin"),
  updateQuoteValidation,
  validate,
  updateQuote
);

router.delete(
  "/:id",
  protect,
  authorize("super-admin"),
  deleteQuote
);


export default router;
