import { body } from "express-validator";

export const createQuoteValidation = [
  body("fullName").trim().notEmpty().withMessage("Full name is required."),

  body("email").isEmail().withMessage("Please provide a valid email."),

  body("phone").trim().notEmpty().withMessage("Phone number is required."),

  body("product").trim().notEmpty().withMessage("Product is required."),

  body("quantity")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Quantity must be at least 1."),
];

export const updateQuoteValidation = [
  body("status")
  .optional()
  .isIn(["Pending", "Viewed", "Completed"])
  .withMessage("Invalid status."),
];
