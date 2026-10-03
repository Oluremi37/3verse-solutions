import { body } from "express-validator";

export const createProductValidation = [
  body("name").trim().notEmpty().withMessage("Product name is required."),

  body("category").trim().notEmpty().withMessage("Category is required."),

  body("price").isNumeric().withMessage("Price must be a number."),

  body("status")
    .optional()
    .isIn(["Active", "Inactive"])
    .withMessage("Invalid status."),

  body("description").optional().trim(),

  body("features").optional(),
  body("thumbnail").optional().trim(),
];

export const updateProductValidation = [
  body("name").optional().trim(),

  body("category").optional().trim(),

  body("price").optional().isNumeric().withMessage("Price must be a number."),

  body("status")
    .optional()
    .isIn(["Active", "Inactive"])
    .withMessage("Invalid  status."),

  body("description").optional().trim(),

  body("features").optional(),

  body("thumbnail").optional(),
];
