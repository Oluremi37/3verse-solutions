  import express from "express";

  import {
    createProduct,
    getProducts,
    getProduct,
    getProductBySlug,
    updateProduct,
    deleteProduct,
  } from "../controllers/productController.js";

  import { protect } from "../middleware/authMiddleware.js";
  import authorize from "../middleware/authorize.js";
  import validate from "../validation/validate.js";
  import upload from "../middleware/uploadMiddleware.js";

  import {
    createProductValidation,
    updateProductValidation,
  } from "../validation/productValidation.js";

  const router = express.Router();

  // Public Routes
  router.get("/", getProducts);

  router.get("/slug/:slug", getProductBySlug);

  router.get("/:id", getProduct);

  // Admin Routes
  router.post(
    "/",
    protect,
    authorize("admin", "super-admin"),
    upload.single("image"),
    createProductValidation,
    validate,
    createProduct,
  );

  router.put(
    "/:id",
    protect,
    authorize("admin", "super-admin"),
    upload.single("image"),
    updateProductValidation,
    validate,
    updateProduct,
  );

  router.delete("/:id", protect, authorize("super-admin"), deleteProduct);

  export default router;
