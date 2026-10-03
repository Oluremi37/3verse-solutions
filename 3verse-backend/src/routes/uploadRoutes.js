import express from "express";
import upload from "../middleware/uploadMiddleware.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, upload.single("image"), (req, res) => {
  res.status(200).json({
    success: true,
    message: "Image uploaded successfully.",
    image: req.file.path,
  });
});

export default router;
