import { body } from "express-validator";

export const createScheduleValidation = [
  body("fullName").trim().notEmpty().withMessage("Full name is required."),

  body("email").isEmail().withMessage("Please provide a valid email."),

  body("preferredDate").notEmpty().withMessage("Preferred date is required."),

  body("consultationType")
    .isIn(["In-Person Meeting", "Phone Call"])
    .withMessage("Invalid consultation type."),

  body("location")
    .if(body("consultationType").equals("In-Person Meeting"))
    .trim()
    .notEmpty()
    .withMessage("Location is required for in-person meetings."),

  body("phoneNumber")
    .if(body("consultationType").equals("Phone Call"))
    .trim()
    .notEmpty()
    .withMessage("Phone number is required for phone calls."),
];

export const updateScheduleValidation = [
  body("status")
    .optional()
    .isIn(["Pending", "Confirmed", "Completed", "Cancelled"])
    .withMessage("Invalid status."),
];
