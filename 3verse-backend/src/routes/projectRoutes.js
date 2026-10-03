import express from "express";
import {
  createProject,
  getProjects,
  getProject,
  updateProject,
  deleteProject,
} from "../controllers/projectController.js";
import { protect } from "../middleware/authMiddleware.js";
import authorize from "../middleware/authorize.js";
import upload from "../middleware/uploadMiddleware.js";
import validate from "../validation/validate.js";


import {
  createProjectValidation,
  updateProjectValidation,
} from "../validation/projectValidation.js";
const router = express.Router();

router.get("/", getProjects);

router.get("/:slug", getProject);

router.post(
  "/",
  protect,
  authorize("admin", "super-admin"),
  upload.fields([
    { name: "coverImage", maxCount: 1 },
    { name: "gallery", maxCount: 10 },
  ]),
  createProjectValidation,
  validate,
  createProject,
);

router.put(
  "/:id",
  protect,
  authorize("admin", "super-admin"),
  upload.fields([
    { name: "coverImage", maxCount: 1 },
    { name: "gallery", maxCount: 10 },
  ]),
  updateProjectValidation,
  validate,
  updateProject,
);

router.delete("/:id", protect, authorize("super-admin"), deleteProject);

export default router;
