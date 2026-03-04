import express from "express";
import { verifyAccessToken } from "../middlewares/authMiddleware.js";
import { submitQuotation } from "../controllers/quotation/quotationController.js";

const router = express.Router();

router.post("/:rfqId",verifyAccessToken,submitQuotation)
export default router