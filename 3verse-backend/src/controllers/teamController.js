import Team from "../models/Team.js";
import APIFeatures from "../utils/apiFeatures.js";
import asyncHandler from "../utils/asyncHandler.js";
import AppError from "../utils/AppError.js";

/**
 * Create Team Member
 */
export const createTeamMember = asyncHandler(async (req, res) => {
  const {
    fullName,
    position,
    teamType,
    bio,
    linkedin,
    twitter,
    instagram,
    facebook,
    displayOrder,
    isPreview,
    isPublished,
  } = req.body;

  const teamMember = await Team.create({
    fullName,
    position,
    teamType,
    bio,
    image: req.file ? req.file.path : "",
    linkedin,
    twitter,
    
    displayOrder,
    isPreview,
    isPublished,
  });

  res.status(201).json({
    success: true,
    message: "Team member created successfully.",
    teamMember,
  });
});

/**
 * Get All Team Members
 */
export const getTeamMembers = asyncHandler(async (req, res) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;

  const features = new APIFeatures(Team.find(), req.query)
    .search(["fullName", "position", "bio"])
    .filter()
    .sort()
    .paginate();

  const teamMembers = await features.query;

  const totalTeamMembers = await Team.countDocuments();

  const totalPages = Math.ceil(totalTeamMembers / limit);

  res.status(200).json({
    success: true,
    count: teamMembers.length,
    totalTeamMembers,
    totalPages,
    currentPage: page,
    hasNextPage: page < totalPages,
    hasPrevPage: page > 1,
    teamMembers,
  });
});
/**
 * Get Single Team Member
 */
export const getTeamMember = asyncHandler(async (req, res) => {
  const teamMember = await Team.findById(req.params.id);

  if (!teamMember) {
    throw new AppError("Team member not found.", 404);
  }

  res.status(200).json({
    success: true,
    teamMember,
  });
});

/**
 * Update Team Member
 */
export const updateTeamMember = asyncHandler(async (req, res) => {
  const teamMember = await Team.findById(req.params.id);

  if (!teamMember) {
    throw new AppError("Team member not found.", 404);
  }

  const {
    fullName,
    position,
    teamType,
    bio,
    linkedin,
    twitter,
    instagram,
    facebook,
    displayOrder,
    isPreview,
    isPublished,
  } = req.body;

  teamMember.fullName = fullName ?? teamMember.fullName;
  teamMember.position = position ?? teamMember.position;
  teamMember.teamType = teamType ?? teamMember.teamType;
  teamMember.bio = bio ?? teamMember.bio;

  // Social media fields
  // Allows empty values so existing links can be removed.
  teamMember.linkedin = linkedin ?? "";
  teamMember.twitter = twitter ?? "";
  teamMember.instagram = instagram ?? "";
  teamMember.facebook = facebook ?? "";

  if (displayOrder !== undefined) {
    teamMember.displayOrder = displayOrder;
  }

  if (isPreview !== undefined) {
    teamMember.isPreview = isPreview;
  }

  if (isPublished !== undefined) {
    teamMember.isPublished = isPublished;
  }

  if (req.file) {
    teamMember.image = req.file.path;
  }

  await teamMember.save();

  res.status(200).json({
    success: true,
    message: "Team member updated successfully.",
    teamMember,
  });
});

/**
 * Delete Team Member
 */
export const deleteTeamMember = asyncHandler(async (req, res) => {
  const teamMember = await Team.findById(req.params.id);

  if (!teamMember) {
    throw new AppError("Team member not found.", 404);
  }

  await teamMember.deleteOne();

  res.status(200).json({
    success: true,
    message: "Team member deleted successfully.",
  });
});
