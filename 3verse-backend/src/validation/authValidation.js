import { body } from "express-validator";

export const registerValidation = [
  body("fullName").trim().notEmpty().withMessage("Full name is required."),

  body("email").isEmail().withMessage("Please provide a valid email."),

  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters."),
];

export const loginValidation = [
  body("email").isEmail().withMessage("Please provide a valid email."),

  body("password").notEmpty().withMessage("Password is required."),
];
export const changePasswordValidation = [
  body("currentPassword")
    .notEmpty()
    .withMessage("Current password is required."),

  body("newPassword")
    .isLength({ min: 8 })
    .withMessage("New password must be at least 8 characters."),
];
export const updateProfileValidation = [
  body("fullName")
    .trim()
    .notEmpty()
    .withMessage("Full name is required."),

  body("email")
    .isEmail()
    .withMessage("Please provide a valid email."),
];