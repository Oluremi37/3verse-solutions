import asyncHandler from "../utils/asyncHandler.js";
import Service from "../models/Service.js";
import Project from "../models/Project.js";
import Team from "../models/Team.js";
import Contact from "../models/Contact.js";
import Quote from "../models/Quote.js";
import Portfolio from "../models/Portfolio.js";
import Product from "../models/Product.js";
import Schedule from "../models/Schedule.js";

export const getDashboardStats = asyncHandler(async (req, res) => {
  const [
    totalServices,
    publishedServices,

    totalProjects,
    featuredProjects,

    totalTeamMembers,
    publishedTeamMembers,

    totalPortfolios,
    publishedPortfolios,

    totalProducts,

    totalContacts,
    unreadContacts,

    totalQuotes,

    totalSchedules,

    recentContacts,
    recentQuotes,
    recentProjects,
    recentPortfolios,
  ] = await Promise.all([
    Service.countDocuments(),
    Service.countDocuments({ isPublished: true }),

    Project.countDocuments(),
    Project.countDocuments({ isFeatured: true }),

    Team.countDocuments(),
    Team.countDocuments({ isPublished: true }),

    Portfolio.countDocuments(),
    Portfolio.countDocuments({ isPublished: true }),

    Product.countDocuments(),

    Contact.countDocuments(),
    Contact.countDocuments({ isRead: false }),

    Quote.countDocuments(),

    Schedule.countDocuments(),

    Contact.find().sort({ createdAt: -1 }).limit(5),

    Quote.find().sort({ createdAt: -1 }).limit(5),

    Project.find().sort({ createdAt: -1 }).limit(5),
    Portfolio.find().sort({ createdAt: -1 }).limit(5),
  ]);

  res.status(200).json({
    success: true,
    data: {
      overview: {
        totalServices,
        publishedServices,

        totalProjects,
        featuredProjects,

        totalTeamMembers,
        publishedTeamMembers,

        totalPortfolios,
        publishedPortfolios,

        totalProducts,

        totalContacts,
        unreadContacts,

        totalQuotes,

        totalSchedules,
      },

      recentContacts,
      recentQuotes,
      recentProjects,
      recentPortfolios,
    },
  });
});
