import Admin from "../models/Admin.js";
import generateToken from "../utils/generateToken.js";
import asyncHandler from "../utils/asyncHandler.js";
import AppError from "../utils/AppError.js";

/**
 * Register Admin
 */
export const registerAdmin = asyncHandler(async (req, res) => {
  const { fullName, email, password, role } = req.body;

  const existingAdmin = await Admin.findOne({ email });

  if (existingAdmin) {
    throw new AppError("Admin already exists.", 400);
  }

  const admin = await Admin.create({
    fullName,
    email,
    password,
    role,
  });

  const token = generateToken(admin);

  res.status(201).json({
    success: true,
    message: "Admin created successfully.",
    token,
    admin: {
      id: admin._id,
      fullName: admin.fullName,
      email: admin.email,
      role: admin.role,
    },
  });
});

/**
 * Login Admin
 */
export const loginAdmin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const admin = await Admin.findOne({ email });

  if (!admin) {
    throw new AppError("Invalid email or password.", 401);
  }

  const isMatch = await admin.comparePassword(password);

  if (!isMatch) {
    throw new AppError("Invalid email or password.", 401);
  }

  const token = generateToken(admin);

  res.status(200).json({
    success: true,
    message: "Login successful.",
    token,
    admin: {
      id: admin._id,
      fullName: admin.fullName,
      email: admin.email,
      role: admin.role,
    },
  });
});

/**
 * Change Admin Password
 */
export const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        message: "Current password and new password are required.",
      });
    }

    if (newPassword.length < 8) {
      return res.status(400).json({
        success: false,
        message: "New password must be at least 8 characters.",
      });
    }

    // Get the admin WITH the password
    const admin = await Admin.findById(req.admin._id);

    if (!admin) {
      return res.status(404).json({
        success: false,
        message: "Admin not found.",
      });
    }

    // Verify current password
    const isMatch = await admin.comparePassword(currentPassword);

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Current password is incorrect.",
      });
    }

    // Prevent using the same password
    const isSamePassword = await admin.comparePassword(newPassword);

    if (isSamePassword) {
      return res.status(400).json({
        success: false,
        message: "New password must be different from the current password.",
      });
    }

    // Update password
    admin.password = newPassword;

    // Admin model pre-save hook will hash it
    await admin.save();

    return res.status(200).json({
      success: true,
      message: "Password changed successfully.",
    });
  } catch (error) {
    console.error("Change password error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to change password.",
    });
  }
};

/**
 * Update Admin Profile
 */
export const updateProfile = async (req, res) => {
  try {
    const { fullName, email } = req.body;

    if (!fullName || !email) {
      return res.status(400).json({
        success: false,
        message: "Full name and email are required.",
      });
    }

    const admin = await Admin.findById(req.admin._id);

    if (!admin) {
      return res.status(404).json({
        success: false,
        message: "Admin not found.",
      });
    }

    // Check if another admin is already using this email
    const existingAdmin = await Admin.findOne({
      email: email.toLowerCase().trim(),
      _id: { $ne: admin._id },
    });

    if (existingAdmin) {
      return res.status(400).json({
        success: false,
        message: "This email is already being used by another admin.",
      });
    }

    admin.fullName = fullName.trim();
    admin.email = email.toLowerCase().trim();

    await admin.save();

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully.",
      admin: {
        id: admin._id,
        fullName: admin.fullName,
        email: admin.email,
        role: admin.role,
      },
    });
  } catch (error) {
    console.error("Update profile error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to update profile.",
    });
  }
};
