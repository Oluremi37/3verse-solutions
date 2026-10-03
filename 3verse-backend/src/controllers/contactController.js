import Contact from "../models/Contact.js";
import asyncHandler from "../utils/asyncHandler.js";
import APIFeatures from "../utils/apiFeatures.js";
import AppError from "../utils/AppError.js";
import sendEmail from "../utils/sendEmail.js";
import contactTemplate from "../templates/contactTemplate.js";

/**
 * Create Contact Message (Public)
 */
export const createContact = asyncHandler(async (req, res) => {
  const { fullName, email, phone, subject, message } = req.body;

  // Save to database first
  const contact = await Contact.create({
    fullName,
    email,
    phone,
    subject,
    message,
  });

  // Send email to admin
  try {
    await sendEmail({
      to: process.env.EMAIL_USER,
      subject: `New Contact Message - ${subject}`,
      html: contactTemplate(contact),
    });
  } catch (error) {
    console.error("Admin email failed:", error.message);
  }

  // Send confirmation email to customer
  try {
    await sendEmail({
      to: email,
      subject: "We've received your message",
      html: `
        <div style="font-family: Arial, sans-serif; line-height:1.6;">
          <h2 style="color:#4A9018;">Hi ${fullName},</h2>

          <p>
            Thank you for contacting <strong>3Verse Solutions</strong>.
          </p>

          <p>
            We've successfully received your message and one of our team
            members will review it shortly.
          </p>

          <p>
            We aim to respond as soon as possible.
          </p>

          <br>

          <p>Kind regards,</p>

          <h3>3Verse Solutions</h3>
        </div>
      `,
    });
  } catch (error) {
    console.error("Customer confirmation email failed:", error.message);
  }

  res.status(201).json({
    success: true,
    message: "Your message has been sent successfully.",
    contact,
  });
});

/**
 * Get All Contact Messages (Admin)
 */
export const getContacts = asyncHandler(async (req, res) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;

  const features = new APIFeatures(Contact.find(), req.query)
    .search(["fullName", "email", "phone", "subject", "message"])
    .filter()
    .sort()
    .paginate();

  const contacts = await features.query;

  const totalContacts = await Contact.countDocuments();

  const totalPages = Math.ceil(totalContacts / limit);

  res.status(200).json({
    success: true,
    count: contacts.length,
    totalContacts,
    totalPages,
    currentPage: page,
    hasNextPage: page < totalPages,
    hasPrevPage: page > 1,
    contacts,
  });
});

/**
 * Get Single Contact Message
 */
export const getContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);

  if (!contact) {
    throw new AppError("Message not found.", 404);
  }

  res.status(200).json({
    success: true,
    contact,
  });
});

/**
 * Mark Contact Message as Read
 */
export const markContactAsRead = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);

  if (!contact) {
    throw new AppError("Message not found.", 404);
  }

  contact.isRead = true;

  await contact.save();

  res.status(200).json({
    success: true,
    message: "Message marked as read.",
    contact,
  });
});

/**
 * Delete Contact Message
 */
export const deleteContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);

  if (!contact) {
    throw new AppError("Message not found.", 404);
  }

  await contact.deleteOne();

  res.status(200).json({
    success: true,
    message: "Message deleted successfully.",
  });
});
