import Quote from "../models/Quote.js";
import asyncHandler from "../utils/asyncHandler.js";
import APIFeatures from "../utils/apiFeatures.js";
import AppError from "../utils/AppError.js";
import sendEmail from "../utils/sendEmail.js";

// Create Quote
export const createQuote = asyncHandler(async (req, res) => {
  const quote = await Quote.create(req.body);

  // Email to Admin
  await sendEmail({
    to: process.env.EMAIL_USER,
    subject: "New Quote Request",
    html: `
      <h2>New Quote Request</h2>

      <p><strong>Name:</strong> ${quote.fullName}</p>
      <p><strong>Company:</strong> ${quote.companyName || "N/A"}</p>
      <p><strong>Email:</strong> ${quote.email}</p>
      <p><strong>Phone:</strong> ${quote.phone}</p>
      <p><strong>Product:</strong> ${quote.product}</p>
      <p><strong>Quantity:</strong> ${quote.quantity}</p>

      <p><strong>Details:</strong></p>

      <p>${quote.details || "No additional details."}</p>
    `,
  });

  // Confirmation Email
  await sendEmail({
    to: quote.email,
    subject: "We've received your quote request",
    html: `
      <h2>Hello ${quote.fullName},</h2>

      <p>
        Thank you for contacting <strong>3Verse Solutions</strong>.
      </p>

      <p>Your quote request has been received successfully.</p>

      <p>Our sales team will contact you within 24 hours.</p>

      <br>

      <p>Regards,</p>

      <h3>3Verse Solutions</h3>
    `,
  });

  res.status(201).json({
    success: true,
    message: "Quote request submitted successfully.",
    quote,
  });
});

// Get All Quotes
export const getQuotes = asyncHandler(async (req, res) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;

  const features = new APIFeatures(Quote.find(), req.query)
    .search([
      "fullName",
      "companyName",
      "email",
      "phone",
      "product",
      "details",
      "status",
    ])
    .filter()
    .sort()
    .paginate();

  const quotes = await features.query;

  const totalQuotes = await Quote.countDocuments();

  const pending = await Quote.countDocuments({
    status: "Pending",
  });

  const viewed = await Quote.countDocuments({
    status: "Viewed",
  });

  const completed = await Quote.countDocuments({
    status: "Completed",
  });

  res.status(200).json({
    success: true,
    quotes,

    stats: {
      total: totalQuotes,
      pending,
      viewed,
      completed,
    },

    pagination: {
      currentPage: page,
      totalPages: Math.ceil(totalQuotes / limit),
      hasNextPage: page * limit < totalQuotes,
      hasPrevPage: page > 1,
    },
  });
});

// Get Single Quote
export const getQuote = asyncHandler(async (req, res) => {
  const quote = await Quote.findById(req.params.id);

  if (!quote) {
    throw new AppError("Quote not found.", 404);
  }

  // Automatically mark as viewed
  if (quote.status === "Pending") {
    quote.status = "Viewed";
    await quote.save();
  }

  return res.status(200).json({
    success: true,
    quote,
  });
});

// Update Quote
export const updateQuote = asyncHandler(async (req, res) => {
  const { status } = req.body;

  const quote = await Quote.findById(req.params.id);

  if (!quote) {
    throw new AppError("Quote not found.", 404);
  }

  if (status) {
    quote.status = status;
  }

  await quote.save();

  res.status(200).json({
    success: true,
    message: "Quote updated successfully.",
    quote,
  });
});

// Delete Quote
export const deleteQuote = asyncHandler(async (req, res) => {
  const quote = await Quote.findByIdAndDelete(req.params.id);

  if (!quote) {
    throw new AppError("Quote not found.", 404);
  }

  res.status(200).json({
    success: true,
    message: "Quote deleted successfully.",
  });
});
