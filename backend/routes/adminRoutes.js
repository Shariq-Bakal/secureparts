import express from "express";
import { approveVendor, getPendingVendors, getDashboardStats, getRecentRFQS, getRecentQuotations, deleteUser, getAllUsers } from "../controllers/admin/adminController.js";
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
router.get("/dashboard",verifyAccessToken,verifyRole("admin"),getDashboardStats)
router.get("/rfqs/recent",verifyAccessToken,verifyRole("admin"),getRecentRFQS)
router.get("/quotations/recent",verifyAccessToken,verifyRole("admin"),getRecentQuotations)
router.get("/users",verifyAccessToken,verifyRole("admin"),getAllUsers)
router.patch("/approve-vendor/:id",verifyAccessToken,verifyRole("admin"),approveVendor)
router.delete("/deleteuser/:id",verifyAccessToken,verifyRole("admin"),deleteUser)
export default router