import express from "express";

import {
  registerAdmin,
  loginAdmin,
  changePassword,
  updateProfile,
} from "../controllers/authController.js";

import validate from "../validation/validate.js";

import {
  registerValidation,
  loginValidation,
  changePasswordValidation,
  updateProfileValidation,
} from "../validation/authValidation.js";

import { protect } from "../middleware/authMiddleware.js";
import authorize from "../middleware/authorize.js";

const router = express.Router();

router.post(
  "/register",
  protect,
  authorize("super-admin"),
  registerValidation,
  validate,
  registerAdmin,
);

router.post("/login", loginValidation, validate, loginAdmin);

router.patch(
  "/change-password",
  protect,
  changePasswordValidation,
  validate,
  changePassword,
);

router.patch(
  "/profile",
  protect,
  updateProfileValidation,
  validate,
  updateProfile,
);

export default router;
