import Project from "../models/Project.js";
import asyncHandler from "../utils/asyncHandler.js";
import APIFeatures from "../utils/apiFeatures.js";
import AppError from "../utils/AppError.js";

/**
 * Create Project
 */
export const createProject = asyncHandler(async (req, res) => {
  const {
    title,
    slug,
    shortDescription,
    description,
    category,
    technologies,
    client,
    completionDate,
    liveUrl,
    githubUrl,
    isFeatured,
    displayOrder,
    isPublished,
  } = req.body;

  const existingProject = await Project.findOne({ slug });

  if (existingProject) {
    throw new AppError("Project slug already exists.", 400);
  }

  const project = await Project.create({
    title,
    slug,
    shortDescription,
    description,
    category,

    technologies: technologies
      ? technologies.split(",").map((item) => item.trim())
      : [],

    coverImage: req.files?.coverImage ? req.files.coverImage[0].path : "",

    gallery: req.files?.gallery
      ? req.files.gallery.map((file) => file.path)
      : [],

    client,
    completionDate,
    liveUrl,
    githubUrl,
    isFeatured,
    displayOrder,
    isPublished,
  });

  res.status(201).json({
    success: true,
    message: "Project created successfully.",
    project,
  });
});

/**
 * Get All Projects
 */
export const getProjects = asyncHandler(async (req, res) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;

  const features = new APIFeatures(Project.find(), req.query)
    .search(["title", "category", "client", "technologies", "shortDescription"])
    .filter()
    .sort()
    .paginate();

  const projects = await features.query;

  const totalProjects = await Project.countDocuments();

  const totalPages = Math.ceil(totalProjects / limit);

  res.status(200).json({
    success: true,
    count: projects.length,
    totalProjects,
    totalPages,
    currentPage: page,
    hasNextPage: page < totalPages,
    hasPrevPage: page > 1,
    projects,
  });
});

/**
 * Get Single Project
 */
export const getProject = asyncHandler(async (req, res) => {
  const project = await Project.findOne({
    slug: req.params.slug,
  });

if (!project) {
  throw new AppError("Project not found.", 404);
}

  res.status(200).json({
    success: true,
    project,
  });
});

/**
 * Update Project
 */
export const updateProject = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.id);

 if (!project) {
   throw new AppError("Project not found.", 404);
 }

  const {
    title,
    slug,
    shortDescription,
    description,
    category,
    technologies,
    client,
    completionDate,
    liveUrl,
    githubUrl,
    isFeatured,
    displayOrder,
    isPublished,
  } = req.body;

  project.title = title || project.title;
  project.slug = slug || project.slug;
  project.shortDescription = shortDescription || project.shortDescription;
  project.description = description || project.description;
  project.category = category || project.category;

  if (technologies) {
    project.technologies = technologies.split(",").map((tech) => tech.trim());
  }

  project.client = client || project.client;
  project.completionDate = completionDate || project.completionDate;
  project.liveUrl = liveUrl || project.liveUrl;
  project.githubUrl = githubUrl || project.githubUrl;

  if (displayOrder !== undefined) {
    project.displayOrder = displayOrder;
  }

  if (isFeatured !== undefined) {
    project.isFeatured = isFeatured;
  }

  if (isPublished !== undefined) {
    project.isPublished = isPublished;
  }

  if (req.files?.coverImage) {
    project.coverImage = req.files.coverImage[0].path;
  }

  if (req.files?.gallery) {
    project.gallery = req.files.gallery.map((file) => file.path);
  }

  await project.save();

  res.status(200).json({
    success: true,
    message: "Project updated successfully.",
    project,
  });
});

/**
 * Delete Project
 */
export const deleteProject = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.id);

 if (!project) {
   throw new AppError("Project not found.", 404);
 }

  await project.deleteOne();

  res.status(200).json({
    success: true,
    message: "Project deleted successfully.",
  });
});
