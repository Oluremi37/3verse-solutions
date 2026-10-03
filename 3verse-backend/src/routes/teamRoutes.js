import express from "express";
import {
  createTeamMember,
  getTeamMembers,
  getTeamMember,
  updateTeamMember,
  deleteTeamMember,
} from "../controllers/teamController.js";

import { protect } from "../middleware/authMiddleware.js";
import authorize from "../middleware/authorize.js";
import upload from "../middleware/uploadMiddleware.js";
import validate from "../validation/validate.js";

import {
  createTeamValidation,
  updateTeamValidation,
} from "../validation/teamValidation.js";


const router = express.Router();

// Public Routes
router.get("/", getTeamMembers);
router.get("/:id", getTeamMember);

// Protected Routes
router.post(
  "/",
  protect,
  authorize("admin", "super-admin"),
  upload.single("image"),
  createTeamValidation,
  validate,
  createTeamMember,
);

router.put(
  "/:id",
  protect,
  authorize("admin", "super-admin"),
  upload.single("image"),
  updateTeamValidation,
  validate,
  updateTeamMember,
);

router.delete("/:id", protect, authorize("super-admin"), deleteTeamMember);

export default router;
