import { body } from "express-validator";

export const createContactValidation = [
  body("fullName").trim().notEmpty().withMessage("Full name is required."),

  body("email").isEmail().withMessage("Please provide a valid email."),

  body("subject").trim().notEmpty().withMessage("Subject is required."),

  body("message").trim().notEmpty().withMessage("Message is required."),
];
