import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import authorize from "../middleware/authorize.js";
import { getDashboardStats } from "../controllers/dashboardController.js";

const router = express.Router();

router.get("/", protect, authorize("admin", "super-admin"), getDashboardStats);

export default router;
