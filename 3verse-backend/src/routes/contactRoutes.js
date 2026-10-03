import express from "express";
import {
  createContact,
  getContacts,
  getContact,
  markContactAsRead,
  deleteContact,
} from "../controllers/contactController.js";

import { protect } from "../middleware/authMiddleware.js";
import authorize from "../middleware/authorize.js";
import validate from "../validation/validate.js";

import { createContactValidation } from "../validation/contactValidation.js";


const router = express.Router();
  // Public Route
router.post("/", createContactValidation, validate, createContact);

// Protected Routes
router.get(
  "/",
  protect,
  authorize("admin", "super-admin"),
  getContacts
);

router.get(
  "/:id",
  protect,
  authorize("admin", "super-admin"),
  getContact
);

router.put(
  "/:id/read",
  protect,
  authorize("admin", "super-admin"),
  markContactAsRead
);

router.delete(
  "/:id",
  protect,
  authorize("super-admin"),
  deleteContact
);


export default router;
