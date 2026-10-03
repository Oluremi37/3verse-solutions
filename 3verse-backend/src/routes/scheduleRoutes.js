import express from "express";

import {
  createSchedule,
  getSchedules,
  getSchedule,
  updateSchedule,
  deleteSchedule,
} from "../controllers/scheduleController.js";

import { protect } from "../middleware/authMiddleware.js";
import authorize from "../middleware/authorize.js";

import validate from "../validation/validate.js";

import {
  createScheduleValidation,
  updateScheduleValidation,
} from "../validation/scheduleValidation.js";

const router = express.Router();

// Public
router.post("/", createScheduleValidation, validate, createSchedule);

// Admin
router.get("/", protect, authorize("admin", "super-admin"), getSchedules);

router.get("/:id", protect, authorize("admin", "super-admin"), getSchedule);

router.put(
  "/:id",
  protect,
  authorize("admin", "super-admin"),
  updateScheduleValidation,
  validate,
  updateSchedule,
);

router.delete("/:id", protect, authorize("super-admin"), deleteSchedule);

export default router;
