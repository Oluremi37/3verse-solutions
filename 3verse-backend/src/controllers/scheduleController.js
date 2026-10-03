import Schedule from "../models/Schedule.js";
import asyncHandler from "../utils/asyncHandler.js";
import AppError from "../utils/AppError.js";
import sendEmail from "../utils/sendEmail.js";

/**
 * Create Schedule
 */
export const createSchedule = asyncHandler(async (req, res) => {
  const {
    fullName,
    email,
    preferredDate,
    consultationType,
    location,
    phoneNumber,
  } = req.body;

  const schedule = await Schedule.create({
    fullName,
    email,
    preferredDate,
    consultationType,
    location,
    phoneNumber,
  });

  // Email notification to admin
  try {
    await sendEmail({
      to: process.env.EMAIL_USER,
      subject: "New Consultation Booking",
      html: `
        <h2>New Consultation Request</h2>

        <p><strong>Name:</strong> ${fullName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Date:</strong> ${new Date(
          preferredDate,
        ).toLocaleString()}</p>
        <p><strong>Consultation:</strong> ${consultationType}</p>
        ${location ? `<p><strong>Location:</strong> ${location}</p>` : ""}
        ${
          phoneNumber
            ? `<p><strong>Phone Number:</strong> ${phoneNumber}</p>`
            : ""
        }
      `,
    });
  } catch (error) {
    console.error("Admin notification email failed:", error.message);
  }

  // Confirmation email to customer
  try {
    await sendEmail({
      to: email,
      subject: "Your Consultation Request",
      html: `
        <h2>Hello ${fullName},</h2>

        <p>
          Thank you for scheduling a consultation with 3Verse Solutions.
        </p>

        <p>
          Our team will review your request and confirm the meeting shortly.
        </p>

        <p>
          <strong>Preferred Date:</strong>
          ${new Date(preferredDate).toLocaleString()}
        </p>

        <p>
          <strong>Consultation Type:</strong>
          ${consultationType}
        </p>

        ${location ? `<p><strong>Location:</strong> ${location}</p>` : ""}

        ${
          phoneNumber
            ? `<p><strong>Phone Number:</strong> ${phoneNumber}</p>`
            : ""
        }

        <br />

        <p>Kind regards,</p>

        <h3>3Verse Solutions</h3>
      `,
    });
  } catch (error) {
    console.error("Customer confirmation email failed:", error.message);
  }

  res.status(201).json({
    success: true,
    message: "Consultation booked successfully.",
    schedule,
  });
});

/**
 * Get All Schedules
 */
export const getSchedules = asyncHandler(async (req, res) => {
  const schedules = await Schedule.find().sort({
    createdAt: -1,
  });

  res.status(200).json({
    success: true,
    count: schedules.length,
    schedules,
  });
});

/**
 * Get Single Schedule
 */
export const getSchedule = asyncHandler(async (req, res) => {
  const schedule = await Schedule.findById(req.params.id);

  if (!schedule) {
    throw new AppError("Schedule not found.", 404);
  }

  res.status(200).json({
    success: true,
    schedule,
  });
});

/**
 * Update Schedule
 */
export const updateSchedule = asyncHandler(async (req, res) => {
  const schedule = await Schedule.findById(req.params.id);

  if (!schedule) {
    throw new AppError("Schedule not found.", 404);
  }

  const {
    fullName,
    email,
    preferredDate,
    consultationType,
    location,
    phoneNumber,
    status,
  } = req.body;

  if (fullName !== undefined) {
    schedule.fullName = fullName;
  }

  if (email !== undefined) {
    schedule.email = email;
  }

  if (preferredDate !== undefined) {
    schedule.preferredDate = preferredDate;
  }

  if (consultationType !== undefined) {
    schedule.consultationType = consultationType;
  }

  if (location !== undefined) {
    schedule.location = location;
  }

  if (phoneNumber !== undefined) {
    schedule.phoneNumber = phoneNumber;
  }

  if (status !== undefined) {
    schedule.status = status;
  }

  await schedule.save();

  res.status(200).json({
    success: true,
    message: "Schedule updated successfully.",
    schedule,
  });
});

/**
 * Delete Schedule
 */
export const deleteSchedule = asyncHandler(async (req, res) => {
  const schedule = await Schedule.findById(req.params.id);

  if (!schedule) {
    throw new AppError("Schedule not found.", 404);
  }

  await schedule.deleteOne();

  res.status(200).json({
    success: true,
    message: "Schedule deleted successfully.",
  });
});
