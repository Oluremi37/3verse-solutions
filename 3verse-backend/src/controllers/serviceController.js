  import Service from "../models/Service.js";
  import asyncHandler from "../utils/asyncHandler.js";

  import APIFeatures from "../utils/apiFeatures.js";
  import AppError from "../utils/AppError.js";

  export const createService = asyncHandler(async (req, res) => {
    const existingService = await Service.findOne({
      slug: req.body.slug,
    });

    if (existingService) {
      throw new AppError("Service slug already exists.", 400);
    }

    const service = await Service.create(req.body);

    res.status(201).json({
      success: true,
      message: "Service created successfully.",
      service,
    });
  });

  // Get All Services
  export const getServices = asyncHandler(async (req, res) => {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;

    const features = new APIFeatures(Service.find(), req.query)
      .search(["title", "slug", "shortDescription", "heroDescription"])
      .filter()
      .sort()
      .paginate();

    const services = await features.query;

    const totalServices = await Service.countDocuments();

    const totalPages = Math.ceil(totalServices / limit);

    res.status(200).json({
      success: true,
      count: services.length,
      totalServices,
      totalPages,
      currentPage: page,
      hasNextPage: page < totalPages,
      hasPrevPage: page > 1,
      services,
    });
  });

  // Get Single Service
  export const getService = asyncHandler(async (req, res) => {
    const service = await Service.findById(req.params.id);

    if (!service) {
      throw new AppError("Service not found.", 404);
    }

    res.status(200).json({
      success: true,
      service,
    });
  });

  export const getServiceBySlug = asyncHandler(async (req, res) => {
    const service = await Service.findOne({
      slug: req.params.slug,
    });

    if (!service) {
      throw new AppError("Service not found.", 404);
    }

    res.status(200).json({
      success: true,
      service,
    });
  });

  // Update Service
  export const updateService = asyncHandler(async (req, res) => {
 if (req.body.slug) {
   const existing = await Service.findOne({
     slug: req.body.slug,
     _id: { $ne: req.params.id },
   });

   if (existing) {
     throw new AppError("Service slug already exists.", 400);
   }
 }

 const service = await Service.findByIdAndUpdate(req.params.id, req.body, {
   new: true,
   runValidators: true,
 });

    if (!service) {
      throw new AppError("Service not found.", 404);
    }

    res.status(200).json({
      success: true,
      message: "Service updated successfully.",
      service,
    });
  });

  // Delete Service
  export const deleteService = asyncHandler(async (req, res) => {
    const service = await Service.findById(req.params.id);

    if (!service) {
      throw new AppError("Service not found.", 404);
    }

    await service.deleteOne();

    res.status(200).json({
      success: true,
      message: "Service deleted successfully.",
    });
  });
