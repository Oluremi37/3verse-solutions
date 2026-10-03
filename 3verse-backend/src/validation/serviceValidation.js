import { body } from "express-validator";

/**
 * Create Service Validation
 */
export const createServiceValidation = [
  body("title")
    .trim()
    .notEmpty()
    .withMessage("Service title is required.")
    .bail()
    .isLength({ min: 3 })
    .withMessage("Service title must be at least 3 characters."),

  body("slug").trim().notEmpty().withMessage("Slug is required."),

  body("shortDescription")
    .trim()
    .notEmpty()
    .withMessage("Short description is required."),

  body("heroDescription")
    .trim()
    .notEmpty()
    .withMessage("Hero description is required."),

  body("isPublished")
    .optional()
    .isBoolean()
    .withMessage("isPublished must be true or false."),
];

/**
 * Update Service Validation
 */
export const updateServiceValidation = [
  body("title")
    .optional()
    .trim()
    .isLength({ min: 3 })
    .withMessage("Service title must be at least 3 characters."),

  body("slug")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Slug cannot be empty."),

  body("shortDescription")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Short description cannot be empty."),

  body("heroDescription")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Hero description cannot be empty."),

  body("isPublished")
    .optional()
    .isBoolean()
    .withMessage("isPublished must be true or false."),
];
