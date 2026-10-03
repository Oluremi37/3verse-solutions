import { body } from "express-validator";

/**
 * Create Team Member Validation
 */
export const createTeamValidation = [
  body("fullName").trim().notEmpty().withMessage("Full name is required."),

  body("position").trim().notEmpty().withMessage("Position is required."),

  body("teamType").trim().notEmpty().withMessage("Team type is required."),

  body("bio").custom((value, { req }) => {
    if (
      req.body.teamType === "Managing Director" ||
      req.body.teamType === "Chief Technology Officer"
    ) {
      if (!value || value.trim() === "") {
        throw new Error("Bio is required.");
      }
    }

    return true;
  }),
];
/**
 * Update Team Member Validation
 */
export const updateTeamValidation = [
  body("fullName")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Full name cannot be empty."),

  body("position")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Position cannot be empty."),

  body("bio").custom((value, { req }) => {
    if (
      req.body.teamType === "Managing Director" ||
      req.body.teamType === "Chief Technology Officer"
    ) {
      if (!value || value.trim() === "") {
        throw new Error("Bio is required.");
      }
    }

    return true;
  }),

  body("teamType")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Team type cannot be empty."),
];
