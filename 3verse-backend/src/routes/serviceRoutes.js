import express from "express";
import {
  createService,
  getServices,
  getService,
  getServiceBySlug,
  updateService,
  deleteService,
} from "../controllers/serviceController.js";

import { protect } from "../middleware/authMiddleware.js";
import authorize from "../middleware/authorize.js";

import validate from "../validation/validate.js";
import {
  createServiceValidation,
  updateServiceValidation,
} from "../validation/serviceValidation.js";


const router = express.Router();

// Public Routes
router.get("/", getServices);

router.get("/slug/:slug", getServiceBySlug);

router.get("/:id", getService);

// Protected Routes
router.post(
  "/",
  protect,
  authorize("admin", "super-admin"),
  createServiceValidation,
  validate,
  createService,
);

router.put(
  "/:id",
  protect,
  authorize("admin", "super-admin"),
  updateServiceValidation,
  validate,
  updateService,
);

router.delete(
  "/:id",
  protect,
  authorize("super-admin"),
  deleteService,
);
export default router;
