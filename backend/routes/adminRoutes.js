import express from "express";
import { approveVendor, getPendingVendors } from "../controllers/admin/adminController.js";
import {
   verifyAccessToken,
   verifyRole
} from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get(
  "/pending-vendors",
  verifyAccessToken,
  verifyRole("admin"),
  getPendingVendors
);
router.patch("/approve-vendor/:id",verifyAccessToken,verifyRole("admin"),approveVendor)
export default router