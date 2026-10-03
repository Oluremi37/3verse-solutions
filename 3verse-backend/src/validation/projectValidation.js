import { body } from "express-validator";

export const createProjectValidation = [
  body("title").trim().notEmpty().withMessage("Project title is required."),

  body("category")
    .trim()
    .notEmpty()
    .withMessage("Project category is required."),

  body("description")
    .trim()
    .notEmpty()
    .withMessage("Project description is required."),

  body("client").optional().trim(),

  body("location").optional().trim(),

  body("completionDate").optional().trim(),

  body("displayOrder")
    .optional()
    .isNumeric()
    .withMessage("Display order must be a number."),

  body("isPublished")
    .optional()
    .isBoolean()
    .withMessage("Published status must be true or false."),
];

export const updateProjectValidation = [
  body("title").optional().trim(),

  body("category").optional().trim(),

  body("description").optional().trim(),

  body("client").optional().trim(),

  body("location").optional().trim(),

  body("completionDate").optional().trim(),

  body("displayOrder")
    .optional()
    .isNumeric()
    .withMessage("Display order must be a number."),

  body("isPublished")
    .optional()
    .isBoolean()
    .withMessage("Published status must be true or false."),
];
