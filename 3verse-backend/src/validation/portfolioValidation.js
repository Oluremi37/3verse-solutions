import { body } from "express-validator";

/**
 * Create Portfolio Validation
 */
export const createPortfolioValidation = [
  body("title").optional().trim(),

  body("industry").optional().trim(),

  body("description")
    .trim()
    .notEmpty()
    .withMessage("Project description is required."),

  body("result").trim().notEmpty().withMessage("Project result is required."),

  body("displayOrder")
    .optional()
    .isNumeric()
    .withMessage("Display order must be a number."),

  body("isFeatured")
    .optional()
    .isBoolean()
    .withMessage("Featured status must be true or false."),

  body("isPublished")
    .optional()
    .isBoolean()
    .withMessage("Published status must be true or false."),
];

/**
 * Update Portfolio Validation
 */
export const updatePortfolioValidation = [
  body("title").optional().trim(),

  body("industry").optional().trim(),

  body("description")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Project description cannot be empty."),

  body("result")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Project result cannot be empty."),

  body("displayOrder")
    .optional()
    .isNumeric()
    .withMessage("Display order must be a number."),

  body("isFeatured")
    .optional()
    .isBoolean()
    .withMessage("Featured status must be true or false."),

  body("isPublished")
    .optional()
    .isBoolean()
    .withMessage("Published status must be true or false."),
];
